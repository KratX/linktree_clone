"use client";

import { motion } from "framer-motion";

function PlaceholderCard({ variant }) {
  return (
    <div className="group relative h-72 w-44 overflow-hidden rounded-4xl border border-white/40 bg-white/70 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]">
      {variant === 0 && (
        <>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-200 animate-pulse" />

            <div className="flex-1 space-y-2">
              <div className="h-3 w-20 rounded-full bg-slate-200 animate-pulse" />
              <div className="h-2 w-14 rounded-full bg-slate-100 animate-pulse" />
            </div>
          </div>

          <div className="mt-5 h-32 rounded-2xl bg-linear-to-br from-slate-300 via-slate-100 to-slate-200 animate-pulse" />

          <div className="mt-5 space-y-3">
            <div className="h-3 rounded-full bg-slate-200 animate-pulse" />
            <div className="h-3 w-4/5 rounded-full bg-slate-200 animate-pulse" />
            <div className="h-3 w-2/3 rounded-full bg-slate-200 animate-pulse" />
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <div className="h-10 flex-1 rounded-full bg-slate-900" />
            <div className="h-10 w-10 rounded-full bg-slate-300" />
          </div>
        </>
      )}

      {variant === 1 && (
        <>
          <div className="h-12 rounded-2xl bg-slate-200 animate-pulse" />

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="aspect-square rounded-2xl bg-slate-200 animate-pulse" />
            <div className="aspect-square rounded-2xl bg-slate-100 animate-pulse" />
            <div className="aspect-square rounded-2xl bg-slate-100 animate-pulse" />
            <div className="aspect-square rounded-2xl bg-slate-200 animate-pulse" />
          </div>

          <div className="mt-5 space-y-3">
            <div className="h-3 rounded-full bg-slate-200 animate-pulse" />
            <div className="h-3 w-5/6 rounded-full bg-slate-200 animate-pulse" />
            <div className="h-3 w-2/3 rounded-full bg-slate-200 animate-pulse" />
          </div>

          <div className="mt-6 flex gap-2">
            <div className="h-10 flex-1 rounded-full bg-slate-900" />
            <div className="h-10 w-10 rounded-full bg-slate-300" />
          </div>
        </>
      )}

      {variant === 2 && (
        <>
          <div className="h-28 rounded-3xl bg-linear-to-br from-violet-200 via-white to-cyan-200 animate-pulse" />

          <div className="mt-5 flex gap-2">
            <div className="h-8 flex-1 rounded-xl bg-slate-200 animate-pulse" />
            <div className="h-8 w-8 rounded-full bg-slate-300 animate-pulse" />
          </div>

          <div className="mt-5 space-y-3">
            <div className="h-3 rounded-full bg-slate-200 animate-pulse" />
            <div className="h-3 w-3/4 rounded-full bg-slate-200 animate-pulse" />
            <div className="h-3 w-1/2 rounded-full bg-slate-200 animate-pulse" />
            <div className="h-3 w-5/6 rounded-full bg-slate-200 animate-pulse" />
          </div>

          <div className="absolute bottom-4 left-4 right-4 h-10 rounded-full bg-slate-900" />
        </>
      )}
    </div>
  );
}

const cards = Array.from({ length: 8 });

export default function ScrollingColumn({
  reverse = false,
  duration = 24,
  offset = false,
}) {
  return (
    <div
      className={`relative h-180 overflow-hidden ${offset ? "mt-24" : ""}`}
    >
      <motion.div
        className="flex flex-col gap-5"
        animate={{
          y: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {[...cards, ...cards].map((_, index) => (
          <PlaceholderCard key={index} variant={index % 3} />
        ))}
      </motion.div>
    </div>
  );
}
