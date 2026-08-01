// proxy.js (or middleware.js)
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    // Allow Server Actions to pass through so they can return custom errors 
    if (req.headers.get("Next-Action")) {
        return NextResponse.next();
    }

    const isLoggedIn = !!req.auth;
    const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
    const isOnOnboarding = req.nextUrl.pathname.startsWith("/onboarding");
    const isOnAuth = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/signup");

    if (isOnDashboard) {
        if (!isLoggedIn) return NextResponse.redirect(new URL("/login", req.url));
        if (isLoggedIn && !req.auth?.user?.username) {
            return NextResponse.redirect(new URL("/onboarding", req.url));
        }
        return NextResponse.next();
    }

    if (isOnOnboarding) {
        if (!isLoggedIn) return NextResponse.redirect(new URL("/login", req.url));
        if (isLoggedIn && req.auth?.user?.username) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
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