// app/actions/profile.js
"use server";

import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb-client";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { z } from "zod";

const profileSchema = z.object({
    name: z.string().max(30, "Name must be at most 30 characters").optional(),
    bio: z.string().max(160, "Bio must be at most 160 characters").optional(),
    avatar: z.string().optional(),
    isGradient: z.boolean().optional(),
    bgColor1: z.string().regex(/^#([0-9a-fA-F]{3}){1,2}$/),
    bgColor2: z.string().regex(/^#([0-9a-fA-F]{3}){1,2}$/),
    bgDirection: z.string().optional(),
    boxColor: z.string().regex(/^#([0-9a-fA-F]{3}){1,2}$/),
    textColor: z.string().regex(/^#([0-9a-fA-F]{3}){1,2}$/),
    iconColor: z.string().regex(/^#([0-9a-fA-F]{3}){1,2}$/),
});

export async function updateProfileAction(formData) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Your session has expired. Please log in again.", critical: true };

    const parsed = profileSchema.safeParse({
        name: formData.get("name") || "",
        bio: formData.get("bio") || "",
        avatar: formData.get("avatar") || "",
        isGradient: formData.get("isGradient") === "true",
        bgColor1: formData.get("bgColor1") || "#FFFFFF",
        bgColor2: formData.get("bgColor2") || "#FFFFFF",
        bgDirection: formData.get("bgDirection") || "to bottom",
        boxColor: formData.get("boxColor") || "#000000",
        textColor: formData.get("textColor") || "#FFFFFF",
        iconColor: formData.get("iconColor") || "#000000",
    });

    if (!parsed.success) return { error: parsed.error.issues[0].message };

    try {
        const client = await clientPromise;
        const db = client.db();
        await db.collection("users").updateOne(
            { _id: new ObjectId(session.user.id) },
            { $set: parsed.data }
        );
        revalidatePath("/dashboard");
        revalidatePath(`/${session.user.username}`);
        return { success: true };
    } catch (e) {
        return { error: "Failed to update profile in the database.", critical: true };
    }
}

export async function applyTemplateAction(templateColors) {
    const session = await auth();

    // FIX: Return a redirect instruction instead of throwing the Next.js redirect error.
    if (!session?.user?.id) {
        return { redirect: "/signup" };
    }

    try {
        const client = await clientPromise;
        const db = client.db();
        await db.collection("users").updateOne(
            { _id: new ObjectId(session.user.id) },
            { $set: templateColors }
        );
        revalidatePath("/dashboard");
        revalidatePath(`/${session.user.username}`);
        return { success: true };
    } catch (e) {
        return { error: "Failed to apply template.", critical: true };
    }
}