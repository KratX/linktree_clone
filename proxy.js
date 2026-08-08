// proxy.js
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb-client";
import { ObjectId } from "mongodb";
import { isBanned } from "@/lib/adminUtils";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
    // 1. Allow Server Actions to pass through
    if (req.headers.get("Next-Action")) {
        return NextResponse.next();
    }

    const isLoggedIn = !!req.auth;
    const path = req.nextUrl.pathname;
    const isAdminRoute = path.startsWith("/admin");
    const isOnDashboard = path.startsWith("/dashboard");
    const isOnOnboarding = path.startsWith("/onboarding");
    const isOnAuth = path.startsWith("/login") || path.startsWith("/signup");

    // 2. Admin Route Protection
    if (isAdminRoute) {
        if (!isLoggedIn || req.auth?.user?.role !== "admin") {
            return NextResponse.redirect(new URL("/", req.url));
        }
        return NextResponse.next();
    }

    // 3. Bulletproof Ban Check for Dashboard
    if (isOnDashboard && isLoggedIn) {
        try {
            const client = await clientPromise;
            const db = client.db();
            const user = await db.collection("users").findOne({ _id: new ObjectId(req.auth.user.id) });

            if (user && isBanned(user.bannedUntil)) {
                // User is banned! Delete their session cookie and redirect
                const res = NextResponse.redirect(new URL("/login?error=AccessDenied", req.url));
                res.cookies.delete("authjs.session-token");
                return res;
            }
        } catch (e) {
            console.error("Ban check error:", e);
        }
    }

    // 4. Standard Route Protections
    if (isOnDashboard) {
        if (!isLoggedIn) return NextResponse.redirect(new URL("/login", req.url));
        if (isLoggedIn && !req.auth?.user?.username) return NextResponse.redirect(new URL("/onboarding", req.url));
        return NextResponse.next();
    }

    if (isOnOnboarding) {
        if (!isLoggedIn) return NextResponse.redirect(new URL("/login", req.url));
        if (isLoggedIn && req.auth?.user?.username) return NextResponse.redirect(new URL("/dashboard", req.url));
        return NextResponse.next();
    }

    if (isOnAuth) {
        if (isLoggedIn) return NextResponse.redirect(new URL("/dashboard", req.url));
        return NextResponse.next();
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};