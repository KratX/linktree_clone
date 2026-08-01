// components/dashboard/TemplatesTab.jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
// Note: If you named your file templates.js, change this import to @/data/templates
import { TEMPLATES, CATEGORIES } from "@/data/template-set";

export default function TemplatesTab({ onApplyTemplate }) {
    const [templateCategory, setTemplateCategory] = useState("All");
    const filteredTemplates = templateCategory === "All" ? TEMPLATES : TEMPLATES.filter((t) => t.category === templateCategory);

    return (
        <div className="flex gap-6 mt-2">
            {/* Sidebar */}
            <div className="w-32 shrink-0 space-y-1">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setTemplateCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${templateCategory === cat ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-100"}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Template Grid */}
            <div className="flex-1 grid grid-cols-3 gap-4 max-h-150 overflow-y-auto pr-2">
                {filteredTemplates.map(tpl => {
                    const previewBg = tpl.bgImage
                        ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url(${tpl.bgImage}?q=80&w=400&auto=format&fit=crop)`, backgroundSize: 'cover', backgroundPosition: 'center' }
                        : { backgroundColor: tpl.bgColor };

                    return (
                        <motion.div
                            key={tpl.id}
                            onClick={() => onApplyTemplate(tpl)}
                            whileHover={{ scale: 1.05, y: -4 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="cursor-pointer"
                        >
                            <div
                                className="relative w-full aspect-9/16 rounded-2xl overflow-hidden border border-black/5 shadow-sm flex flex-col items-center justify-center p-3"
                                style={previewBg}
                            >
                                <div className="w-8 h-8 rounded-full mb-2 flex items-center justify-center" style={{ backgroundColor: tpl.iconColor + '33' }}>
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: tpl.iconColor }}></div>
                                </div>
                                <div className="w-3/4 h-1.5 rounded-full mb-1" style={{ backgroundColor: tpl.textColor, opacity: 0.9 }}></div>
                                <div className="w-1/2 h-1.5 rounded-full mb-3" style={{ backgroundColor: tpl.textColor, opacity: 0.6 }}></div>
                                <div className="w-full h-3.5 rounded-lg mb-1.5" style={{ backgroundColor: tpl.boxColor }}></div>
                                <div className="w-full h-3.5 rounded-lg" style={{ backgroundColor: tpl.boxColor }}></div>
                            </div>
                            <p className="text-xs text-center text-gray-600 mt-1.5 truncate font-medium">{tpl.name}</p>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}