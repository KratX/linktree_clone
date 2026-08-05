// app/page.tsx
import Hero from "@/components/home/Hero";
import TrustMarquee from "@/components/home/TrustMarquee";
import FeatureShowcase from "@/components/home/FeatureShowcase";
import FeatureGrid from "@/components/home/FeatureGrid";
import UseCases from "@/components/home/UseCases";
import Testimonials from "@/components/home/Testimonials";
import Stats from "@/components/home/Stats";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 26s linear infinite; }
      `}</style>

      <Hero />
      <TrustMarquee />
      <FeatureShowcase />
      <FeatureGrid />
      <UseCases />
      <Testimonials />
      <Stats />
      <FinalCTA />
    </main>
  );
}
