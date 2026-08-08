// app/admin/users/page.jsx
"use client";

import { useState, useEffect } from "react";
import { getAdminUsers, banUserAction, unbanUserAction } from "@/actions/admin";
import { Search, ChevronLeft, ChevronRight, Ban, ShieldCheck, UserIcon } from "lucide-react";
import { formatBanDate, isBanned } from "@/lib/adminUtils";

export default function AdminUsersPage() {
    const [data, setData] = useState({ users: [], total: 0, totalPages: 0 });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
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

    const handleBan = async (userId) => {
        await banUserAction(userId, banDuration);
        setSelectedUser(null);
        // Refresh data
        const res = await getAdminUsers({ page, limit: 10, search, filter });
        setData(res);
    };

    const handleUnban = async (userId) => {
        await unbanUserAction(userId);
        setSelectedUser(null);
        const res = await getAdminUsers({ page, limit: 10, search, filter });
        setData(res);
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
                                        <button onClick={() => setSelectedUser(user)} className="text-xs font-bold text-blue-400 hover:underline">
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
                <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setSelectedUser(null)}>
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                    <div
                        className="relative w-full max-w-md h-full bg-slate-900 border-l border-white/10 p-8 overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                                <UserIcon size={24} className="text-slate-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{selectedUser.name}</h2>
                                <p className="text-sm text-slate-500">@{selectedUser.username}</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="bg-white/5 p-4 rounded-xl">
                                <p className="text-xs text-slate-500 mb-1">Email</p>
                                <p className="text-sm font-medium">{selectedUser.email}</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl">
                                <p className="text-xs text-slate-500 mb-1">Account Status</p>
                                {isBanned(selectedUser.bannedUntil) ? (
                                    <p className="text-sm font-bold text-red-400">Banned until {formatBanDate(selectedUser.bannedUntil)}</p>
                                ) : (
                                    <p className="text-sm font-bold text-green-400">Active</p>
                                )}
                            </div>
                        </div>

                        {/* Admin Actions */}
                        <div className="border-t border-white/10 pt-6">
                            <h3 className="text-sm font-bold mb-4">Admin Actions</h3>

                            {isBanned(selectedUser.bannedUntil) ? (
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
                    </div>
                </div>
            )}
        </div>
    );
}