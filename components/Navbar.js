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
    { label: 'Learn', href: '/learn' },
    { label: 'Pricing', href: '/pricing' },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const pathname = usePathname() || '/';
    const { status } = useSession();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;

            // Scrolling DOWN: hide navbar (only if past 10px and mobile menu is closed)
            if (currentScrollPos > prevScrollPos && currentScrollPos > 10 && !open) {
                setVisible(false);
            }
            // Scrolling UP: show navbar
            else {
                setVisible(true);
            }

            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, open]); // Re-run if scroll position or mobile menu state changes

    // Hide navbar completely on auth pages and dashboard
    if (pathname === '/login' || pathname === '/signup' || pathname === '/onboarding' || pathname === '/forgot-password' || pathname === '/forgot-username' || pathname.startsWith('/dashboard')) {
        return null;
    }

    // Prevent UI flashing: don't render auth buttons until status is determined
    const showAuthButtons = status === 'authenticated' || status === 'unauthenticated';

    return (
        <motion.header
            initial={{ y: -150, opacity: 0 }}
            animate={{
                y: visible ? 0 : -150, // Moves it up off screen when not visible
                opacity: visible ? 1 : 0
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg fixed top-10 w-[90vw] md:w-[80vw] right-[5vw] md:right-[10vw] z-50 rounded-3xl p-3 shadow-lg shadow-black/5 dark:shadow-black/20 border border-black/5 dark:border-white/10"
        >
            <nav className="px-4 sm:px-6 lg:px-8">
                <div className="flex h-14 items-center justify-between">

                    {/* Left Side: Logo & Desktop Links */}
                    <div className="flex items-center gap-8 lg:gap-14">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="/" className="flex items-center gap-2">
                                <Image
                                    alt="LinkTree logo"
                                    src="/logo.svg" // Make sure this path is correct in your public folder
                                    width={40}
                                    height={40}
                                    className="h-8 w-auto"
                                />
                            </Link>
                        </motion.div>

                        <div className="hidden md:flex items-center space-x-1">
                            {LINKS.map((l) => {
                                const isActive = pathname === l.href
                                return (
                                    <Link
                                        key={l.href}
                                        href={l.href}
                                        className={`relative px-4 py-2 text-sm font-semibold transition-colors rounded-full z-10 ${isActive
                                            ? 'text-indigo-600 dark:text-white'
                                            : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white'
                                            }`}
                                    >
                                        {l.label}
                                        {isActive && (
                                            <motion.span
                                                layoutId="nav-active-pill"
                                                className="absolute inset-0 bg-indigo-50 dark:bg-indigo-600/20 rounded-full -z-10"
                                                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    {/* Right Side: Auth Buttons & Mobile Toggle */}
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-4">
                            {!showAuthButtons ? null : status === 'authenticated' ? (
                                <>
                                    <Link href="/dashboard" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition-colors">
                                        Dashboard
                                    </Link>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <button
                                            onClick={() => signOut({ callbackUrl: '/' })}
                                            className="inline-flex items-center px-5 py-2 bg-gray-800 text-white text-sm font-semibold rounded-full hover:bg-black transition-colors shadow-md shadow-black/10"
                                        >
                                            Log out
                                        </button>
                                    </motion.div>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition-colors">
                                        Log in
                                    </Link>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link
                                            href="/signup"
                                            className="inline-flex items-center px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-full hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-600/20"
                                        >
                                            Sign up
                                        </Link>
                                    </motion.div>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button (Animated Hamburger) */}
                        <div className="flex md:hidden">
                            <button
                                aria-label="Toggle menu"
                                aria-expanded={open}
                                onClick={() => setOpen((s) => !s)}
                                className="p-2 rounded-full inline-flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <div className="relative w-6 h-6 flex items-center justify-center">
                                    <motion.span
                                        animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute h-0.5 w-6 bg-current rounded-full"
                                    />
                                    <motion.span
                                        animate={open ? { opacity: 0 } : { opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute h-0.5 w-6 bg-current rounded-full"
                                    />
                                    <motion.span
                                        animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute h-0.5 w-6 bg-current rounded-full"
                                    />
                                </div>
                            </button>
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
                        <div className="px-4 pb-4 pt-2 space-y-1">
                            {LINKS.map((l) => (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    onClick={() => setOpen(false)}
                                    className={`block px-4 py-3 rounded-2xl text-base font-medium transition-colors ${pathname === l.href
                                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-white'
                                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    {l.label}
                                </Link>
                            ))}

                            {/* Mobile Auth Buttons */}
                            <div className="pt-3 mt-2 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3">
                                {!showAuthButtons ? null : status === 'authenticated' ? (
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setOpen(false)}
                                        className="block w-full text-center px-4 py-3 rounded-2xl text-base font-medium bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            onClick={() => setOpen(false)}
                                            className="block w-full text-center px-4 py-3 rounded-2xl text-base font-medium text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href="/signup"
                                            onClick={() => setOpen(false)}
                                            className="block w-full text-center px-4 py-3 rounded-2xl text-base font-medium bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
                                        >
                                            Sign up
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

export default Navbar;