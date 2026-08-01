// components/SocialLinkModal.jsx
"use client";
import { useState } from "react";
import { PLATFORMS } from "./SocialIcons";
import { createLinkAction, updateLinkAction } from "@/actions/links";
import { motion, AnimatePresence } from "framer-motion";

export default function SocialLinkModal({ isOpen, onClose, existingLink, onAdd, onUpdate }) {
    const [selectedPlatform, setSelectedPlatform] = useState(existingLink?.platform || "");
    const [url, setUrl] = useState(existingLink?.url || "");
    const [error, setError] = useState("");

    const [throwableError, setThrowableError] = useState(null);
    if (throwableError) throw throwableError;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!selectedPlatform) return setError("Please select a platform.");

        const formData = new FormData();
        formData.append("platform", selectedPlatform);
        formData.append("url", url);
        formData.append("type", "social");
        formData.append("title", selectedPlatform);

        let result;
        if (existingLink?._id) {
            result = await updateLinkAction(existingLink._id, formData);
            if (result?.success && onUpdate) onUpdate(result.link);
        } else {
            result = await createLinkAction(formData);
            if (result?.success && onAdd) onAdd(result.link);
        }

        if (result?.error) {
            // FIX: Only throw to error boundary if it's a critical error (like auth failure)
            if (result.critical) {
                setThrowableError(new Error(result.error));
            } else {
                setError(result.error); // Otherwise, show normal text warning
            }
        } else {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
                        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-xl font-bold mb-4">{existingLink ? "Edit Social Link" : "Add Social Link"}</h3>
                        {error && <div className="bg-red-50 text-red-600 text-sm p-2 rounded mb-4">{error}</div>}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Platform</label>
                            <div className="grid grid-cols-4 gap-2 mb-4">
                                {PLATFORMS.map(p => {
                                    const Icon = p.icon;
                                    return (
                                        <button
                                            type="button"
                                            key={p.id}
                                            onClick={() => setSelectedPlatform(p.id)}
                                            className={`p-3 rounded-xl border-2 flex justify-center items-center transition-colors ${selectedPlatform === p.id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'}`}
                                        >
                                            <Icon className="text-xl text-gray-700" />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                                <input
                                    type="url"
                                    required
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                            <div className="flex gap-2 pt-2">
                                <button type="button" onClick={onClose} className="flex-1 py-2 border border-gray-200 rounded-lg font-medium hover:bg-gray-50">Cancel</button>
                                <button type="submit" className="flex-1 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800">Save Link</button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}