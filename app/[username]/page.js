// app/[username]/page.jsx
import clientPromise from "@/lib/mongodb-client";
import { notFound } from "next/navigation";
import PublicProfile from "@/components/PublicProfile";

export default async function PublicProfilePage({ params }) {
    // Next.js 15 Fix: params is now a Promise
    const { username } = await params;

    const client = await clientPromise;
    const db = client.db();

    // Find user by username
    const user = await db.collection("users").findOne({ username });

    if (!user) {
        notFound(); // Shows 404 page if user doesn't exist
    }

    // Fetch their links
    const links = await db.collection("links")
        .find({ userId: user._id.toString() })
        .sort({ createdAt: -1 })
        .toArray();

    // Prepare serializable object for the Client Component
    const userData = {
        username: user.username,
        name: user.name || user.username
    };

    // MongoDB ObjectId is not serializable, so we stringify and parse it
    const linksData = JSON.parse(JSON.stringify(links));

    return <PublicProfile user={userData} links={linksData} />;
}