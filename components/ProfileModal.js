// components/ProfileModal.jsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { updateProfileAction } from "@/actions/profile";
import { AVATARS, AvatarRenderer } from "./Avatars";
import toast from "react-hot-toast"; // FIX: Import toast

export default function ProfileModal({ isOpen, onClose, p, setP }) {
    const [error, setError] = useState("");
    const [throwableError, setThrowableError] = useState(null);
    if (throwableError) throw throwableError;

    if (!isOpen) return null;

    const handleSave = async (e) => {
        e.preventDefault();
        setError("");
        const formData = new FormData();
        Object.keys(p).forEach(key => formData.append(key, p[key]));

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
                    <h3 className="text-xl font-bold mb-4">Profile Settings</h3>
                    {error && <div className="bg-red-50 text-red-600 text-sm p-2 rounded mb-4">{error}</div>}
                    <form onSubmit={handleSave} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input name="name" value={p.name} maxLength={30} onChange={(e) => setP({ ...p, name: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
                            <div className="text-right text-xs text-gray-400 mt-1">{p.name.length}/30</div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                            <textarea name="bio" rows="3" value={p.bio} maxLength={160} onChange={(e) => setP({ ...p, bio: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none" />
                            <div className="text-right text-xs text-gray-400 mt-1">{p.bio.length}/160</div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Avatar</label>
                            <div className="flex gap-2 flex-wrap">
                                {AVATARS.map(a => (
                                    <button type="button" key={a.id} onClick={() => setP({ ...p, avatar: a.id })} className={`w-12 h-12 rounded-full border-2 flex items-center justify-center bg-gray-50 ${p.avatar === a.id ? 'border-indigo-600' : 'border-gray-200'}`}>
                                        <div className="w-6 h-6 text-gray-700"><AvatarRenderer avatarId={a.id} /></div>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                            <button type="button" onClick={onClose} className="flex-1 py-2 border border-gray-200 rounded-lg font-medium hover:bg-gray-50">Cancel</button>
                            <button type="submit" className="flex-1 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800">Save Profile</button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}