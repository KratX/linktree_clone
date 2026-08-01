// components/dashboard/AppearanceTab.jsx
import { User, Palette, ChevronRight } from "lucide-react";

export default function AppearanceTab({ p, onEditProfile, onEditColors }) {
    const previewStyle = p.bgImage
        ? { backgroundImage: `url(${p.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
        : p.isGradient
            ? { backgroundImage: `linear-gradient(${p.bgDirection}, ${p.bgColor1}, ${p.bgColor2})` }
            : { backgroundColor: p.bgColor1 };

    return (
        <div className="space-y-4">
            <SettingRow icon={<User size={18} />} title="Profile" description="Name, bio, and avatar" onClick={onEditProfile} />
            <SettingRow
                icon={<Palette size={18} />}
                title="Colours & theme"
                description="Background, buttons, and text colours"
                onClick={onEditColors}
                preview={<div className="w-16 h-8 rounded-lg border border-black/5 shrink-0" style={previewStyle} />}
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