// app/admin/links/page.jsx
"use client";

import { useState, useEffect } from "react";
import { getAdminLinks, adminDeleteLinkAction } from "@/actions/admin";
import { Search, ChevronLeft, ChevronRight, Trash2, ExternalLink } from "lucide-react";

export default function AdminLinksPage() {
    const [data, setData] = useState({ links: [], total: 0, totalPages: 0 });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function fetchLinks() {
            setLoading(true);
            const res = await getAdminLinks({ page, limit: 10, search });
            setData(res);
            setLoading(false);
        }
        fetchLinks();
    }, [page, search]);

    const handleDelete = async (linkId) => {
        if (!confirm("Are you sure you want to delete this link?")) return;
        await adminDeleteLinkAction(linkId);
        // Refresh data
        const res = await getAdminLinks({ page, limit: 10, search });
        setData(res);
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-black">Link Moderation</h1>

            {/* Controls */}
            <div className="relative w-full sm:max-w-xs">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                    type="text"
                    placeholder="Search title or URL..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
            </div>

            {/* Table */}
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="border-b border-white/10 text-xs uppercase text-slate-500">
                        <tr>
                            <th className="p-4 font-medium">Link</th>
                            <th className="p-4 font-medium hidden md:table-cell">Owner</th>
                            <th className="p-4 font-medium hidden lg:table-cell">Clicks</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="4" className="p-8 text-center text-slate-500">Loading links...</td></tr>
                        ) : data.links.length === 0 ? (
                            <tr><td colSpan="4" className="p-8 text-center text-slate-500">No links found.</td></tr>
                        ) : (
                            data.links.map(link => (
                                <tr key={link._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <p className="font-bold text-sm">{link.title}</p>
                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline truncate block max-w-xs">
                                            {link.url}
                                        </a>
                                    </td>
                                    <td className="p-4 text-sm hidden md:table-cell">
                                        {link.user ? link.user.email : "Unknown User"}
                                    </td>
                                    <td className="p-4 text-sm hidden lg:table-cell">{link.clicks || 0}</td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                                            >
                                                <ExternalLink size={16} />
                                            </a>
                                            <button
                                                onClick={() => handleDelete(link._id)}
                                                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">Page {page} of {data.totalPages}</p>
                <div className="flex gap-2">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="p-2 rounded-lg bg-white/5 disabled:opacity-30 hover:bg-white/10"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={page >= data.totalPages}
                        className="p-2 rounded-lg bg-white/5 disabled:opacity-30 hover:bg-white/10"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}