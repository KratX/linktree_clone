"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Minus, ChevronDown } from "lucide-react";

const PLANS = [
  {
    name: "Free",
    tagline: "For getting your first link live.",
    monthly: 0,
    annual: 0,
    cta: "Get started",
    highlighted: false,
    features: ["Unlimited links", "1 template style", "Basic analytics", "Linktree badge included"],
  },
  {
    name: "Starter",
    tagline: "For creators who want it to look like them.",
    monthly: 5,
    annual: 4,
    cta: "Start Starter",
    highlighted: false,
    features: ["Everything in Free", "Custom themes", "Remove branding", "Priority support"],
  },
  {
    name: "Pro",
    tagline: "For creators actively growing an audience.",
    monthly: 9,
    annual: 7,
    cta: "Start Pro",
    highlighted: true,
    features: ["Everything in Starter", "Advanced analytics", "Gated content", "Scheduled links", "QR code branding"],
  },
  {
    name: "Premium",
    tagline: "For businesses running commerce at scale.",
    monthly: 24,
    annual: 19,
    cta: "Start Premium",
    highlighted: false,
    features: ["Everything in Pro", "Full shop and payments", "Team seats", "Dedicated support"],
  },
];

const COMPARE_ROWS = [
  { label: "Custom domain", free: false, starter: true, pro: true, premium: true },
  { label: "Remove Linktree badge", free: false, starter: true, pro: true, premium: true },
  { label: "Advanced analytics", free: false, starter: false, pro: true, premium: true },
  { label: "Shop and payments", free: false, starter: false, pro: false, premium: true },
  { label: "Team seats", free: false, starter: false, pro: false, premium: true },
];

const FAQS = [
  {
    q: "Can I switch plans later?",
    a: "Yes. You can upgrade, downgrade, or cancel at any time from your account settings — changes apply on your next billing cycle.",
  },
  {
    q: "Is there really a free plan?",
    a: "Yes, Free stays free forever, with unlimited links and basic analytics. No trial period, no credit card required.",
  },
  {
    q: "What happens if I cancel?",
    a: "Your page stays live on the Free plan. You'll simply lose access to the paid features until you resubscribe.",
  },
  {
    q: "Do you offer discounts for nonprofits or students?",
    a: "Yes — reach out through support once you're signed up and we'll get you set up with the right pricing.",
  },
];

function Cell({ value }) {
  return value ? (
    <Check size={16} className="mx-auto text-[#0a5cfa]" />
  ) : (
    <Minus size={16} className="mx-auto text-slate-300" />
  );
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="bg-slate-50 px-6 pb-12 pt-40 md:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Pricing
          </p>
          <h1 className="text-5xl font-black leading-[0.95] text-slate-900 sm:text-6xl">
            Simple pricing, no surprises.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-500">
            Start free. Upgrade only when your page needs more.
          </p>

          <div className="mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white p-1.5">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                !annual ? "bg-black text-white" : "text-slate-500"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                annual ? "bg-black text-white" : "text-slate-500"
              }`}
            >
              Annual
              <span className="rounded-full bg-[#d2e823] px-2 py-0.5 text-[10px] font-black text-[#254f1a]">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="px-6 py-16 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-3xl border p-7 ${
                plan.highlighted
                  ? "border-black bg-slate-950 text-white shadow-xl"
                  : "border-slate-100 bg-white"
              }`}
            >
              {plan.highlighted && (
                <span className="mb-4 inline-flex w-fit rounded-full bg-[#d2e823] px-3 py-1 text-xs font-black text-[#254f1a]">
                  MOST POPULAR
                </span>
              )}
              <p className="text-lg font-bold">{plan.name}</p>
              <p className={`mt-1 text-sm ${plan.highlighted ? "text-slate-400" : "text-slate-500"}`}>
                {plan.tagline}
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-black">
                  ${annual ? plan.annual : plan.monthly}
                </span>
                <span className={`text-sm ${plan.highlighted ? "text-slate-400" : "text-slate-500"}`}>
                  /month
                </span>
              </div>
              {plan.monthly > 0 && (
                <p className={`mt-1 text-xs ${plan.highlighted ? "text-slate-500" : "text-slate-400"}`}>
                  {annual ? "billed annually" : "billed monthly"}
                </p>
              )}

              <Link
                href={`/signup?plan=${plan.name.toLowerCase()}`}
                className={`mt-6 rounded-full px-5 py-3 text-center text-sm font-semibold transition ${
                  plan.highlighted
                    ? "bg-[#d2e823] text-[#254f1a] hover:brightness-95"
                    : "bg-black text-white hover:bg-slate-800"
                }`}
              >
                {plan.cta}
              </Link>

              <ul className="mt-7 space-y-3">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-start gap-2 text-sm ${
                      plan.highlighted ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    <Check size={15} className="mt-0.5 shrink-0 text-[#0a5cfa]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Compare table */}
      <section className="bg-slate-50 px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-black text-slate-900 sm:text-4xl">
            Compare plans in detail
          </h2>

          <div className="mt-10 overflow-x-auto rounded-3xl border border-slate-100 bg-white">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left">
                  <th className="px-6 py-4 font-semibold text-slate-500">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-500">Free</th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-500">Starter</th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-500">Pro</th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-500">Premium</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row) => (
                  <tr key={row.label} className="border-b border-slate-50 last:border-0">
                    <td className="px-6 py-4 font-medium text-slate-700">{row.label}</td>
                    <td className="px-6 py-4 text-center"><Cell value={row.free} /></td>
                    <td className="px-6 py-4 text-center"><Cell value={row.starter} /></td>
                    <td className="px-6 py-4 text-center"><Cell value={row.pro} /></td>
                    <td className="px-6 py-4 text-center"><Cell value={row.premium} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-black text-slate-900 sm:text-4xl">
            Questions, answered.
          </h2>

          <div className="mt-10 divide-y divide-slate-100 rounded-3xl border border-slate-100">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={faq.q}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-slate-900">{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <p className="px-6 pb-5 text-sm leading-6 text-slate-500">{faq.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0a5cfa] px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <h2 className="text-4xl font-black leading-tight text-yellow-400 sm:text-5xl">
            Start free. Upgrade when you're ready.
          </h2>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-8 py-4 font-bold text-[#0a5cfa] transition hover:bg-yellow-300"
          >
            Create your page
          </Link>
        </div>
      </section>
    </main>
  );
}
