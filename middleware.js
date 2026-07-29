// middleware.js
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
    // Match all paths except for the ones starting with api, _next/static, _next/image, and favicon.ico
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};