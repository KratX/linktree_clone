// app/admin/page.jsx
"use client";

import { useState, useEffect } from "react";
import { getAdminStats } from "@/actions/admin";
import { Users, Link2, MousePointerClick, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            const data = await getAdminStats();
            setStats(data);
            setLoading(false);
        }
        fetchStats();
    }, []);

    if (loading || !stats) {
        return <div className="text-white">Loading analytics...</div>;
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-black">Analytics Overview</h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={<Users size={20} />} label="Total Users" value={stats.totalUsers} />
                <StatCard icon={<Link2 size={20} />} label="Total Links" value={stats.totalLinks} />
                <StatCard icon={<MousePointerClick size={20} />} label="Total Clicks" value={stats.totalClicks} />
            </div>

            {/* Charts */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <TrendingUp size={20} /> Growth (Last 14 Days)
                </h2>
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={stats.signups.map(s => ({ date: s._id.split('-').slice(1).join('/'), signups: s.count }))}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                            <XAxis dataKey="date" stroke="#888" fontSize={12} />
                            <YAxis stroke="#888" fontSize={12} allowDecimals={false} />
                            <Tooltip contentStyle={{ background: '#000', border: '1px solid #fff20', borderRadius: '12px' }} />
                            <Line type="monotone" dataKey="signups" stroke="#d2e823" strokeWidth={3} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Activity Feed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <h2 className="text-xl font-bold mb-4">Recent Users</h2>
                    <div className="space-y-3">
                        {stats.recentUsers.map(user => (
                            <div key={user._id} className="flex items-center justify-between text-sm">
                                <span className="font-medium">{user.email}</span>
                                <span className="text-slate-500">{user.username || "No username"}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <h2 className="text-xl font-bold mb-4">Recent Links</h2>
                    <div className="space-y-3">
                        {stats.recentLinks.map(link => (
                            <div key={link._id} className="flex items-center justify-between text-sm">
                                <span className="font-medium truncate w-1/2">{link.title}</span>
                                <a href={link.url} target="_blank" className="text-blue-400 truncate w-1/2 text-right pl-4">{link.url}</a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-400">{label}</p>
                <div className="p-2 bg-white/5 rounded-lg text-white">{icon}</div>
            </div>
            <p className="text-3xl font-black">{value.toLocaleString()}</p>
        </div>
    );
}