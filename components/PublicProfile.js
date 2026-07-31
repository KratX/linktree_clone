// components/PublicProfile.jsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PublicProfile({ user, links }) {
    // Framer Motion variants for staggered animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
        },
    };

    return (
        <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-start pt-12 pb-20 px-4 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-150 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-100 h-100 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                className="w-full max-w-md flex flex-col items-center relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Profile Header */}
                <motion.div variants={itemVariants} className="flex flex-col items-center mb-10">
                    <div className="relative mb-5">
                        {/* Glowing ring around avatar */}
                        <div className="absolute inset-0 bg-linear-to-br from-emerald-400 to-cyan-500 rounded-full blur-md opacity-70 animate-pulse"></div>
                        <div className="relative w-28 h-28 bg-slate-900 border-2 border-white/10 rounded-full flex items-center justify-center text-5xl font-bold text-white shadow-xl">
                            {user.username?.[0]?.toUpperCase()}
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        @{user.username}
                    </h1>
                </motion.div>

                {/* Links List */}
                <div className="w-full space-y-4">
                    {links.length === 0 ? (
                        <motion.p variants={itemVariants} className="text-gray-500 text-center mt-10 text-lg">
                            No links available yet.
                        </motion.p>
                    ) : (
                        links.map((link) => (
                            <motion.a
                                key={link._id}
                                href={`/api/redirect/${link._id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                className="group relative block w-full bg-white/5 backdrop-blur-xl border border-white/10 text-white text-center font-medium py-4 px-6 rounded-2xl shadow-lg overflow-hidden"
                            >
                                {/* Shimmer effect on hover */}
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {link.title}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="opacity-50 group-hover:opacity-100 transition-opacity"
                                    >
                                        <path d="M7 7h10v10" /><path d="M7 17 17 7" />
                                    </svg>
                                </span>
                            </motion.a>
                        ))
                    )}
                </div>

                {/* Footer */}
                <motion.div variants={itemVariants} className="mt-16">
                    <Link href="/" className="text-gray-600 text-xs hover:text-gray-400 transition-colors font-medium tracking-wider uppercase">
                        Powered by Linktree
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}