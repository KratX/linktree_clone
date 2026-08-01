// app/[username]/page.jsx
import clientPromise from "@/lib/mongodb-client";
import { notFound } from "next/navigation";
import PublicProfile from "@/components/PublicProfile";

export default async function PublicProfilePage({ params }) {
    const { username } = await params;

    const client = await clientPromise;
    const db = client.db();

    const user = await db.collection("users").findOne({ username });

    if (!user) {
        notFound();
    }

    const links = await db.collection("links")
        .find({ userId: user._id.toString() })
        .sort({ order: 1, createdAt: 1 })
        .toArray();

    // FIX: Added bgImage to the payload so the client component receives it
    const userData = {
        username: user.username,
        name: user.name || user.username,
        bio: user.bio || "",
        avatar: user.avatar || "",
        isGradient: user.isGradient || false,
        bgColor1: user.bgColor1 || "#FFFFFF",
        bgColor2: user.bgColor2 || "#FFFFFF",
        bgDirection: user.bgDirection || "to bottom",
        bgImage: user.bgImage || "", // <--- FIX IS HERE
        boxColor: user.boxColor || "#000000",
        textColor: user.textColor || "#FFFFFF",
        iconColor: user.iconColor || "#000000",
    };

    return <PublicProfile user={userData} links={JSON.parse(JSON.stringify(links))} />;
}