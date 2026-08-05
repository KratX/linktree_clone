import Link from "next/link";
import { Check } from "lucide-react";

const stats = [
    { value: "70M+", label: "people using Linktree" },
    { value: "5B+", label: "clicks every year" },
    { value: "1 link", label: "for all your content" },
];

export default function Stats() {
    return (
        <section className="bg-slate-950 px-6 py-24 text-white md:px-10 lg:px-16 min-h-screen flex items-center">
            <div className="mx-auto max-w-7xl w-full">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Trusted worldwide</p>
                        <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
                            Creators, businesses, and artists use Linktree to grow every day.
                        </h2>
                    </div>
                    <Link href="/pricing" className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
                        See pricing
                    </Link>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {stats.map((stat) => (
                        <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                            <p className="text-4xl font-black">{stat.value}</p>
                            <p className="mt-3 text-sm leading-7 text-slate-400">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-8">
                    {["Free forever plan", "No code required", "Cancel anytime", "24/7 support on Pro"].map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                            <Check size={16} className="text-[#d2e823]" />
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}