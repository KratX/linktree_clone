"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react"; // FIX: Added useSession hook
import ScrollingColumn from "@/components/ScrollingColumn";

const features = [
  {
    title: "Customizable links",
    description:
      "Make your profile feel like you with branded colors, custom buttons, and a clean layout.",
  },
  {
    title: "Built-in analytics",
    description:
      "See which links drive the most clicks so you can focus on what grows your audience.",
  },
  {
    title: "Commerce ready",
    description:
      "Sell products, collect tips, and connect your audience to your storefront in seconds.",
  },
  {
    title: "Templates for every creator",
    description:
      "Start fast with ready-made layouts for creators, businesses, and artists.",
  },
];

export default function Home() {
  const [username, setUsername] = useState("");
  const { status } = useSession(); // FIX: Get auth status

  // Prevent UI flashing while session is being checked
  const isLoggedIn = status === "authenticated";
  const isLoading = status === "loading";

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden bg-[#d2e823] px-6 pb-20 pt-32 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="mb-6 inline-flex rounded-full border border-black/15 bg-white/70 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#254f1a]">
              Link in bio for creators
            </p>
            <h1 className="text-5xl font-black leading-[0.95] sm:text-6xl lg:text-8xl text-[#254f1a]">
              A link in bio built for you.
            </h1>
            <p className="mt-8 max-w-xl text-lg font-semibold leading-8 text-[#254f1a]">
              Join 70M+ people using Linktree for their link in bio. One link to
              help you share everything you create, curate and sell from your
              Instagram, TikTok, Twitter, YouTube and other social media
              profiles.
            </p>

            {/* FIX: Conditional rendering based on auth status */}
            {isLoading ? (
              <div className="mt-10 h-14"></div> // Placeholder to prevent layout shift
            ) : isLoggedIn ? (
              <div className="mt-10 flex flex-col gap-4 sm:flex-row w-full max-w-xl">
                <Link
                  href="/dashboard"
                  className="rounded-full border border-black/20 bg-black px-10 py-4 text-center font-semibold text-white transition hover:bg-slate-800 whitespace-nowrap w-full sm:w-auto"
                >
                  Go to Dashboard
                </Link>
              </div>
            ) : (
              <div className="mt-10 flex flex-col gap-4 sm:flex-row w-full max-w-xl">
                <div className="flex items-center bg-white rounded-lg shadow-sm px-4 py-3 flex-1 w-full">
                  <span className="text-gray-500 font-medium select-none">
                    linktree/
                  </span>
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
            )}
          </div>

          <div className="relative mx-auto hidden h-180 w-full max-w-140 items-center justify-center overflow-hidden lg:flex">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32 bg-linear-to-b from-[#d8f04b] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-linear-to-t from-[#d8f04b] to-transparent" />

            <div className="absolute left-1/2 top-1/2 h-130 w-130 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-[120px]" />

            <div className="relative flex gap-5">
              <ScrollingColumn duration={28} />

              <ScrollingColumn reverse duration={36} offset />

              <ScrollingColumn duration={24} />
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="bg-white px-6 py-24 md:px-10 lg:px-16 min-h-screen"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                What Linktree does
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
                One home for everything you create, curate, and sell.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Connect your audience to your latest content, your store, your
                calendar, and your social channels with a single shareable URL.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
                >
                  <h3 className="text-xl font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-24 text-white md:px-10 lg:px-16 min-h-screen">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                Trusted worldwide
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
                Creators, businesses, and artists use Linktree to grow every
                day.
              </h2>
            </div>
            <Link
              href="/pricing"
              className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              See pricing
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { value: "70M+", label: "people using Linktree" },
              { value: "5B+", label: "clicks every year" },
              { value: "1 link", label: "for all your content" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <p className="text-4xl font-black">{stat.value}</p>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
