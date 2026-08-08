// app/actions/admin.js
"use server";

import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb-client";
import { ObjectId } from "mongodb";
import { calculateBanExpiry, isBanned } from "@/lib/adminUtils";

// Helper to ensure only admins can run these actions
async function checkAdmin() {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
        throw new Error("Unauthorized: Admin access required.");
    }
    return session;
}

export async function getAdminStats() {
    await checkAdmin();
    const client = await clientPromise;
    const db = client.db();

    const totalUsers = await db.collection("users").countDocuments();
    const totalLinks = await db.collection("links").countDocuments();

    const clicksAgg = await db.collection("links").aggregate([
        { $group: { _id: null, totalClicks: { $sum: "$clicks" } } }
    ]).toArray();
    const totalClicks = clicksAgg[0]?.totalClicks || 0;

    // Growth metrics (Last 14 days)
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    const signups = await db.collection("users").aggregate([
        { $match: { createdAt: { $gte: fourteenDaysAgo } } },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ]).toArray();

    const clicks = await db.collection("links").aggregate([
        { $match: { createdAt: { $gte: fourteenDaysAgo } } },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                count: { $sum: "$clicks" }
            }
        },
        { $sort: { _id: 1 } }
    ]).toArray();

    // Recent Activity (Last 15 actions)
    const recentUsers = await db.collection("users").find().sort({ createdAt: -1 }).limit(5).toArray();
    const recentLinks = await db.collection("links").find().sort({ createdAt: -1 }).limit(10).toArray();

    return {
        totalUsers,
        totalLinks,
        totalClicks,
        signups,
        clicks,
        recentUsers: JSON.parse(JSON.stringify(recentUsers)),
        recentLinks: JSON.parse(JSON.stringify(recentLinks)),
    };
}

export async function getAdminUsers({ page = 1, limit = 20, search = "", filter = "" }) {
    await checkAdmin();
    const client = await clientPromise;
    const db = client.db();

    const query = {};
    if (search) {
        query.$or = [
            { email: { $regex: search, $options: "i" } },
            { username: { $regex: search, $options: "i" } }
        ];
    }

    if (filter === "banned") {
        query.bannedUntil = { $ne: null };
    } else if (filter === "new") {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        query.createdAt = { $gte: today };
    }

    const skip = (page - 1) * limit;
    const users = await db.collection("users").find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray();
    const total = await db.collection("users").countDocuments(query);

    return { users: JSON.parse(JSON.stringify(users)), total, totalPages: Math.ceil(total / limit) };
}

export async function getAdminLinks({ page = 1, limit = 20, search = "" }) {
    await checkAdmin();
    const client = await clientPromise;
    const db = client.db();

    const query = {};
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { url: { $regex: search, $options: "i" } }
        ];
    }

    const skip = (page - 1) * limit;

    // We need to join with users to show who owns the link
    const linksAgg = await db.collection("links").aggregate([
        { $match: query },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } }
    ]).toArray();

    const total = await db.collection("links").countDocuments(query);

    return { links: JSON.parse(JSON.stringify(linksAgg)), total, totalPages: Math.ceil(total / limit) };
}

export async function banUserAction(userId, duration) {
    await checkAdmin();
    const client = await clientPromise;
    const db = client.db();

    const banExpiry = calculateBanExpiry(duration);

    await db.collection("users").updateOne(
        { _id: new ObjectId(userId) },
        { $set: { bannedUntil: banExpiry } }
    );

    return { success: true };
}

export async function unbanUserAction(userId) {
    await checkAdmin();
    const client = await clientPromise;
    const db = client.db();

    await db.collection("users").updateOne(
        { _id: new ObjectId(userId) },
        { $unset: { bannedUntil: "" } }
    );

    return { success: true };
}

export async function adminDeleteLinkAction(linkId) {
    await checkAdmin();
    const client = await clientPromise;
    const db = client.db();

    await db.collection("links").deleteOne({ _id: new ObjectId(linkId) });
    return { success: true };
}