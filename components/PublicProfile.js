// components/PublicProfile.jsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AvatarRenderer } from "./Avatars";
import { PlatformIcon } from "./SocialIcons";

export default function PublicProfile({ user, links }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    };

    const bgStyle = user.isGradient
        ? { backgroundImage: `linear-gradient(${user.bgDirection}, ${user.bgColor1}, ${user.bgColor2})` }
        : { backgroundColor: user.bgColor1 || '#FFFFFF' };

    const textLinks = links.filter(l => l.type === 'text' || !l.type);
    const socialLinks = links.filter(l => l.type === 'social');

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start pt-12 pb-20 px-4 relative" style={bgStyle}>

            <motion.div
                className="w-full max-w-md flex flex-col items-center relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Profile Header */}
                <motion.div variants={itemVariants} className="flex flex-col items-center mb-8 w-full">
                    <div className="w-24 h-24 rounded-full bg-gray-200/50 backdrop-blur flex items-center justify-center mb-4 overflow-hidden">
                        {user.avatar ? (
                            <div className="w-full h-full p-5" style={{ color: user.iconColor }}>
                                <AvatarRenderer avatarId={user.avatar} />
                            </div>
                        ) : (
                            <span className="text-3xl font-bold text-gray-500">{user.username?.[0]?.toUpperCase()}</span>
                        )}
                    </div>
                    <h1 className="text-xl font-bold tracking-tight" style={{ color: user.textColor }}>
                        {user.name || user.username}
                    </h1>
                    {/* FIX: Added w-full and break-words so bio text wraps correctly */}
                    {user.bio && <p className="text-sm mt-1 text-center mb-4 w-full wrap-break-word" style={{ color: user.textColor }}>{user.bio}</p>}
                </motion.div>

                {/* Social Icons */}
                {socialLinks.length > 0 && (
                    <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-8">
                        {socialLinks.map((link) => {
                            return (
                                <motion.a
                                    key={link._id}
                                    href={`/api/redirect/${link._id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    className="transition-transform"
                                >
                                    <PlatformIcon platform={link.platform} className="text-2xl" style={{ color: user.iconColor }} />
                                </motion.a>
                            );
                        })}
                    </motion.div>
                )}

                {/* Text Links */}
                <div className="w-full space-y-3">
                    {textLinks.map((link) => (
                        <motion.a
                            key={link._id}
                            href={`/api/redirect/${link._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="block w-full text-center font-medium py-3 px-6 rounded-xl shadow-sm transition-all"
                            style={{ backgroundColor: user.boxColor, color: user.textColor }}
                        >
                            {link.title}
                        </motion.a>
                    ))}
                </div>

                {/* Footer */}
                <motion.div variants={itemVariants} className="mt-16">
                    <Link href="/" className="text-gray-400 text-xs hover:text-gray-600 transition-colors font-medium tracking-wider uppercase">
                        Powered by Linktree
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}