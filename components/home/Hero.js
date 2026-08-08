import ScrollingColumn from "@/components/ScrollingColumn";
import SignupForm from "./SignupForm";

export default function Hero() {
    return (
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
                        Instagram, TikTok, Twitter, YouTube and other social media profiles.
                    </p>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row w-full max-w-xl">
                        <SignupForm />
                    </div>

                    <p className="mt-4 text-sm font-medium text-[#254f1a]/70">
                        No credit card required · Free forever plan
                    </p>
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
    );
}