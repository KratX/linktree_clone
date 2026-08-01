// auth.config.js
import Google from "next-auth/providers/google";

export const authConfig = {
    pages: {
        signIn: "/login",
        error: "/auth/error",
    },
    callbacks: {
        // FIX: Removed the authorized callback to prevent Next.js 16 serialization crashes.
        // Route protection is handled entirely by proxy.js now.
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
        }
    },
    providers: [
        Google({ allowDangerousEmailAccountLinking: true }),
    ],
};