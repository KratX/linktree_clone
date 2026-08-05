"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';

const LINKS = [
    { label: 'Products', href: '/products' },
    { label: 'Templates', href: '/templates' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Pricing', href: '/pricing' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
};

const buttonHoverSpring = {
    scale: 1.05,
    y: -2,
    transition: { type: 'spring', stiffness: 400, damping: 17 }
};
const buttonTapSpring = { scale: 0.95, y: 0 };

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const pathname = usePathname() || '/';
    const { status } = useSession();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;

            if (currentScrollPos > prevScrollPos && currentScrollPos > 10 && !open) {
                setVisible(false);
            } else {
                setVisible(true);
            }

            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, open]);

    const isMarketingRoute = pathname === '/' || LINKS.some(l => pathname.startsWith(l.href));

    if (!isMarketingRoute) {
        return null;
    }

    const showAuthButtons = status === 'authenticated' || status === 'unauthenticated';

    return (
        <motion.header
            initial={{ y: -150, opacity: 0 }}
            animate={{
                y: visible ? 0 : -150,
                opacity: visible ? 1 : 0
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white fixed top-6 w-[92vw] md:w-[80vw] right-[4vw] md:right-[10vw] z-50 rounded-3xl p-2.5 shadow-xl shadow-black/5 border border-black/5 backdrop-blur-xl"
        >
            <nav className="px-3 sm:px-5 lg:px-6">
                <div className="flex h-12 items-center justify-between">

                    {/* Left Side: Logo & Desktop Links */}
                    <div className="flex items-center gap-8 lg:gap-12">
                        <motion.div
                            whileHover={{ scale: 1.08, rotate: -4 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        >
                            <Link href="/" className="flex items-center gap-2">
                                <Image
                                    alt="Linktree logo"
                                    src="/logo.svg"
                                    width={36}
                                    height={36}
                                    className="h-7 w-auto"
                                />
                            </Link>
                        </motion.div>

                        <div className="hidden md:flex items-center space-x-1">
                            {LINKS.map((l) => {
                                const isActive = pathname === l.href;
                                return (
                                    <Link
                                        key={l.href}
                                        href={l.href}
                                        className={`relative px-4 py-2 text-sm font-semibold rounded-full z-10 transition-all duration-300 ease-out hover:-translate-y-0.5 ${isActive
                                            ? 'text-white'
                                            : 'text-gray-600 hover:text-black hover:bg-gray-100'
                                            }`}
                                    >
                                        {l.label}
                                        {isActive && (
                                            <motion.span
                                                layoutId="nav-active-pill"
                                                className="absolute inset-0 bg-black rounded-full -z-10"
                                                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Side: Auth Buttons & Mobile Toggle */}
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-3">
                            {!showAuthButtons ? null : status === 'authenticated' ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className="text-sm font-semibold px-5 py-2.5 border border-black/20 bg-black rounded-full text-white duration-300 hover:-translate-y-0.5 transform inline-block transition hover:bg-slate-800 whitespace-nowrap"
                                    >
                                        Dashboard
                                    </Link>
                                    <motion.div whileHover={buttonHoverSpring} whileTap={buttonTapSpring}>
                                        <button
                                            onClick={() => signOut({ callbackUrl: '/' })}
                                            className="inline-flex cursor-pointer items-center px-5 py-2.5 bg-gray-100 text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition-all duration-300"
                                        >
                                            Log out
                                        </button>
                                    </motion.div>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-sm font-semibold text-gray-700 hover:text-black transition-colors duration-300 hover:-translate-y-0.5 transform inline-block"
                                    >
                                        Log in
                                    </Link>
                                    <motion.div whileHover={buttonHoverSpring} whileTap={buttonTapSpring}>
                                        <Link
                                            href="/signup"
                                            className="inline-flex items-center px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-all duration-300"
                                        >
                                            Sign up
                                        </Link>
                                    </motion.div>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex md:hidden">
                            <motion.button
                                aria-label="Toggle menu"
                                aria-expanded={open}
                                onClick={() => setOpen((s) => !s)}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-full inline-flex items-center justify-center text-black hover:bg-gray-100 transition-colors duration-300"
                            >
                                <div className="relative w-6 h-6 flex items-center justify-center">
                                    <motion.span
                                        animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="absolute h-0.5 w-6 bg-black rounded-full"
                                    />
                                    <motion.span
                                        animate={open ? { opacity: 0 } : { opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute h-0.5 w-6 bg-black rounded-full"
                                    />
                                    <motion.span
                                        animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="absolute h-0.5 w-6 bg-black rounded-full"
                                    />
                                </div>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden overflow-hidden"
                    >
                        <motion.div
                            className="px-4 pb-4 pt-2 space-y-1"
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                        >
                            {LINKS.map((l) => (
                                <motion.div key={l.href} variants={itemVariants}>
                                    <Link
                                        href={l.href}
                                        onClick={() => setOpen(false)}
                                        className={`block px-4 py-3 rounded-2xl text-base font-medium transition-all duration-200 ease-out hover:translate-x-1 ${pathname === l.href
                                            ? 'bg-black text-white'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-black'
                                            }`}
                                    >
                                        {l.label}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                variants={itemVariants}
                                className="pt-3 mt-2 border-t border-gray-100 flex flex-col gap-3"
                            >
                                {!showAuthButtons ? null : status === 'authenticated' ? (
                                    <motion.div whileHover={buttonHoverSpring} whileTap={buttonTapSpring}>
                                        <Link
                                            href="/dashboard"
                                            onClick={() => setOpen(false)}
                                            className="block w-full text-center px-4 py-3 rounded-2xl text-base font-medium bg-black text-white hover:bg-gray-800 transition-colors shadow-md"
                                        >
                                            Dashboard
                                        </Link>
                                    </motion.div>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            onClick={() => setOpen(false)}
                                            className="block w-full text-center px-4 py-3 rounded-2xl text-base font-medium text-black border border-gray-200 hover:bg-gray-50 hover:translate-x-1 transition-all duration-200"
                                        >
                                            Log in
                                        </Link>
                                        <motion.div whileHover={buttonHoverSpring} whileTap={buttonTapSpring}>
                                            <Link
                                                href="/signup"
                                                onClick={() => setOpen(false)}
                                                className="block w-full text-center px-4 py-3 rounded-2xl text-base font-medium bg-black text-white hover:bg-gray-800 transition-colors shadow-md"
                                            >
                                                Sign up
                                            </Link>
                                        </motion.div>
                                    </>
                                )}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

export default Navbar;
