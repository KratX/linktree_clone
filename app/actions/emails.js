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

// --- Professional Email Templates ---
const emailWrapper = (content) => `
  <div style="background-color: #f4f4f5; padding: 40px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
      <tr>
        <td style="padding: 32px 40px; text-align: center; border-bottom: 1px solid #f4f4f5;">
          <h1 style="font-size: 24px; font-weight: 800; color: #111; margin: 0; letter-spacing: -0.5px;">
            Link<span style="color: #43E660;">tree</span>
          </h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 40px;">
          ${content}
        </td>
      </tr>
      <tr>
        <td style="padding: 24px 40px; background-color: #fafafa; border-top: 1px solid #f4f4f5;">
          <p style="font-size: 12px; color: #999; text-align: center; margin: 0; line-height: 1.5;">
            &copy; ${new Date().getFullYear()} Linktree Clone. All rights reserved.<br/>
            You received this email because you signed up for an account.
          </p>
        </td>
      </tr>
    </table>
  </div>
`;

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

        const token = crypto.randomBytes(32).toString("hex");
        const expires = new Date(Date.now() + 3600000); // 1 hour from now

        await db.collection("password_resets").updateOne(
            { email },
            { $set: { token, expires } },
            { upsert: true }
        );

        const resetUrl = `${process.env.AUTH_URL}/forgot-password?token=${token}`;

        const emailContent = `
      <h2 style="font-size: 20px; color: #111; margin-top: 0; margin-bottom: 20px; font-weight: 700;">Reset your password</h2>
      <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
        We received a request to reset the password for your Linktree account. Click the button below to choose a new password.
      </p>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
        <tr>
          <td align="center">
            <a href="${resetUrl}" style="display: inline-block; background-color: #000; color: #fff; padding: 16px 32px; text-decoration: none; font-weight: 600; border-radius: 12px; font-size: 16px;">
              Reset Password
            </a>
          </td>
        </tr>
      </table>
      <p style="color: #999; font-size: 14px; line-height: 1.5; margin-bottom: 0;">
        If you didn't request a password reset, you can safely ignore this email. This link will expire in 1 hour.
      </p>
    `;

        await resend.emails.send({
            from: "Linktree Clone <onboarding@resend.dev>",
            to: email,
            subject: "Reset your password",
            html: emailWrapper(emailContent)
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

        const emailContent = `
      <h2 style="font-size: 20px; color: #111; margin-top: 0; margin-bottom: 20px; font-weight: 700;">Your username reminder</h2>
      <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
        You asked us to remind you of your Linktree username. Here it is:
      </p>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
        <tr>
          <td align="center" style="background-color: #f4f4f5; padding: 24px; border-radius: 12px; border: 1px dashed #e4e4e7;">
            <span style="font-size: 20px; font-weight: 700; color: #111; letter-spacing: 0.5px;">
              @${user.username}
            </span>
          </td>
        </tr>
      </table>
      <p style="color: #999; font-size: 14px; line-height: 1.5; margin-bottom: 0;">
        If you didn't request this reminder, you can safely ignore this email. Please secure your account if you believe it has been compromised.
      </p>
    `;

        await resend.emails.send({
            from: "Linktree Clone <onboarding@resend.dev>",
            to: email,
            subject: "Your Username Reminder",
            html: emailWrapper(emailContent)
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