// app/actions/links.js
"use server";

import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb-client";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { headers } from "next/headers";
import rateLimit from "@/lib/rateLimit";

const linkLimiter = rateLimit(10, 60 * 1000); // 10 requests per minute

const linkSchema = z.object({
    title: z.string().min(1, "Title is required").max(50),
    url: z.string().url("Please enter a valid URL"),
});

export async function getLinksAction() {
    try {
        const session = await auth();
        // Security: Ensure user is logged in AND has completed onboarding (has username)
        if (!session?.user?.id || !session?.user?.username) throw new Error("Not authenticated");

        const client = await clientPromise;
        const db = client.db();

        // Data isolation: strictly query by the logged-in user's ID
        const links = await db.collection("links").find({ userId: session.user.id }).sort({ createdAt: -1 }).toArray();
        return JSON.parse(JSON.stringify(links));
    } catch (e) {
        console.error(e);
        return [];
    }
}

export async function createLinkAction(formData) {
    const session = await auth();
    // Security: Ensure user is logged in AND has completed onboarding
    if (!session?.user?.id || !session?.user?.username) return { error: "Please set up your username first." };

    // Fix: 'await' headers() for Next.js 15+
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(',')[0] : "unknown-ip";

    if (!linkLimiter(ip)) return { error: "You are adding links too fast. Please slow down." };

    const parsed = linkSchema.safeParse({
        title: formData.get("title"),
        url: formData.get("url"),
    });

    if (!parsed.success) return { error: parsed.error.issues[0].message };

    try {
        const client = await clientPromise;
        const db = client.db();

        const newLink = {
            title: parsed.data.title,
            url: parsed.data.url,
            userId: session.user.id, // Data isolation
            createdAt: new Date(),
        };

        const result = await db.collection("links").insertOne(newLink);

        revalidatePath("/dashboard");

        // Return the new link object to the client for instant UI update
        return { success: true, link: { ...newLink, _id: result.insertedId.toString() } };
    } catch (e) {
        console.error(e);
        return { error: "Failed to create link." };
    }
}

export async function deleteLinkAction(id) {
    const session = await auth();
    // Security: Ensure user is logged in AND has completed onboarding
    if (!session?.user?.id || !session?.user?.username) return { error: "Please set up your username first." };

    try {
        const client = await clientPromise;
        const db = client.db();

        await db.collection("links").deleteOne({
            _id: new ObjectId(id),
            userId: session.user.id, // Data isolation
        });

        revalidatePath("/dashboard");
        return { success: true, id };
    } catch (e) {
        console.error(e);
        return { error: "Failed to delete link." };
    }
}