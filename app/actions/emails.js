// app/actions/emails.js
"use server";

import clientPromise from "@/lib/mongodb-client";
import { Resend } from "resend";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const emailSchema = z.string().email("Invalid email address");
const passwordSchema = z.string().min(8, "Password must be at least 8 characters").regex(/[A-Z]/, "Must contain 1 uppercase").regex(/[0-9]/, "Must contain 1 number");

export async function forgotPasswordAction(formData) {
    const parsed = emailSchema.safeParse((formData.get("email") || "").toLowerCase());
    if (!parsed.success) return { error: parsed.error.issues[0].message };

    const email = parsed.data;

    try {
        const client = await clientPromise;
        const db = client.db();
        const user = await db.collection("users").findOne({ email });

        // SECURITY: Always return success to prevent user enumeration attacks
        if (!user) return { success: "If an account exists, a reset link has been sent." };

        // Generate secure token
        const token = crypto.randomBytes(32).toString("hex");
        const expires = new Date(Date.now() + 3600000); // 1 hour from now

        await db.collection("password_resets").updateOne(
            { email },
            { $set: { token, expires } },
            { upsert: true }
        );

        // FIX: Point the URL back to the forgot-password page
        const resetUrl = `${process.env.AUTH_URL}/forgot-password?token=${token}`;

        await resend.emails.send({
            from: "Linktree Clone <onboarding@resend.dev>",
            to: email,
            subject: "Reset your password",
            html: `<p>You requested a password reset.</p><p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 1 hour.</p>`
        });

        return { success: "If an account exists, a reset link has been sent." };
    } catch (e) {
        console.error(e);
        return { error: "Failed to send email. Try again later." };
    }
}

export async function forgotUsernameAction(formData) {
    const parsed = emailSchema.safeParse((formData.get("email") || "").toLowerCase());
    if (!parsed.success) return { error: parsed.error.issues[0].message };

    const email = parsed.data;

    try {
        const client = await clientPromise;
        const db = client.db();
        const user = await db.collection("users").findOne({ email });

        if (!user) return { success: "If an account exists, an email has been sent with your username." };

        await resend.emails.send({
            from: "Linktree Clone <onboarding@resend.dev>",
            to: email,
            subject: "Your Username Reminder",
            html: `<p>You requested your username.</p><p>Your username is: <strong>${user.username}</strong></p>`
        });

        return { success: "If an account exists, an email has been sent with your username." };
    } catch (e) {
        console.error(e);
        return { error: "Failed to send email. Try again later." };
    }
}

export async function resetPasswordAction(formData) {
    const token = formData.get("token");
    const password = formData.get("password");

    const parsedPassword = passwordSchema.safeParse(password);
    if (!parsedPassword.success) return { error: parsedPassword.error.issues[0].message };

    if (!token) return { error: "Missing token." };

    try {
        const client = await clientPromise;
        const db = client.db();

        const resetRecord = await db.collection("password_resets").findOne({ token });

        if (!resetRecord || resetRecord.expires < new Date()) {
            return { error: "Token is invalid or has expired." };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.collection("users").updateOne(
            { email: resetRecord.email },
            { $set: { hashedPassword } }
        );

        await db.collection("password_resets").deleteOne({ token });

        return { success: true };
    } catch (e) {
        console.error(e);
        return { error: "Failed to reset password." };
    }
}