import { Star } from "lucide-react";

const testimonials = [
    { name: "Maren J.", role: "Illustrator & print shop owner", initials: "MJ", accent: "#254f1a", quote: "I moved my whole shop, portfolio, and mailing list behind one link. My bio finally works as hard as my art does." },
    { name: "Kofi O.", role: "Independent musician", initials: "KO", accent: "#0a5cfa", quote: "Every release used to mean editing five different bios. Now it's one page, one update, and it's live everywhere." },
    { name: "Priya L.", role: "Yoga instructor & coach", initials: "PL", accent: "#d97706", quote: "The analytics told me nobody was clicking my booking link — I moved it to the top and bookings doubled that month." },
];

export default function Testimonials() {
    return (
        <section className="bg-white px-6 py-24 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Loved by creators</p>
                    <h2 className="mt-4 text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
                        Real workflows, one link away.
                    </h2>
                </div>
                <div className="mt-14 grid gap-6 lg:grid-cols-3">
                    {testimonials.map((t) => (
                        <div key={t.name} className="flex flex-col rounded-3xl border border-slate-100 bg-slate-50/60 p-7">
                            <div className="mb-4 flex gap-1 text-amber-400">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                                ))}
                            </div>
                            <p className="flex-1 text-[15px] leading-7 text-slate-700">&quot;{t.quote}&quot;</p>
                            <div className="mt-6 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: t.accent }}>
                                    {t.initials}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">{t.name}</p>
                                    <p className="text-xs text-slate-400">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="mt-6 text-xs text-slate-400">Illustrative creator profiles shown for demonstration purposes.</p>
            </div>
        </section>
    );
}