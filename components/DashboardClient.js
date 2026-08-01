// components/DashboardClient.jsx
"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react"; // FIX: Added signOut
import { deleteLinkAction as removeLink, reorderLinksAction } from "@/actions/links";
import { applyTemplateAction } from "@/actions/profile";
import { AvatarRenderer } from "./Avatars";
import SocialLinkModal from "./SocialLinkModal";
import TextLinkModal from "./TextLinkModal";
import ColorsModal from "./ColorsModal";
import ProfileModal from "./ProfileModal";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import {
    Plus,
    Link2,
    AtSign,
    Palette,
    Share2,
    Eye,
    Copy,
    Check,
    Pencil,
    X,
    Smartphone,
    LayoutGrid,
    Home,
    LogOut, // FIX: Added LogOut icon
} from "lucide-react";

// Importing the split components
import TabButton from "./dashboard/TabButton";
import EmptyState from "./dashboard/EmptyState";
import LinkCard from "./dashboard/LinkCard";
import AppearanceTab from "./dashboard/AppearanceTab";
import TemplatesTab from "./dashboard/TemplatesTab";
import CardPreview from "./dashboard/CardPreview";

const BRAND_GREEN = "#43E660";

export default function DashboardClient({ profile, initialLinks }) {
    const router = useRouter();
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

    const bgStyle = p.bgImage
        ? { backgroundImage: `url(${p.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
        : p.isGradient
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
                if (result.critical) setThrowableError(new Error(result.error));
            }
        });
    };

    const handleApplyTemplate = (template) => {
        const oldProfile = p;
        const newProfile = {
            ...p,
            bgColor1: template.bgColor || "#0f172a",
            bgImage: template.bgImage || null,
            boxColor: template.boxColor,
            textColor: template.textColor,
            iconColor: template.iconColor,
            isGradient: false
        };
        setP(newProfile);

        startTransition(async () => {
            const result = await applyTemplateAction({
                bgColor1: template.bgColor || "#0f172a",
                bgImage: template.bgImage || null,
                boxColor: template.boxColor,
                textColor: template.textColor,
                iconColor: template.iconColor,
                isGradient: false,
            });

            if (result?.error) {
                setP(oldProfile);
                if (result.critical) setThrowableError(new Error(result.error));
            } else if (result?.redirect) {
                router.push(result.redirect);
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
        } catch { }
    };

    return (
        <div className="min-h-screen w-full bg-[#F7F7F5] overflow-x-hidden">
            {/* Modals */}
            <TextLinkModal key={`text-${editingLink?._id || "new"}`} isOpen={activeModal === "text"} onClose={() => setActiveModal(null)} existingLink={editingLink} onAdd={handleAddLink} onUpdate={handleUpdateLink} />
            <SocialLinkModal key={`social-${editingLink?._id || "new"}`} isOpen={activeModal === "social"} onClose={() => setActiveModal(null)} existingLink={editingLink} onAdd={handleAddLink} onUpdate={handleUpdateLink} />
            <ColorsModal isOpen={activeModal === "colors"} onClose={() => setActiveModal(null)} p={p} setP={setP} />
            <ProfileModal isOpen={activeModal === "profile"} onClose={() => setActiveModal(null)} p={p} setP={setP} />

            {/* Top bar */}
            <header className="sticky top-0 z-30 border-b border-black/6 bg-white/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <Link href="/" aria-label="Back to Home" className="flex items-center justify-center w-9 h-9 rounded-full text-gray-500 hover:text-black hover:bg-black/5 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10">
                            <Home size={18} />
                        </Link>
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                            {p.avatar ? (
                                <div className="w-full h-full p-1.5" style={{ color: p.iconColor }}><AvatarRenderer avatarId={p.avatar} /></div>
                            ) : (
                                <span className="text-sm font-bold text-gray-500">{p.username?.[0]?.toUpperCase()}</span>
                            )}
                        </div>
                        <button onClick={handleCopyLink} className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10">
                            <span className="truncate max-w-37.5 sm:max-w-xs">site.link/{p.username}</span>
                            {copied ? <Check size={14} className="text-[#0F9D3E] shrink-0" /> : <Copy size={14} className="text-gray-400 group-hover:text-gray-600 shrink-0" />}
                        </button>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <Link href={`/${p.username}`} target="_blank" className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-black/5 transition-colors">
                            <Eye size={16} /> Preview
                        </Link>
                        <button onClick={() => setMobilePreviewOpen(true)} aria-label="Open preview" className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-black/5 transition-colors text-gray-700">
                            <Smartphone size={18} />
                        </button>
                        <button onClick={handleCopyLink} className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-black transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black" style={{ backgroundColor: BRAND_GREEN }}>
                            <Share2 size={16} /> Share
                        </button>
                        {/* FIX: Added Log Out Button */}
                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                            <LogOut size={16} /> Log out
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
                        <TabButton active={tab === "appearance"} onClick={() => setTab("appearance")} icon={<Palette size={16} />} label="Appearance" />
                        <TabButton active={tab === "templates"} onClick={() => setTab("templates")} icon={<LayoutGrid size={16} />} label="Templates" />
                    </div>

                    {tab === "links" ? (
                        <>
                            <div className="flex items-center justify-between gap-4 mb-6">
                                <button onClick={() => openModal("profile")} className="group flex items-center gap-3 text-left rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 min-w-0">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center ring-2 ring-transparent group-hover:ring-gray-200 transition-all shrink-0">
                                        {p.avatar ? (
                                            <div className="w-full h-full p-2" style={{ color: p.iconColor }}><AvatarRenderer avatarId={p.avatar} /></div>
                                        ) : (
                                            <span className="text-lg font-bold text-gray-500">{p.username?.[0]?.toUpperCase()}</span>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-gray-900 leading-tight truncate">{p.name || p.username}</p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1">Edit profile <Pencil size={11} /></p>
                                    </div>
                                </button>

                                <div className="relative shrink-0" ref={addMenuRef}>
                                    <button onClick={() => setAddMenuOpen((v) => !v)} className="inline-flex items-center gap-2 rounded-full bg-black text-white px-5 py-2.5 text-sm font-semibold hover:bg-gray-800 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black">
                                        <Plus size={16} /> Add
                                    </button>
                                    {addMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-gray-100 bg-white shadow-xl p-1.5 z-20">
                                            <button onClick={() => openModal("text")} className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                                <Link2 size={16} className="text-gray-400" /> Link
                                            </button>
                                            <button onClick={() => openModal("social")} className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                                <AtSign size={16} className="text-gray-400" /> Social icon
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={`transition-opacity ${isPending ? "opacity-60" : "opacity-100"}`}>
                                {links.length === 0 ? (
                                    <EmptyState onAdd={() => openModal("text")} />
                                ) : (
                                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                        <SortableContext items={links.map((l) => l._id)} strategy={verticalListSortingStrategy}>
                                            <div className="space-y-3">
                                                {links.map((link) => (
                                                    <LinkCard key={link._id} link={link} onDelete={handleDeleteLink} onEdit={() => openModal(link.type === "social" ? "social" : "text", link)} />
                                                ))}
                                            </div>
                                        </SortableContext>
                                    </DndContext>
                                )}
                            </div>
                        </>
                    ) : tab === "appearance" ? (
                        <AppearanceTab p={p} onEditProfile={() => openModal("profile")} onEditColors={() => openModal("colors")} />
                    ) : (
                        <TemplatesTab onApplyTemplate={handleApplyTemplate} />
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
                <div className="fixed inset-0 z-50 lg:hidden bg-black/60 flex items-center justify-center p-6 overflow-y-auto" onClick={() => setMobilePreviewOpen(false)}>
                    <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-85 mx-auto">
                        <button onClick={() => setMobilePreviewOpen(false)} aria-label="Close preview" className="absolute -top-11 right-0 text-white/80 hover:text-white transition-colors">
                            <X size={22} />
                        </button>
                        <CardPreview p={p} links={links} bgStyle={bgStyle} />
                    </div>
                </div>
            )}
        </div>
    );
}