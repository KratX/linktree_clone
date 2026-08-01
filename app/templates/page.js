// app/templates/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { applyTemplateAction } from "@/actions/profile";
import { motion } from "framer-motion";
import Link from "next/link";
import { TEMPLATES, CATEGORIES, bgUrl } from "@/data/template-set"; // FIX: Updated import path

export default function TemplatesPage() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState("All");
    const [loadingId, setLoadingId] = useState(null);
    const [appliedId, setAppliedId] = useState(null);

    const filteredTemplates = activeCategory === "All" ? TEMPLATES : TEMPLATES.filter((t) => t.category === activeCategory);

    const handleApply = async (template) => {
        if (loadingId !== null) return;
        setLoadingId(template.id);

        const result = await applyTemplateAction({
            bgColor1: template.bgColor || "#0f172a",
            bgImage: template.bgImage || null,
            boxColor: template.boxColor,
            textColor: template.textColor,
            iconColor: template.iconColor,
            isGradient: false,
        });

        setLoadingId(null);

        if (result?.redirect) {
            router.push(result.redirect);
        } else if (result?.success) {
            setAppliedId(template.id);
            setTimeout(() => setAppliedId(null), 2000);
        } else if (result?.error) {
            console.error("Failed to apply template:", result.error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-[168px] pb-12 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-2">Pick your vibe</h1>
                <p className="text-gray-500 text-center mb-10">Choose a template to instantly change your profile colors.</p>

                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${activeCategory === cat ? "bg-black text-white" : "bg-white border border-gray-200 hover:bg-gray-50"}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTemplates.map((tpl) => {
                        const previewBg = tpl.bgImage
                            ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url(${bgUrl(tpl.bgImage)})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                            : { backgroundColor: tpl.bgColor };

                        const isLoading = loadingId === tpl.id;
                        const isApplied = appliedId === tpl.id;

                        return (
                            <motion.div
                                key={tpl.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={() => handleApply(tpl)}
                                whileHover={{ scale: 1.04, y: -10, zIndex: 10 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className={`flex flex-col items-center cursor-pointer ${loadingId !== null && !isLoading ? "opacity-50 pointer-events-none" : ""}`}
                            >
                                {/* Card Preview Mockup */}
                                <div className="relative w-full max-w-[320px] h-[580px] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-black/10 mb-5" style={previewBg}>
                                    {tpl.bgImage && (
                                        <span className="absolute top-3 left-3 z-20 text-[10px] font-semibold uppercase tracking-wide text-white/90 bg-white/15 backdrop-blur px-2 py-0.5 rounded-full">
                                            Photo
                                        </span>
                                    )}

                                    {/* Loading / Applied Overlay */}
                                    {(isLoading || isApplied) && (
                                        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
                                            <span className="px-5 py-2.5 bg-white text-black font-semibold rounded-full shadow-lg text-sm">
                                                {isLoading ? "Applying..." : "Applied!"}
                                            </span>
                                        </div>
                                    )}

                                    <div className="h-full overflow-hidden p-8 flex flex-col items-center">
                                        {/* Avatar */}
                                        <div className="w-20 h-20 rounded-full mb-4 flex items-center justify-center" style={{ backgroundColor: tpl.iconColor + '33' }}>
                                            <div className="w-10 h-10 rounded-full" style={{ backgroundColor: tpl.iconColor }}></div>
                                        </div>

                                        {/* Name & Bio */}
                                        <div className="h-3 w-3/4 rounded-full mb-2" style={{ backgroundColor: tpl.textColor, opacity: 0.9 }}></div>
                                        <div className="h-2 w-1/2 rounded-full mb-6" style={{ backgroundColor: tpl.textColor, opacity: 0.6 }}></div>

                                        {/* Social Icons */}
                                        <div className="flex gap-3 mb-6">
                                            <div className="w-7 h-7 rounded-full" style={{ backgroundColor: tpl.iconColor, opacity: 0.8 }}></div>
                                            <div className="w-7 h-7 rounded-full" style={{ backgroundColor: tpl.iconColor, opacity: 0.8 }}></div>
                                            <div className="w-7 h-7 rounded-full" style={{ backgroundColor: tpl.iconColor, opacity: 0.8 }}></div>
                                        </div>

                                        {/* Link Buttons */}
                                        <div className="w-full space-y-3 flex-grow">
                                            <div className="w-full h-11 rounded-xl" style={{ backgroundColor: tpl.boxColor }}></div>
                                            <div className="w-full h-11 rounded-xl" style={{ backgroundColor: tpl.boxColor }}></div>
                                            <div className="w-full h-11 rounded-xl" style={{ backgroundColor: tpl.boxColor }}></div>
                                        </div>

                                        {/* Footer Pill */}
                                        <div className="mt-5 h-7 w-36 rounded-full" style={{ backgroundColor: tpl.textColor + '20', border: `1px solid ${tpl.textColor}40` }}></div>
                                    </div>
                                </div>

                                {/* Name Tag below card */}
                                <div className="w-full max-w-[320px] flex items-center justify-center px-2">
                                    <h3 className="font-bold text-lg text-gray-900">{tpl.name}</h3>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <Link href="/dashboard" className="text-gray-900 font-semibold hover:underline underline-offset-4">&larr; Back to Dashboard</Link>
                </div>
            </div>
        </div>
    );
}