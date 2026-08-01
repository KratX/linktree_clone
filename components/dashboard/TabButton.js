// components/dashboard/TabButton.jsx
export default function TabButton({ active, onClick, icon, label }) {
    return (
        <button
            onClick={onClick}
            className={`relative flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none ${active ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
                }`}
        >
            {icon}
            {label}
            {active && <span className="absolute left-0 right-0 -bottom-px h-0.5 rounded-full bg-[#43E660]" />}
        </button>
    );
}