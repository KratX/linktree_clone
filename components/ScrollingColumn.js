"use client";

import React from "react";
import { motion } from "framer-motion";

// Mock creator profiles used to build the illusion of a living product,
// without relying on real photos or real people.
const PROFILES = [
    { initials: "MJ", name: "Maren J.", handle: "@marenmakes", accent: "#FF6B6B" },
    { initials: "KO", name: "Kofi O.", handle: "@kofisounds", accent: "#4D96FF" },
    { initials: "PL", name: "Priya L.", handle: "@priyapaints", accent: "#FFB84D" },
    { initials: "DS", name: "Dana S.", handle: "@danastudio", accent: "#7C5CFC" },
    { initials: "RT", name: "Remi T.", handle: "@remi.reads", accent: "#2ED3A4" },
    { initials: "AV", name: "Ana V.", handle: "@anavo", accent: "#FF7AB6" },
];

function ProfileCard({ profile }) {
    return (
        <div className="w-full rounded-2xl bg-white shadow-lg shadow-black/5 border border-black/5 p-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
                <div
                    className="h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ backgroundColor: profile.accent }}
                >
                    {profile.initials}
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{profile.name}</p>
                    <p className="text-xs text-slate-400 truncate">{profile.handle}</p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="h-8 rounded-lg bg-slate-100 w-full" />
                <div className="h-8 rounded-lg bg-slate-100 w-full" />
                <div
                    className="h-8 rounded-lg w-full opacity-90"
                    style={{ backgroundColor: profile.accent }}
                />
            </div>
        </div>
    );
}

export default function ScrollingColumn({ duration = 30, reverse = false, offset = false }) {
    // Duplicate the list so the loop can reset seamlessly at -50%.
    const doubled = [...PROFILES, ...PROFILES];

    return (
        <div className="relative h-full w-44 overflow-hidden">
            <motion.div
                className="flex flex-col gap-5"
                style={{ marginTop: offset ? "-140px" : 0 }}
                animate={{ y: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
                transition={{ duration, repeat: Infinity, ease: "linear" }}
            >
                {doubled.map((profile, i) => (
                    <ProfileCard key={`${profile.handle}-${i}`} profile={profile} />
                ))}
            </motion.div>
        </div>
    );
}
