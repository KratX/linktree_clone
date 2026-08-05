// components/ColorsModal.jsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { updateProfileAction } from "@/actions/profile";
import toast from "react-hot-toast"; // FIX: Import toast

export default function ColorsModal({ isOpen, onClose, p, setP }) {
    const [error, setError] = useState("");
    const [throwableError, setThrowableError] = useState(null);
    if (throwableError) throw throwableError;

    if (!isOpen) return null;

    const handleSave = async (e) => {
        e.preventDefault();
        setError("");
        const formData = new FormData();
        Object.keys(p).forEach(key => {
            if (p[key] !== null && p[key] !== undefined) {
                formData.append(key, p[key]);
            }
        });

        const result = await updateProfileAction(formData);

        if (result?.error) {
            if (result.critical) {
                setThrowableError(new Error(result.error));
            } else {
                setError(result.error);
            }
        } else {
            // FIX: Show success toast before closing
            toast.success("Saved Successfully");
            onClose();
        }
    };

    return (
        <AnimatePresence>
            <motion.div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
                <motion.div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()}>
                    <h3 className="text-xl font-bold mb-4">Customize Colors</h3>
                    {error && <div className="bg-red-50 text-red-600 text-sm p-2 rounded mb-4">{error}</div>}
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">Use Gradient</span>
                            <button
                                type="button"
                                onClick={() => setP({ ...p, isGradient: !p.isGradient, bgImage: null })}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${p.isGradient ? 'bg-indigo-600' : 'bg-gray-300'}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${p.isGradient ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>

                        {p.isGradient ? (
                            <div className="grid grid-cols-2 gap-3">
                                <ColorInput label="Color 1" name="bgColor1" value={p.bgColor1} onChange={(v) => setP({ ...p, bgColor1: v, bgImage: null })} />
                                <ColorInput label="Color 2" name="bgColor2" value={p.bgColor2} onChange={(v) => setP({ ...p, bgColor2: v, bgImage: null })} />
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Direction</label>
                                    <select value={p.bgDirection} onChange={(e) => setP({ ...p, bgDirection: e.target.value, bgImage: null })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-sm">
                                        <option value="to bottom">Top to Bottom</option>
                                        <option value="to right">Left to Right</option>
                                        <option value="to bottom right">Diagonal</option>
                                    </select>
                                </div>
                            </div>
                        ) : (
                            <ColorInput label="Background Color" name="bgColor1" value={p.bgColor1} onChange={(v) => setP({ ...p, bgColor1: v, bgImage: null })} />
                        )}

                        <div className="grid grid-cols-2 gap-3">
                            <ColorInput label="Link Box" name="boxColor" value={p.boxColor} onChange={(v) => setP({ ...p, boxColor: v })} />
                            <ColorInput label="Link Text" name="textColor" value={p.textColor} onChange={(v) => setP({ ...p, textColor: v })} />
                            <ColorInput label="Social Icons" name="iconColor" value={p.iconColor} onChange={(v) => setP({ ...p, iconColor: v })} />
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button type="button" onClick={onClose} className="flex-1 py-2 border border-gray-200 rounded-lg font-medium hover:bg-gray-50">Cancel</button>
                            <button type="submit" className="flex-1 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800">Save Colors</button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

function ColorInput({ label, name, value, onChange }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-1">
                <input type="color" name={name} value={value} onChange={(e) => onChange(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border-0" />
                <span className="text-xs text-gray-500">{value}</span>
            </div>
        </div>
    );
}