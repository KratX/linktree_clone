import { Palette, BarChart3, ShoppingBag, LayoutTemplate, QrCode, CalendarClock } from "lucide-react";

const features = [
    { icon: Palette, title: "Customizable links", description: "Make your profile feel like you with branded colors, custom buttons, and a clean layout." },
    { icon: BarChart3, title: "Built-in analytics", description: "See which links drive the most clicks so you can focus on what grows your audience." },
    { icon: ShoppingBag, title: "Commerce ready", description: "Sell products, collect tips, and connect your audience to your storefront in seconds." },
    { icon: LayoutTemplate, title: "Templates for every creator", description: "Start fast with ready-made layouts for creators, businesses, and artists." },
    { icon: QrCode, title: "Instant QR codes", description: "Turn your profile into a scannable code for merch tags, posters, and packaging." },
    { icon: CalendarClock, title: "Scheduled links", description: "Queue up drops, launches, and events so the right link appears at the right time." },
];

export default function FeatureGrid() {
    return (
        <section className="bg-white px-6 py-24 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Everything in one place</p>
                    <h2 className="mt-4 text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
                        Everything you need to grow, in one link.
                    </h2>
                </div>
                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((f) => (
                        <div key={f.title} className="rounded-3xl border border-slate-100 bg-slate-50/60 p-7 transition hover:border-slate-200 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60">
                            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0a5cfa]/10 text-[#0a5cfa]">
                                <f.icon size={20} />
                            </div>
                            <p className="text-lg font-bold text-slate-900">{f.title}</p>
                            <p className="mt-2 text-sm leading-6 text-slate-500">{f.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}