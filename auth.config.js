// auth.config.js
import Google from "next-auth/providers/google";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        // 1. Middleware Route Protection
        authorized({ auth, request }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
            const isOnOnboarding = request.nextUrl.pathname.startsWith("/onboarding");
            const isOnAuth = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/signup");

            // If trying to access dashboard without a username -> redirect to onboarding
            if (isOnDashboard) {
                if (!isLoggedIn) return false; // Redirect to login
                if (isLoggedIn && !auth?.user?.username) {
                    return Response.redirect(new URL("/onboarding", request.nextUrl));
                }
                return true;
            }

            // If they already have a username and try to access onboarding -> redirect to dashboard
            if (isOnOnboarding) {
                if (!isLoggedIn) return false; // Redirect to login
                if (isLoggedIn && auth?.user?.username) {
                    return Response.redirect(new URL("/dashboard", request.nextUrl));
                }
                return true;
            }

            // If logged in and trying to access login/signup -> redirect to dashboard
            if (isOnAuth) {
                if (isLoggedIn) return Response.redirect(new URL("/dashboard", request.nextUrl));
                return true;
            }

            return true;
        },

        // 2. JWT Callback (Edge-safe, no DB calls)
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                // Only set username if it actually exists (Credentials users will have it, Google users won't yet)
                if (user.username) {
                    token.username = user.username;
                }
            }

            // Handle Client-Side Session Update (when they submit the onboarding form)
            // This updates the JWT cookie instantly without needing a DB query!
            if (trigger === "update" && session?.username) {
                token.username = session.username;
            }

            return token;
        },

        // 3. Session Callback (Edge-safe, passes token data to session)
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                // Pass username to session (will be undefined if they haven't set it yet)
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