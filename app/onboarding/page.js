// app/onboarding/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { setUsernameAction } from "@/actions/userActions";

export default function OnboardingPage() {
    const router = useRouter();
    const { update } = useSession(); // NextAuth function to update session state
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const result = await setUsernameAction(formData);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
        } else if (result?.success) {
            // CRITICAL: Tell NextAuth to update the JWT token with the new username
            await update({ username: result.username });
            // Now that the session has the username, we can safely go to the dashboard
            router.push("/dashboard");
        } else {
            // Fallback if server action returns something unexpected
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center">Pick your username</h1>
                <p className="mt-2 text-gray-500 text-center">This will be your public Linktree URL.</p>

                {error && <div className="mt-6 bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100">{error}</div>}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">linktree/</span>
                            <input
                                name="username"
                                type="text"
                                required
                                className="w-full pl-20 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                placeholder="johndoe"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 flex justify-center items-center"
                    >
                        {loading ? "Saving..." : "Continue"}
                    </button>
                </form>
            </div>
        </div>
    );
}