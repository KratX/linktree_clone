// auth.config.js
import Google from "next-auth/providers/google";

export const ADMIN_EMAIL = "krats.dev@gmail.com";

export const authConfig = {
    pages: {
        signIn: "/login",
        error: "/auth/error",
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                if (user.username) token.username = user.username;
                // FIX: Add admin flag to token
                token.role = user.email === ADMIN_EMAIL ? "admin" : "user";
            }

            if (trigger === "update" && session?.username) {
                token.username = session.username;
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                if (token.username) session.user.username = token.username;
                // FIX: Expose admin flag to client
                session.user.role = token.role;
            }
            return session;
        }
    },
    providers: [
        Google({ allowDangerousEmailAccountLinking: true }),
    ],
};