"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const { status } = useSession();

  const isLoggedIn = status === "authenticated";
  const isLoading = status === "loading";

  if (isLoading) {
    return <div className="h-14" />;
  }

  if (isLoggedIn) {
    return (
      <Link
        href="/dashboard"
        className="rounded-full border border-black/20 bg-black px-10 py-4 text-center font-semibold text-white transition hover:bg-slate-800 whitespace-nowrap w-full sm:w-auto"
      >
        Go to Dashboard
      </Link>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row w-full max-w-xl">
      <div className="flex items-center bg-white rounded-lg shadow-sm px-4 py-3 flex-1 w-full">
        <span className="text-gray-500 font-medium select-none">linktree/</span>
        <input
          type="text"
          placeholder="yourname"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-transparent outline-none ml-1 text-gray-900 placeholder-gray-400 font-medium"
        />
      </div>
      <Link
        href={`/signup?username=${encodeURIComponent(username)}`}
        className="rounded-full border border-black/20 bg-[#254f1a] px-8 py-4 text-center font-semibold text-white transition hover:bg-slate-800 whitespace-nowrap"
      >
        Get started for free
      </Link>
    </div>
  );
}