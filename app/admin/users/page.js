// app/admin/users/page.jsx
"use client";

import { useState, useEffect } from "react";
import { getAdminUsers, banUserAction, unbanUserAction, getAdminUserDetails, adminEditLinkAction, adminDeleteLinkAction } from "@/actions/admin";
import { Search, ChevronLeft, ChevronRight, Ban, ShieldCheck, UserIcon, Save, Trash2, Link2 } from "lucide-react";
import { isBanned } from "@/lib/adminUtils";

export default function AdminUsersPage() {
    const [data, setData] = useState({ users: [], total: 0, totalPages: 0 });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");

    // State for the Deep-Dive Drawer
    const [selectedUser, setSelectedUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [banDuration, setBanDuration] = useState("1");

    useEffect(() => {
        async function fetchUsers() {
            setLoading(true);
            const res = await getAdminUsers({ page, limit: 10, search, filter });
            setData(res);
            setLoading(false);
        }
        fetchUsers();
    }, [page, search, filter]);

    // FIX: Fetch full details when a user is clicked
    const handleManageClick = async (user) => {
        setSelectedUser(user);
        setLoadingDetails(true);
        const details = await getAdminUserDetails(user._id);
        setUserDetails(details);
        setLoadingDetails(false);
    };

    const handleBan = async (userId) => {
        await banUserAction(userId, banDuration);
        setSelectedUser(null);
        const res = await getAdminUsers({ page, limit: 10, search, filter });
        setData(res);
    };

    const handleUnban = async (userId) => {
        await unbanUserAction(userId);
        setSelectedUser(null);
        const res = await getAdminUsers({ page, limit: 10, search, filter });
        setData(res);
    };

    // FIX: Handle link deletion inside the drawer
    const handleDeleteLink = async (linkId) => {
        if (!confirm("Are you sure you want to permanently delete this link?")) return;
        await adminDeleteLinkAction(linkId);
        // Refresh the details view
        const details = await getAdminUserDetails(selectedUser._id);
        setUserDetails(details);
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-black">User Management</h1>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:max-w-xs">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search email or username..."
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setFilter("")} className={`px-4 py-2 rounded-full text-sm font-medium ${filter === "" ? "bg-white text-black" : "bg-white/5 text-slate-400"}`}>All</button>
                    <button onClick={() => setFilter("banned")} className={`px-4 py-2 rounded-full text-sm font-medium ${filter === "banned" ? "bg-white text-black" : "bg-white/5 text-slate-400"}`}>Banned</button>
                    <button onClick={() => setFilter("new")} className={`px-4 py-2 rounded-full text-sm font-medium ${filter === "new" ? "bg-white text-black" : "bg-white/5 text-slate-400"}`}>New Today</button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="border-b border-white/10 text-xs uppercase text-slate-500">
                        <tr>
                            <th className="p-4 font-medium">User</th>
                            <th className="p-4 font-medium hidden md:table-cell">Email</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="4" className="p-8 text-center text-slate-500">Loading users...</td></tr>
                        ) : data.users.length === 0 ? (
                            <tr><td colSpan="4" className="p-8 text-center text-slate-500">No users found.</td></tr>
                        ) : (
                            data.users.map(user => (
                                <tr key={user._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <p className="font-bold text-sm">{user.name || "N/A"}</p>
                                        <p className="text-xs text-slate-500">@{user.username || "no-username"}</p>
                                    </td>
                                    <td className="p-4 text-sm hidden md:table-cell">{user.email}</td>
                                    <td className="p-4">
                                        {isBanned(user.bannedUntil) ? (
                                            <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold">Banned</span>
                                        ) : (
                                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">Active</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => handleManageClick(user)} className="text-xs font-bold text-blue-400 hover:underline">
                                            Manage
                                        </button>
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

            {/* User Deep-Dive Drawer */}
            {selectedUser && (
                <div className="fixed inset-0 z-50 flex justify-end" onClick={() => { setSelectedUser(null); setUserDetails(null); }}>
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                    <div
                        className="relative w-full max-w-lg h-full bg-slate-900 border-l border-white/10 p-8 overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                                <UserIcon size={24} className="text-slate-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{selectedUser.name}</h2>
                                <p className="text-sm text-slate-500">@{selectedUser.username}</p>
                            </div>
                        </div>

                        {loadingDetails ? (
                            <div className="text-center text-slate-500 py-10">Loading details...</div>
                        ) : userDetails ? (
                            <>
                                {/* Profile Info Grid */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-white/5 p-4 rounded-xl col-span-2">
                                        <p className="text-xs text-slate-500 mb-1">Email</p>
                                        <p className="text-sm font-medium">{userDetails.user.email}</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl col-span-2">
                                        <p className="text-xs text-slate-500 mb-1">Bio</p>
                                        <p className="text-sm text-wrap font-medium">{userDetails.user.bio || "No bio set"}</p>
                                    </div>
                                </div>

                                {/* Links Management */}
                                <div className="mb-8">
                                    <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                                        <Link2 size={16} /> User Links ({userDetails.links.length})
                                    </h3>
                                    <div className="space-y-3">
                                        {userDetails.links.length === 0 ? (
                                            <p className="text-sm text-slate-500 bg-white/5 p-4 rounded-xl text-center">This user has no links.</p>
                                        ) : (
                                            userDetails.links.map(link => (
                                                <AdminLinkRow key={link._id} link={link} onDelete={handleDeleteLink} />
                                            ))
                                        )}
                                    </div>
                                </div>

                                {/* Admin Actions */}
                                <div className="border-t border-white/10 pt-6">
                                    <h3 className="text-sm font-bold mb-4">Moderation Actions</h3>

                                    {isBanned(userDetails.user.bannedUntil) ? (
                                        <button
                                            onClick={() => handleUnban(selectedUser._id)}
                                            className="w-full flex items-center justify-center gap-2 bg-green-500/20 text-green-400 py-3 rounded-xl font-semibold hover:bg-green-500/30 transition-colors"
                                        >
                                            <ShieldCheck size={18} /> Unban User
                                        </button>
                                    ) : (
                                        <div className="space-y-3">
                                            <select
                                                value={banDuration}
                                                onChange={(e) => setBanDuration(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
                                            >
                                                <option value="1">Ban for 1 Day</option>
                                                <option value="7">Ban for 7 Days</option>
                                                <option value="30">Ban for 30 Days</option>
                                                <option value="permanent">Ban Permanently</option>
                                            </select>
                                            <button
                                                onClick={() => handleBan(selectedUser._id)}
                                                className="w-full flex items-center justify-center gap-2 bg-red-500/20 text-red-400 py-3 rounded-xl font-semibold hover:bg-red-500/30 transition-colors"
                                            >
                                                <Ban size={18} /> Ban User
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
}

// FIX: New sub-component for inline link editing
function AdminLinkRow({ link, onDelete }) {
    const [title, setTitle] = useState(link.title);
    const [url, setUrl] = useState(link.url);
    const [saving, setSaving] = useState(false);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("url", url);
        await adminEditLinkAction(link._id, formData);
        setSaving(false);
    };

    return (
        <form onSubmit={handleSave} className="bg-white/5 p-4 rounded-xl space-y-2">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent border-b border-white/10 text-sm font-bold focus:outline-none focus:border-white pb-1"
            />
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-400 focus:outline-none focus:text-white"
            />
            <div className="flex justify-end gap-2 pt-2">
                <button
                    type="button"
                    onClick={() => onDelete(link._id)}
                    className="flex items-center gap-1 text-xs font-bold text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg hover:bg-red-500/20"
                >
                    <Trash2 size={12} /> Delete
                </button>
                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-1 text-xs font-bold text-white bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20"
                >
                    <Save size={12} /> {saving ? "Saving..." : "Save"}
                </button>
            </div>
        </form>
    );
}