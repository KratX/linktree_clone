import Link from "next/link";
import {
  Shirt,
  FileDown,
  BookOpenCheck,
  PhoneCall,
  Coffee,
  Users,
  ShieldCheck,
  Zap,
  Wallet,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    icon: Shirt,
    name: "Merch",
    description: "Print-on-demand and custom drops, connected straight to your page.",
  },
  {
    icon: FileDown,
    name: "Digital downloads",
    description: "Presets, templates, ebooks, and files delivered instantly on purchase.",
  },
  {
    icon: BookOpenCheck,
    name: "Courses",
    description: "Package what you know into a paid course your audience can enroll in.",
  },
  {
    icon: PhoneCall,
    name: "1:1 bookings",
    description: "Sell coaching calls, consults, or sessions with built-in scheduling.",
  },
  {
    icon: Coffee,
    name: "Tip jar",
    description: "Let your biggest fans send support directly, no separate account needed.",
  },
  {
    icon: Users,
    name: "Affiliate links",
    description: "Track and share the products you recommend, with clicks attributed to you.",
  },
];

const trustPoints = [
  { icon: ShieldCheck, label: "Secure checkout" },
  { icon: Zap, label: "Instant delivery" },
  { icon: Wallet, label: "Fast payouts" },
];

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="bg-slate-50 px-6 pb-12 pt-40 md:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-black leading-[0.95] text-slate-900 sm:text-6xl">
            Turn your audience into income.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-500">
            Add a storefront to your page in a few clicks — no separate site,
            no separate checkout, no extra fees to figure out.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-4">
          {trustPoints.map((t) => (
            <div
              key={t.label}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600"
            >
              <t.icon size={16} className="text-[#0a5cfa]" />
              {t.label}
            </div>
          ))}
        </div>
      </section>

      {/* Category grid */}
      <section className="px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <div
              key={c.name}
              className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm shadow-slate-100 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d2e823]/40 text-[#254f1a]">
                <c.icon size={20} />
              </div>
              <p className="text-lg font-bold text-slate-900">{c.name}</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {c.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Split feature band */}
      <section className="bg-slate-950 px-6 py-24 text-white md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
              Built-in commerce
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              One dashboard for every sale.
            </h2>
            <p className="mt-6 max-w-lg text-slate-400 leading-7">
              Every order, tip, and booking lands in the same place your
              clicks do — so you&apos;re never toggling between five different
              tools to see how you&apos;re doing.
            </p>
            <Link
              href="/pricing"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Compare plans <ArrowRight size={14} />
            </Link>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <p className="text-sm font-semibold text-slate-300">Today&apos;s activity</p>
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                Live
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {[
                { label: "Print set — Digital download", amount: "$18.00" },
                { label: "1:1 coaching call", amount: "$85.00" },
                { label: "Tip from a fan", amount: "$5.00" },
                { label: "Merch — Tour hoodie", amount: "$42.00" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">{row.label}</span>
                  <span className="font-semibold text-white">{row.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#d2e823] px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <h2 className="text-4xl font-black leading-tight text-[#254f1a] sm:text-5xl">
            Start selling from your page today.
          </h2>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-full bg-[#254f1a] px-8 py-4 font-semibold text-white transition hover:bg-slate-800"
          >
            Open your storefront <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
