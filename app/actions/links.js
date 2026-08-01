// app/actions/links.js
"use server";

import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb-client";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { z } from "zod";

const linkSchema = z.object({
    title: z.preprocess((val) => val === null || val === "" ? undefined : val, z.string().min(1, "Title is required").max(50).optional()),
    url: z.string().min(1, "URL is required").url("Please enter a valid URL"),
    type: z.enum(['text', 'social']),
    platform: z.preprocess((val) => val === null || val === "" ? undefined : val, z.string().optional()),
});

function sanitizeUrl(url) {
    if (!url) return url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return `https://${url}`;
    }
    return url;
}

export async function getLinksAction() {
    try {
        const session = await auth();
        if (!session?.user?.id || !session?.user?.username) return [];

        const client = await clientPromise;
        const db = client.db();
        const links = await db.collection("links").find({ userId: session.user.id }).sort({ order: 1, createdAt: 1 }).toArray();
        return JSON.parse(JSON.stringify(links));
    } catch (e) {
        return [];
    }
}

export async function createLinkAction(formData) {
    const session = await auth();
    // FIX: Added critical: true for auth errors
    if (!session?.user?.id) return { error: "Your session has expired. Please log in again.", critical: true };
    if (!session?.user?.username) return { error: "Please set up your username first.", critical: true };

    const type = formData.get("type") || 'text';

    if (type === 'social') {
        const client = await clientPromise;
        const db = client.db();
        const socialCount = await db.collection("links").countDocuments({ userId: session.user.id, type: 'social' });
        // Note: No critical flag here, so it shows as normal text in the modal
        if (socialCount >= 5) return { error: "Maximum of 5 social icons reached." };
    }

    const sanitizedUrl = sanitizeUrl(formData.get("url") || "");

    const parsed = linkSchema.safeParse({
        title: formData.get("title"),
        url: sanitizedUrl,
        type,
        platform: formData.get("platform"),
    });

    if (!parsed.success) return { error: parsed.error.issues[0].message };

    try {
        const client = await clientPromise;
        const db = client.db();

        const lastLink = await db.collection("links").findOne({ userId: session.user.id }, { sort: { order: -1 } });
        const order = lastLink?.order !== undefined ? lastLink.order + 1 : 0;

        const newLink = {
            ...parsed.data,
            userId: session.user.id,
            clicks: 0,
            order,
            createdAt: new Date()
        };

        const result = await db.collection("links").insertOne(newLink);
        revalidatePath("/dashboard");
        return { success: true, link: { ...newLink, _id: result.insertedId.toString() } };
    } catch (e) {
        return { error: "Failed to create link in the database.", critical: true };
    }
}

export async function updateLinkAction(id, formData) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Your session has expired. Please log in again.", critical: true };

    const sanitizedUrl = sanitizeUrl(formData.get("url") || "");

    const parsed = linkSchema.safeParse({
        title: formData.get("title"),
        url: sanitizedUrl,
        type: formData.get("type") || 'text',
        platform: formData.get("platform"),
    });

    if (!parsed.success) return { error: parsed.error.issues[0].message };

    try {
        const client = await clientPromise;
        const db = client.db();

        await db.collection("links").updateOne(
            { _id: new ObjectId(id), userId: session.user.id },
            {
                $set: {
                    title: parsed.data.title,
                    url: parsed.data.url,
                    type: parsed.data.type,
                    platform: parsed.data.platform
                }
            }
        );
        revalidatePath("/dashboard");
        return { success: true, link: { ...parsed.data, _id: id } };
    } catch (e) {
        return { error: "Failed to update link in the database.", critical: true };
    }
}

export async function deleteLinkAction(id) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Your session has expired. Please log in again.", critical: true };

    try {
        const client = await clientPromise;
        const db = client.db();
        await db.collection("links").deleteOne({ _id: new ObjectId(id), userId: session.user.id });
        revalidatePath("/dashboard");
        return { success: true, id };
    } catch (e) {
        return { error: "Failed to delete link from the database.", critical: true };
    }
}

export async function reorderLinksAction(newOrder) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Your session has expired. Please log in again.", critical: true };

    try {
        const client = await clientPromise;
        const db = client.db();
        const bulkOps = newOrder.map((id, index) => ({
            updateOne: {
                filter: { _id: new ObjectId(id), userId: session.user.id },
                update: { $set: { order: index } }
            }
        }));
        await db.collection("links").bulkWrite(bulkOps);
        return { success: true };
    } catch (e) {
        return { error: "Failed to reorder links in the database.", critical: true };
    }
}