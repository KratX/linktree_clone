// components/DashboardClient.jsx
"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import Link from "next/link";
import { deleteLinkAction as removeLink, reorderLinksAction } from "@/actions/links";
import { AvatarRenderer } from "./Avatars";
import { PlatformIcon } from "./SocialIcons";
import SocialLinkModal from "./SocialLinkModal";
import TextLinkModal from "./TextLinkModal";
import ColorsModal from "./ColorsModal";
import ProfileModal from "./ProfileModal";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    Plus,
    Link2,
    AtSign,
    Palette,
    User,
    Share2,
    Eye,
    Copy,
    Check,
    GripVertical,
    Pencil,
    Trash2,
    X,
    Smartphone,
    ChevronRight,
} from "lucide-react";

// Linktree's signature brand green — used sparingly, as an accent only.
const BRAND_GREEN = "#43E660";

export default function DashboardClient({ profile, initialLinks }) {
    const [links, setLinks] = useState(initialLinks);
    const [p, setP] = useState(profile);
    const [activeModal, setActiveModal] = useState(null);
    const [editingLink, setEditingLink] = useState(null);
    const [isPending, startTransition] = useTransition();

    const [tab, setTab] = useState("links");
    const [addMenuOpen, setAddMenuOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);
    const addMenuRef = useRef(null);

    const [throwableError, setThrowableError] = useState(null);
    if (throwableError) throw throwableError;

    useEffect(() => {
        function handleOutsideClick(e) {
            if (addMenuRef.current && !addMenuRef.current.contains(e.target)) {
                setAddMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const bgStyle = p.isGradient
        ? { backgroundImage: `linear-gradient(${p.bgDirection}, ${p.bgColor1}, ${p.bgColor2})` }
        : { backgroundColor: p.bgColor1 };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = links.findIndex((l) => l._id === active.id);
            const newIndex = links.findIndex((l) => l._id === over.id);
            const newLinks = arrayMove(links, oldIndex, newIndex);
            setLinks(newLinks);
            startTransition(async () => {
                await reorderLinksAction(newLinks.map((l) => l._id));
            });
        }
    };

    const handleAddLink = (newLink) => setLinks((prev) => [...prev, newLink]);

    const handleUpdateLink = (updatedLink) =>
        setLinks((prev) => prev.map((l) => (l._id === updatedLink._id ? { ...l, ...updatedLink } : l)));

    const handleDeleteLink = (id) => {
        const previousLinks = links;
        setLinks((prev) => prev.filter((l) => l._id !== id));

        startTransition(async () => {
            const result = await removeLink(id);
            if (result?.error) {
                setLinks(previousLinks);
                setThrowableError(new Error(result.error));
            }
        });
    };

    const openModal = (type, link = null) => {
        setEditingLink(link);
        setActiveModal(type);
        setAddMenuOpen(false);
    };

    const handleCopyLink = async () => {
        try {
            const origin = typeof window !== "undefined" ? window.location.origin : "";
            await navigator.clipboard.writeText(`${origin}/${p.username}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            // clipboard permission denied
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#F7F7F5] overflow-x-hidden">
            {/* Modals */}
            <TextLinkModal
                key={`text-${editingLink?._id || "new"}`}
                isOpen={activeModal === "text"}
                onClose={() => setActiveModal(null)}
                existingLink={editingLink}
                onAdd={handleAddLink}
                onUpdate={handleUpdateLink}
            />
            <SocialLinkModal
                key={`social-${editingLink?._id || "new"}`}
                isOpen={activeModal === "social"}
                onClose={() => setActiveModal(null)}
                existingLink={editingLink}
                onAdd={handleAddLink}
                onUpdate={handleUpdateLink}
            />
            <ColorsModal isOpen={activeModal === "colors"} onClose={() => setActiveModal(null)} p={p} setP={setP} />
            <ProfileModal isOpen={activeModal === "profile"} onClose={() => setActiveModal(null)} p={p} setP={setP} />

            {/* Top bar */}
            <header className="sticky top-0 z-30 border-b border-black/6 bg-white/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                            {p.avatar ? (
                                <div className="w-full h-full p-1.5" style={{ color: p.iconColor }}>
                                    <AvatarRenderer avatarId={p.avatar} />
                                </div>
                            ) : (
                                <span className="text-sm font-bold text-gray-500">{p.username?.[0]?.toUpperCase()}</span>
                            )}
                        </div>
                        <button
                            onClick={handleCopyLink}
                            className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10"
                        >
                            <span className="truncate max-w-37.5 sm:max-w-xs">yoursite.link/{p.username}</span>
                            {copied ? (
                                <Check size={14} className="text-[#0F9D3E] shrink-0" />
                            ) : (
                                <Copy size={14} className="text-gray-400 group-hover:text-gray-600 shrink-0" />
                            )}
                        </button>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <Link
                            href={`/${p.username}`}
                            target="_blank"
                            className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-black/5 transition-colors"
                        >
                            <Eye size={16} />
                            Preview
                        </Link>
                        <button
                            onClick={() => setMobilePreviewOpen(true)}
                            aria-label="Open preview"
                            className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-black/5 transition-colors text-gray-700"
                        >
                            <Smartphone size={18} />
                        </button>
                        <button
                            onClick={handleCopyLink}
                            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-black transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
                            style={{ backgroundColor: BRAND_GREEN }}
                        >
                            <Share2 size={16} />
                            Share
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
                {/* LEFT: editor */}
                <div className="min-w-0">
                    {/* Tabs */}
                    <div className="flex items-center gap-1 mb-6 border-b border-gray-200">
                        <TabButton active={tab === "links"} onClick={() => setTab("links")} icon={<Link2 size={16} />} label="Links" />
                        <TabButton
                            active={tab === "appearance"}
                            onClick={() => setTab("appearance")}
                            icon={<Palette size={16} />}
                            label="Appearance"
                        />
                    </div>

                    {tab === "links" ? (
                        <>
                            {/* Profile chip + add button */}
                            <div className="flex items-center justify-between gap-4 mb-6">
                                <button
                                    onClick={() => openModal("profile")}
                                    className="group flex items-center gap-3 text-left rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 min-w-0"
                                >
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center ring-2 ring-transparent group-hover:ring-gray-200 transition-all shrink-0">
                                        {p.avatar ? (
                                            <div className="w-full h-full p-2" style={{ color: p.iconColor }}>
                                                <AvatarRenderer avatarId={p.avatar} />
                                            </div>
                                        ) : (
                                            <span className="text-lg font-bold text-gray-500">{p.username?.[0]?.toUpperCase()}</span>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-gray-900 leading-tight truncate">{p.name || p.username}</p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                            Edit profile <Pencil size={11} />
                                        </p>
                                    </div>
                                </button>

                                <div className="relative shrink-0" ref={addMenuRef}>
                                    <button
                                        onClick={() => setAddMenuOpen((v) => !v)}
                                        className="inline-flex items-center gap-2 rounded-full bg-black text-white px-5 py-2.5 text-sm font-semibold hover:bg-gray-800 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
                                    >
                                        <Plus size={16} />
                                        Add
                                    </button>
                                    {addMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-gray-100 bg-white shadow-xl p-1.5 z-20">
                                            <button
                                                onClick={() => openModal("text")}
                                                className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                            >
                                                <Link2 size={16} className="text-gray-400" />
                                                Link
                                            </button>
                                            <button
                                                onClick={() => openModal("social")}
                                                className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                            >
                                                <AtSign size={16} className="text-gray-400" />
                                                Social icon
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Links list */}
                            <div className={`transition-opacity ${isPending ? "opacity-60" : "opacity-100"}`}>
                                {links.length === 0 ? (
                                    <EmptyState onAdd={() => openModal("text")} />
                                ) : (
                                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                        <SortableContext items={links.map((l) => l._id)} strategy={verticalListSortingStrategy}>
                                            <div className="space-y-3">
                                                {links.map((link) => (
                                                    <LinkCard
                                                        key={link._id}
                                                        link={link}
                                                        onDelete={handleDeleteLink}
                                                        onEdit={() => openModal(link.type === "social" ? "social" : "text", link)}
                                                    />
                                                ))}
                                            </div>
                                        </SortableContext>
                                    </DndContext>
                                )}
                            </div>
                        </>
                    ) : (
                        <AppearanceTab p={p} onEditProfile={() => openModal("profile")} onEditColors={() => openModal("colors")} />
                    )}
                </div>

                {/* RIGHT: live preview (desktop) */}
                <div className="hidden lg:block">
                    <div className="sticky top-24">
                        <CardPreview p={p} links={links} bgStyle={bgStyle} />
                    </div>
                </div>
            </div>

            {/* Preview overlay (mobile) */}
            {mobilePreviewOpen && (
                <div
                    className="fixed inset-0 z-50 lg:hidden bg-black/60 flex items-center justify-center p-6 overflow-y-auto"
                    onClick={() => setMobilePreviewOpen(false)}
                >
                    <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-85 mx-auto">
                        <button
                            onClick={() => setMobilePreviewOpen(false)}
                            aria-label="Close preview"
                            className="absolute -top-11 right-0 text-white/80 hover:text-white transition-colors"
                        >
                            <X size={22} />
                        </button>
                        <CardPreview p={p} links={links} bgStyle={bgStyle} />
                    </div>
                </div>
            )}
        </div>
    );
}

function TabButton({ active, onClick, icon, label }) {
    return (
        <button
            onClick={onClick}
            className={`relative flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none ${active ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
                }`}
        >
            {icon}
            {label}
            {active && <span className="absolute left-0 right-0 -bottom-px h-0.5 rounded-full" style={{ backgroundColor: BRAND_GREEN }} />}
        </button>
    );
}

function EmptyState({ onAdd }) {
    return (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 py-16 flex flex-col items-center text-center px-6">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                <Link2 size={20} className="text-gray-400" />
            </div>
            <p className="font-semibold text-gray-900 mb-1">No links yet</p>
            <p className="text-sm text-gray-500 mb-5">Add your first link to start building your page.</p>
            <button
                onClick={onAdd}
                className="inline-flex items-center gap-2 rounded-full bg-black text-white px-5 py-2.5 text-sm font-semibold hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
            >
                <Plus size={16} />
                Add a link
            </button>
        </div>
    );
}

function LinkCard({ link, onDelete, onEdit }) {
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
                <div className="min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">{link.title || "Untitled"}</p>
                    <p className="text-xs text-gray-500 truncate">{link.url}</p>
                </div>
            </button>

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

function AppearanceTab({ p, onEditProfile, onEditColors }) {
    return (
        <div className="space-y-4">
            <SettingRow icon={<User size={18} />} title="Profile" description="Name, bio, and avatar" onClick={onEditProfile} />
            <SettingRow
                icon={<Palette size={18} />}
                title="Colours & theme"
                description="Background, buttons, and text colours"
                onClick={onEditColors}
                preview={
                    <div
                        className="w-16 h-8 rounded-lg border border-black/5 shrink-0"
                        style={
                            p.isGradient
                                ? { backgroundImage: `linear-gradient(${p.bgDirection}, ${p.bgColor1}, ${p.bgColor2})` }
                                : { backgroundColor: p.bgColor1 }
                        }
                    />
                }
            />
        </div>
    );
}

function SettingRow({ icon, title, description, onClick, preview }) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 hover:border-gray-300 hover:shadow-sm transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10"
        >
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 shrink-0">{icon}</div>
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900">{title}</p>
                <p className="text-xs text-gray-500">{description}</p>
            </div>
            {preview}
            <ChevronRight size={16} className="text-gray-300 shrink-0" />
        </button>
    );
}

// Replaced PhonePreview with CardPreview
function CardPreview({ p, links, bgStyle }) {
    return (
        <div className="flex flex-col items-center w-full max-w-85 mx-auto">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                <span className="relative flex h-2 w-2">
                    <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{ backgroundColor: BRAND_GREEN }}
                    />
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: BRAND_GREEN }} />
                </span>
                Live preview
            </div>

            {/* The Card Container - Made taller and ensured no horizontal overflow */}
            <div className="relative w-full h-170 rounded-4xl shadow-2xl overflow-hidden flex flex-col border border-black/10" style={bgStyle}>
                <div className="h-full overflow-y-auto overflow-x-hidden p-8 flex flex-col items-center">
                    {/* Avatar */}
                    <div className="w-20 h-20 rounded-full bg-gray-200/50 backdrop-blur flex items-center justify-center mb-4 overflow-hidden shrink-0">
                        {p.avatar ? (
                            <div className="w-full h-full p-4" style={{ color: p.iconColor }}>
                                <AvatarRenderer avatarId={p.avatar} />
                            </div>
                        ) : (
                            <span className="text-2xl font-bold text-gray-500">{p.username?.[0]?.toUpperCase()}</span>
                        )}
                    </div>

                    {/* Name & Bio */}
                    <h3 className="font-bold text-lg text-center wrap-break-word w-full" style={{ color: p.textColor }}>
                        {p.name}
                    </h3>
                    {p.bio && (
                        <p className="text-sm mb-5 text-center w-full wrap-break-word" style={{ color: p.textColor }}>
                            {p.bio}
                        </p>
                    )}

                    {/* Social Icons */}
                    <div className="flex flex-wrap justify-center gap-3 mb-6 max-w-full">
                        {links
                            .filter((l) => l.type === "social")
                            .map((link) => (
                                <div key={link._id} style={{ color: p.iconColor }} className="shrink-0">
                                    <PlatformIcon platform={link.platform} className="text-2xl" />
                                </div>
                            ))}
                    </div>

                    {/* Text Links */}
                    <div className="w-full space-y-3 grow">
                        {links
                            .filter((l) => l.type === "text" || !l.type)
                            .map((link) => (
                                <div
                                    key={link._id}
                                    className="w-full py-3 text-center font-medium text-sm rounded-xl shadow-sm wrap-break-word"
                                    style={{ backgroundColor: p.boxColor, color: p.textColor }}
                                >
                                    {link.title || "Untitled"}
                                </div>
                            ))}
                    </div>

                    {/* Footer Join Button */}
                    <div className="mt-8 w-full flex justify-center px-4">
                        <div
                            className="px-5 py-2 rounded-full text-xs font-semibold border max-w-full text-center wrap-break-word"
                            style={{
                                color: p.textColor,
                                borderColor: p.textColor + '40',
                                backgroundColor: p.textColor + '10'
                            }}
                        >
                            Join {p.username} on Linktree
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}