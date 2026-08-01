// components/TextLinkModal.jsx
"use client";
import { useState } from "react";
import { createLinkAction, updateLinkAction } from "@/actions/links";
import { motion, AnimatePresence } from "framer-motion";

export default function TextLinkModal({ isOpen, onClose, existingLink, onAdd, onUpdate }) {
    const [title, setTitle] = useState(existingLink?.title || "");
    const [url, setUrl] = useState(existingLink?.url || "");
    const [error, setError] = useState("");

    const [throwableError, setThrowableError] = useState(null);
    if (throwableError) throw throwableError;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const formData = new FormData();
        formData.append("title", title);
        formData.append("url", url);
        formData.append("type", "text");

        let result;
        if (existingLink?._id) {
            result = await updateLinkAction(existingLink._id, formData);
            if (result?.success && onUpdate) onUpdate(result.link);
        } else {
            result = await createLinkAction(formData);
            if (result?.success && onAdd) onAdd(result.link);
        }

        if (result?.error) {
            if (result.critical) {
                setThrowableError(new Error(result.error));
            } else {
                setError(result.error);
            }
        } else {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
                    <motion.div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-xl font-bold mb-4">{existingLink ? "Edit Link" : "Add Link"}</h3>
                        {error && <div className="bg-red-50 text-red-600 text-sm p-2 rounded mb-4">{error}</div>}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="My Website" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                                <input type="text" required value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
                            </div>
                            <div className="flex gap-2 pt-2">
                                <button type="button" onClick={onClose} className="flex-1 py-2 border border-gray-200 rounded-lg font-medium hover:bg-gray-50">Cancel</button>
                                <button type="submit" className="flex-1 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800">Save</button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}