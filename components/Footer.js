import React from "react";
import Link from "next/link";
// FIX: Use react-icons for brand icons instead of lucide-react
import { FaInstagram, FaTwitter, FaYoutube, FaSpotify } from "react-icons/fa";

const COLUMNS = [
    {
        title: "Product",
        links: [
            { label: "Products", href: "/products" },
            { label: "Templates", href: "/templates" },
            { label: "Marketplace", href: "/marketplace" },
            { label: "Pricing", href: "/pricing" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Help center", href: "#" },
            { label: "Creator blog", href: "#" },
            { label: "API docs", href: "#" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Press", href: "#" },
            { label: "Contact", href: "#" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Privacy policy", href: "#" },
            { label: "Terms of service", href: "#" },
            { label: "Cookie settings", href: "#" },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-white px-6 pt-20 pb-10 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
                    <div className="col-span-2 md:col-span-2">
                        <Link href="/" className="text-2xl font-black tracking-tight">
                            linktree
                        </Link>
                        <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
                            One link to share everything you create, curate and sell — built
                            for creators, businesses and artists.
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                            {[FaInstagram, FaTwitter, FaSpotify, FaYoutube].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    aria-label="Social link"
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-300 transition hover:border-white/30 hover:text-white"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {COLUMNS.map((col) => (
                        <div key={col.title} className="col-span-1">
                            <p className="text-sm font-semibold text-white">{col.title}</p>
                            <ul className="mt-4 space-y-3">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-slate-400 transition hover:text-white"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>© {new Date().getFullYear()} Linktree. All rights reserved.</p>
                    <p>Made for creators, everywhere.</p>
                </div>
            </div>
        </footer>
    );
}