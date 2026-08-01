// components/dashboard/LinkCard.jsx
"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { PlatformIcon } from "../SocialIcons";

export default function LinkCard({ link, onDelete, onEdit }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link._id });
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 100 : "auto",
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="group flex items-center gap-2 rounded-2xl border border-gray-200 bg-white p-3 hover:border-gray-300 hover:shadow-sm transition-all"
        >
            <button
                {...attributes}
                {...listeners}
                aria-label="Drag to reorder"
                className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 p-1 touch-none shrink-0"
            >
                <GripVertical size={18} />
            </button>

            <button onClick={onEdit} className="flex-1 flex items-center gap-3 text-left min-w-0 py-1">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                    {link.type === "social" ? (
                        <PlatformIcon platform={link.platform} className="text-lg text-gray-600" />
                    ) : (
                        <span className="text-xs font-bold text-gray-500">{link.title?.[0]?.toUpperCase() || "?"}</span>
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm text-gray-900 truncate">{link.title || "Untitled"}</p>
                    <p className="text-xs text-gray-500 truncate">{link.url}</p>
                </div>
            </button>

            {/* FIX: Click Analytics Badge added back */}
            <div className="flex items-center gap-2 shrink-0 mr-1">
                <div className="text-center bg-gray-100 rounded-lg px-2.5 py-1 hidden sm:block">
                    <p className="text-xs font-bold text-gray-900">{link.clicks || 0}</p>
                    <p className="text-[10px] uppercase text-gray-500 tracking-wider leading-none">clicks</p>
                </div>
            </div>

            <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 focus-within:opacity-100 transition-opacity shrink-0">
                <button
                    onClick={onEdit}
                    aria-label="Edit link"
                    className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    <Pencil size={15} />
                </button>
                <button
                    onClick={() => onDelete(link._id)}
                    aria-label="Delete link"
                    className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                    <Trash2 size={15} />
                </button>
            </div>
        </div>
    );
}