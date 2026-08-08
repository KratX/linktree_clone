import Link from "next/link";
import {
  Link2,
  ShoppingBag,
  CreditCard,
  BarChart3,
  Lock,
  QrCode,
  ArrowRight,
} from "lucide-react";

const products = [
  {
    icon: Link2,
    name: "Link in bio",
    description:
      "One page that holds every link you share — socials, sites, shops, and drops — always up to date.",
    points: ["Unlimited links", "Custom themes", "Instant updates"],
  },
  {
    icon: ShoppingBag,
    name: "Shop",
    description:
      "Turn your profile into a storefront. List products, take orders, and keep the checkout on-brand.",
    points: [
      "No separate site needed",
      "Inventory sync",
      "Mobile-first checkout",
    ],
  },
  {
    icon: CreditCard,
    name: "Payments",
    description:
      "Collect tips, sell one-off digital products, or take deposits without leaving your page.",
    points: ["Fast payouts", "Multiple currencies", "Transparent fees"],
  },
  {
    icon: BarChart3,
    name: "Analytics",
    description:
      "Understand what your audience actually clicks, so you know what to feature next.",
    points: ["Click-through rates", "Traffic sources", "Weekly summaries"],
  },
  {
    icon: Lock,
    name: "Gated content",
    description:
      "Put select links behind an email, follow, or purchase — and grow your list while you share.",
    points: ["Email capture", "Follow-to-unlock", "Pay-to-unlock"],
  },
  {
    icon: QrCode,
    name: "QR codes",
    description:
      "Generate a branded QR code for your page in one click — perfect for print, packaging, and events.",
    points: ["Custom colors", "Downloadable art files", "Scan tracking"],
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="bg-slate-50 px-6 pb-16 pt-40 md:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-black leading-[0.95] text-slate-900 sm:text-6xl">
            Every tool you need, built into one link.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-500">
            Linktree isn&apos;t just a page of buttons. It&apos;s a small
            toolkit for running your audience, your storefront, and your income
            — all from one place.
          </p>
        </div>
      </section>

      {/* Product grid */}
      <section className="px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div
              key={p.name}
              className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm shadow-slate-100 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0a5cfa]/10 text-[#0a5cfa]">
                <p.icon size={20} />
              </div>
              <p className="text-lg font-bold text-slate-900">{p.name}</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {p.description}
              </p>
              <ul className="mt-5 space-y-2">
                {p.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-xs font-semibold text-slate-500"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d2e823]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-950 px-6 py-24 text-white md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
              How it works
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              Live in minutes, not weeks.
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Claim your link",
                copy: "Pick your handle and choose a starting template.",
              },
              {
                step: "02",
                title: "Add what matters",
                copy: "Drop in your links, shop, and socials — reorder anytime.",
              },
              {
                step: "03",
                title: "Share everywhere",
                copy: "Put one link in every bio and watch the clicks roll in.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-3xl border border-white/10 bg-white/5 p-7"
              >
                <p className="text-sm font-black text-[#d2e823]">{s.step}</p>
                <p className="mt-3 text-lg font-bold">{s.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {s.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#d2e823] px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <h2 className="text-4xl font-black leading-tight text-[#254f1a] sm:text-5xl">
            Ready to put it all in one place?
          </h2>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-full bg-[#254f1a] px-8 py-4 font-semibold text-white transition hover:bg-slate-800"
          >
            See plans and pricing <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
