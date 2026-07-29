import clientPromise from "@/lib/mongodb-client";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PublicProfilePage({ params }) {
    // Next.js 15 Fix: params is now a Promise, so we must await it
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

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-900 to-black flex flex-col items-center pt-16 px-4">
            <div className="w-full max-w-md flex flex-col items-center">
                {/* Profile Header */}
                <div className="w-24 h-24 bg-linear-to-br from-emerald-400 to-cyan-400 rounded-full mb-5 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                    {username?.[0]?.toUpperCase()}
                </div>
                <h1 className="text-2xl font-bold text-white">@{username}</h1>

                {/* Links List */}
                <div className="w-full mt-8 space-y-4">
                    {links.length === 0 ? (
                        <p className="text-gray-500 text-center mt-10">No links available yet.</p>
                    ) : (
                        links.map((link) => (
                            <a
                                key={link._id.toString()}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-center font-medium py-4 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] shadow-lg"
                            >
                                {link.title}
                            </a>
                        ))
                    )}
                </div>

                {/* Footer */}
                <Link href="/" className="mt-12 text-gray-600 text-xs hover:text-gray-400">
                    Powered by Linktree Clone
                </Link>
            </div>
        </div>
    );
}