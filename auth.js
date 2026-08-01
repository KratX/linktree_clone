// auth.js
import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb-client";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config";
import { emailBloom } from "@/lib/bloomFilter";

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: MongoDBAdapter(clientPromise),
    session: { strategy: "jwt" },
    providers: [
        ...authConfig.providers,
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
    callbacks: {
        ...authConfig.callbacks,

        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                if (user.username) {
                    token.username = user.username;
                }
            }

            if (trigger === "update" && session?.username) {
                token.username = session.username;
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                if (token.username) {
                    session.user.username = token.username;
                }
            }
            return session;
        },

        // FIX: Sync Bloom Filter when Google user signs in
        async signIn({ user, account }) {
            if (account?.provider === "google" && user?.email) {
                const client = await clientPromise;
                const db = client.db();
                const cacheCollection = db.collection("bloom_cache");

                const emailCache = await cacheCollection.findOne({ _id: "emails" });
                if (emailCache?.state) emailBloom.importState(emailCache.state);

                if (!emailBloom.contains(user.email)) {
                    emailBloom.add(user.email);
                    await cacheCollection.updateOne(
                        { _id: "emails" },
                        { $set: { state: emailBloom.exportState() } },
                        { upsert: true }
                    );
                }
            }
            return true;
        }
    },
    // Explicitly define pages here so the API route uses them
    pages: {
        signIn: "/login",
        error: "/auth/error",
    },
});