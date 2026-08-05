import Link from "next/link";
import { Music2, GraduationCap, Store, HeartHandshake, Mic2, Paintbrush, ArrowRight } from "lucide-react";

const useCases = [
    { icon: Music2, label: "Musicians", copy: "Share new releases, tour dates, and merch in one drop." },
    { icon: GraduationCap, label: "Coaches & educators", copy: "Route students to courses, booking, and free resources." },
    { icon: Store, label: "Small businesses", copy: "Send customers straight to your menu, shop, or booking page." },
    { icon: HeartHandshake, label: "Nonprofits", copy: "Make it effortless for supporters to donate or volunteer." },
    { icon: Mic2, label: "Podcasters", copy: "Collect every listening platform under one shareable link." },
    { icon: Paintbrush, label: "Artists", copy: "Showcase a portfolio and sell prints without a full website." },
];

export default function UseCases() {
    return (
        <section className="bg-slate-50 px-6 py-24 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Built for how you create</p>
                    <h2 className="mt-4 text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
                        Whatever you make, there&apos;s a layout for it.
                    </h2>
                </div>
                <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {useCases.map((u) => (
                        <div key={u.label} className="group flex items-start gap-4 rounded-2xl bg-white border border-slate-100 p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#d2e823]/40 text-[#254f1a]">
                                <u.icon size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-slate-900">{u.label}</p>
                                <p className="mt-1 text-sm leading-6 text-slate-500">{u.copy}</p>
                                <Link href="/templates" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#0a5cfa] opacity-0 transition group-hover:opacity-100">
                                    See templates <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}