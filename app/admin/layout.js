// app/admin/layout.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Link2, Home } from "lucide-react";

const navItems = [
    { label: "Analytics", href: "/admin", icon: LayoutDashboard },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Links", href: "/admin/links", icon: Link2 },
];

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-slate-950 text-white flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 p-6 flex flex-col justify-between fixed h-full">
                <div>
                    <div className="mb-10">
                        <Link href="/" className="text-2xl font-black text-white">Admin</Link>
                        <p className="text-xs text-slate-500 mt-1">Linktree Clone Panel</p>
                    </div>
                    <nav className="space-y-2">
                        {navItems.map(item => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive ? "bg-white text-black" : "text-slate-400 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <item.icon size={18} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
                    <Home size={18} />
                    Back to App
                </Link>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 lg:p-12">
                {children}
            </main>
        </div>
    );
}