"use client";

import { useState, useTransition } from "react";
import { createLinkAction, deleteLinkAction } from "@/actions/links";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function DashboardClient({ session, initialLinks }) {
    const [links, setLinks] = useState(initialLinks);
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleCreate = async (e) => {
        e.preventDefault();
        setError("");
        const formData = new FormData(e.target);

        startTransition(async () => {
            const result = await createLinkAction(formData);
            if (result?.error) {
                setError(result.error);
            } else if (result?.success) {
                // FIX: Manually append the new link to the UI instantly
                setLinks((prevLinks) => [result.link, ...prevLinks]);
                e.target.reset();
            }
        });
    };

    const handleDelete = async (id) => {
        startTransition(async () => {
            // Optimistic UI: remove instantly
            setLinks((prevLinks) => prevLinks.filter(link => link._id !== id));
            await deleteLinkAction(id);
        });
    };

    return (
        <div className="min-h-screen w-full bg-gray-50 pt-24 pb-12">
            <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Left Side: Link Management */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-bold mb-4">Add new link</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <input name="title" required placeholder="Title (e.g. My YouTube)" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black" />
                            <input name="url" required placeholder="URL (https://...)" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black" />
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <button type="submit" disabled={isPending} className="w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50">
                                {isPending ? "Adding..." : "Add link"}
                            </button>
                        </form>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold px-2">Your links</h2>
                        <AnimatePresence>
                            {links.length === 0 ? (
                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 text-sm px-2">No links yet. Add your first one above!</motion.p>
                            ) : (
                                links.map((link) => (
                                    <motion.div
                                        key={link._id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center justify-between"
                                    >
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{link.title}</h3>
                                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:underline truncate block max-w-xs">{link.url}</a>
                                        </div>
                                        <button onClick={() => handleDelete(link._id)} className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 rounded-lg hover:bg-red-50">
                                            Delete
                                        </button>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Side: Mobile Preview */}
                <div className="hidden md:block">
                    <div className="sticky top-24">
                        <div className="bg-linear-to-b from-gray-100 to-gray-50 rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col items-center">
                            <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-3xl font-bold text-gray-400">
                                {session.user.username?.[0]?.toUpperCase() || "?"}
                            </div>
                            <h3 className="font-bold text-lg">@{session.user.username}</h3>
                            <p className="text-gray-500 text-sm mb-6">{session.user.email}</p>

                            <div className="w-full space-y-3">
                                {links.length === 0 ? (
                                    <div className="w-full h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                                ) : (
                                    links.slice(0, 5).map(link => (
                                        <div key={link._id} className="w-full bg-white border border-gray-200 rounded-xl py-3 text-center font-medium text-sm text-gray-800 shadow-sm hover:shadow-md transition-shadow">
                                            {link.title}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        <Link href={`/${session.user.username}`} target="_blank" className="block text-center mt-4 text-sm text-indigo-600 hover:underline font-medium">
                            View public profile &rarr;
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}