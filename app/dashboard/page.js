// app/dashboard/page.jsx
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getLinksAction } from "@/actions/links";
import clientPromise from "@/lib/mongodb-client";
import { ObjectId } from "mongodb";
import DashboardClient from "@/components/DashboardClient";

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user) redirect("/login");

    const client = await clientPromise;
    const db = client.db();
    const userDoc = await db.collection("users").findOne({ _id: new ObjectId(session.user.id) });

    const profile = {
        username: session.user.username,
        email: session.user.email,
        name: userDoc?.name || session.user.username,
        bio: userDoc?.bio || "",
        avatar: userDoc?.avatar || "",
        isGradient: userDoc?.isGradient || false,
        bgColor1: userDoc?.bgColor1 || "#FFFFFF",
        bgColor2: userDoc?.bgColor2 || "#FFFFFF",
        bgDirection: userDoc?.bgDirection || "to bottom",
        bgImage: userDoc?.bgImage || "",
        boxColor: userDoc?.boxColor || "#000000",
        textColor: userDoc?.textColor || "#000000", // FIX: Changed default to Black
        iconColor: userDoc?.iconColor || "#000000",
    };

    const links = await getLinksAction();
    return <DashboardClient profile={profile} initialLinks={links} />;
}