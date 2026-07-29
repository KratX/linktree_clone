// auth.js
import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb-client";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: MongoDBAdapter(clientPromise),
    session: { strategy: "jwt" },

    // FIX: Explicitly define pages here so the API route uses them
    pages: {
        signIn: "/login",
        error: "/auth/error",
    },

    providers: [
        ...authConfig.providers, // Google Provider
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email or Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) throw new Error("Missing credentials");

                const client = await clientPromise;
                const db = client.db();

                // FIX: Use $or to allow logging in with EITHER email OR username
                const user = await db.collection("users").findOne({
                    $or: [
                        { email: credentials.email.toLowerCase() },
                        { username: credentials.email.toLowerCase() }
                    ]
                });

                if (!user || !user.hashedPassword) throw new Error("No user found.");

                const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);
                if (!isValid) throw new Error("Incorrect password");

                return { id: user._id.toString(), name: user.name, email: user.email, username: user.username };
            },
        }),
    ],
    // Callbacks are inherited from auth.config.js
});