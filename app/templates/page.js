// app/templates/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { applyTemplateAction } from "@/actions/profile";
import { motion } from "framer-motion";
import Link from "next/link";

const TEMPLATES = [
    { id: 'creator', name: 'Creator', category: 'Creator', bgColor: '#d2e823', boxColor: '#000000', textColor: '#ffffff', iconColor: '#000000' },
    { id: 'business', name: 'Business', category: 'Business', bgColor: '#ffffff', boxColor: '#0f172a', textColor: '#ffffff', iconColor: '#0f172a' },
    { id: 'gaming', name: 'Gaming', category: 'Gaming', bgColor: '#0f172a', boxColor: '#9333ea', textColor: '#ffffff', iconColor: '#9333ea' },
    { id: 'music', name: 'Music', category: 'Music', bgColor: '#1e293b', boxColor: '#22c55e', textColor: '#000000', iconColor: '#22c55e' },
    { id: 'fitness', name: 'Health & Fitness', category: 'Health and Fitness', bgColor: '#ecfccb', boxColor: '#3f6212', textColor: '#ffffff', iconColor: '#3f6212' },
    { id: 'marketing', name: 'Marketing', category: 'Marketing', bgColor: '#1e3a8a', boxColor: '#ffffff', textColor: '#1e3a8a', iconColor: '#ffffff' },
];

const CATEGORIES = ['All', 'Creator', 'Business', 'Gaming', 'Music', 'Health and Fitness', 'Marketing'];

export default function TemplatesPage() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState('All');

    const [loadingId, setLoadingId] = useState(null);
    const [appliedId, setAppliedId] = useState(null);

    const filteredTemplates = activeCategory === 'All' ? TEMPLATES : TEMPLATES.filter(t => t.category === activeCategory);

    const handleApply = async (template) => {
        // Prevent clicking if another template is already applying
        if (loadingId !== null) return;

        setLoadingId(template.id);

        const result = await applyTemplateAction({
            bgColor1: template.bgColor,
            boxColor: template.boxColor,
            textColor: template.textColor,
            iconColor: template.iconColor,
            isGradient: false
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
        <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-2">Pick your vibe</h1>
                <p className="text-gray-500 text-center mb-10">Choose a template to instantly change your profile colors.</p>

                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${activeCategory === cat ? 'bg-black text-white' : 'bg-white border border-gray-200 hover:bg-gray-50'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTemplates.map(tpl => (
                        <motion.div
                            key={tpl.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
                        >
                            <div className="h-64 p-6 flex flex-col items-center justify-center" style={{ backgroundColor: tpl.bgColor }}>
                                <div className="w-16 h-16 rounded-full mb-3" style={{ backgroundColor: tpl.iconColor, opacity: 0.2 }}></div>
                                <div className="h-2 w-24 rounded-full mb-2" style={{ backgroundColor: tpl.iconColor }}></div>
                                <div className="w-full h-8 rounded-lg my-1" style={{ backgroundColor: tpl.boxColor }}></div>
                                <div className="w-full h-8 rounded-lg my-1" style={{ backgroundColor: tpl.boxColor }}></div>
                                <div className="flex gap-2 mt-3">
                                    <div className="w-5 h-5 rounded-full" style={{ backgroundColor: tpl.iconColor }}></div>
                                    <div className="w-5 h-5 rounded-full" style={{ backgroundColor: tpl.iconColor }}></div>
                                </div>
                            </div>

                            <div className="p-4 flex items-center justify-between">
                                <h3 className="font-bold text-lg">{tpl.name}</h3>
                                <button
                                    onClick={() => handleApply(tpl)}
                                    // FIX: Only apply loading styles if THIS specific button is loading
                                    className={`bg-black text-white text-sm font-semibold py-2 px-4 rounded-full transition-colors ${loadingId === tpl.id ? "opacity-50 cursor-wait" : "hover:bg-gray-800"
                                        }`}
                                >
                                    {loadingId === tpl.id ? "Applying..." : appliedId === tpl.id ? "Applied!" : "Use Template"}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/dashboard" className="text-indigo-600 font-semibold hover:underline">&larr; Back to Dashboard</Link>
                </div>
            </div>
        </div>
    );
}