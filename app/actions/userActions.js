// app/actions/userActions.js
"use server";

import { signIn, auth } from "@/auth";
import clientPromise from "@/lib/mongodb-client";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { usernameBloom, emailBloom } from "@/lib/bloomFilter";
import { z } from "zod";
import { headers } from "next/headers";
import rateLimit from "@/lib/rateLimit";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

const signupLimiter = rateLimit(5, 15 * 60 * 1000); // 5 requests per 15 mins

const signupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters").max(20).regex(/^[a-zA-Z0-9_]+$/, "No special characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters").regex(/[A-Z]/, "Must contain 1 uppercase").regex(/[0-9]/, "Must contain 1 number"),
});

// Schema for Google onboarding (Username + Password)
const onboardingSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters").max(20).regex(/^[a-zA-Z0-9_]+$/, "No special characters allowed"),
    password: z.string().min(8, "Password must be at least 8 characters").regex(/[A-Z]/, "Must contain 1 uppercase").regex(/[0-9]/, "Must contain 1 number"),
});

export async function signupAction(formData) {
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(',')[0] : "unknown-ip";

    if (!signupLimiter(ip)) return { error: "Too many attempts. Try again in 15 minutes." };

    const parsed = signupSchema.safeParse({
        username: (formData.get("username") || "").toLowerCase(),
        email: (formData.get("email") || "").toLowerCase(),
        password: formData.get("password") || "",
    });

    if (!parsed.success) return { error: parsed.error.issues[0].message };

    const { username, email, password } = parsed.data;

    try {
        const client = await clientPromise;
        const db = client.db();
        const cacheCollection = db.collection("bloom_cache");

        const [usernameCache, emailCache] = await Promise.all([
            cacheCollection.findOne({ _id: "usernames" }),
            cacheCollection.findOne({ _id: "emails" }),
        ]);

        if (usernameCache?.state) usernameBloom.importState(usernameCache.state);
        if (emailCache?.state) emailBloom.importState(emailCache.state);

        if (usernameBloom.contains(username)) {
            const existingUsername = await db.collection("users").findOne({ username });
            if (existingUsername) return { error: "This username is already taken." };
        }

        if (emailBloom.contains(email)) {
            const existingEmail = await db.collection("users").findOne({ email });
            if (existingEmail) return { error: "An account with this email already exists." };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.collection("users").insertOne({
            name: username, email, username, hashedPassword, createdAt: new Date(),
        });

        if (!result.insertedId) return { error: "Failed to create account." };

        usernameBloom.add(username);
        emailBloom.add(email);

        await cacheCollection.bulkWrite([
            { updateOne: { filter: { _id: "usernames" }, update: { $set: { state: usernameBloom.exportState() } }, upsert: true } },
            { updateOne: { filter: { _id: "emails" }, update: { $set: { state: emailBloom.exportState() } }, upsert: true } }
        ]);

    } catch (e) {
        // FIX: Catch MongoDB Duplicate Key Error (E11000) just in case the Bloom Filter missed it (e.g. Google OAuth user)
        if (e.code === 11000) {
            if (e.keyPattern?.email) return { error: "An account with this email already exists." };
            if (e.keyPattern?.username) return { error: "This username is already taken." };
        }
        console.error("Signup Error:", e);
        return { error: "Server error. Please try again." };
    }

    // signIn and redirect MUST be outside the try/catch block
    const signInResult = await signIn("credentials", { email, password, redirect: false });

    if (signInResult?.error) {
        return { error: "Account created, but auto-login failed. Please log in manually." };
    }

    redirect("/dashboard");
}

// --- ACTION FOR GOOGLE ONBOARDING ---
export async function setUsernameAction(formData) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    const parsed = onboardingSchema.safeParse({
        username: (formData.get("username") || "").toLowerCase(),
        password: formData.get("password") || "",
    });

    if (!parsed.success) return { error: parsed.error.issues[0].message };

    const { username, password } = parsed.data;

    try {
        const client = await clientPromise;
        const db = client.db();

        // 1. Check Bloom Filter & DB for username uniqueness
        const cacheCollection = db.collection("bloom_cache");
        const usernameCache = await cacheCollection.findOne({ _id: "usernames" });
        if (usernameCache?.state) usernameBloom.importState(usernameCache.state);

        if (usernameBloom.contains(username)) {
            const existingUsername = await db.collection("users").findOne({ username });
            if (existingUsername) return { error: "This username is already taken." };
        }

        // 2. Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Update the user in the database with BOTH username and password
        const result = await db.collection("users").updateOne(
            { _id: new ObjectId(session.user.id) },
            { $set: { username, hashedPassword } }
        );

        if (result.modifiedCount === 0) return { error: "Failed to set profile. Please try again." };

        // 4. Update Bloom filter
        usernameBloom.add(username);
        await cacheCollection.updateOne(
            { _id: "usernames" },
            { $set: { state: usernameBloom.exportState() } },
            { upsert: true }
        );

        revalidatePath("/onboarding");

        // Return success and the username so the client can update the session and redirect
        return { success: true, username };

    } catch (e) {
        // FIX: Catch MongoDB Duplicate Key Error for usernames too
        if (e.code === 11000) {
            if (e.keyPattern?.username) return { error: "This username is already taken." };
        }
        console.error("Onboarding Error:", e);
        return { error: "Server error. Please try again." };
    }
}