// components/dashboard/EmptyState.jsx
import { Link2, Plus } from "lucide-react";

export default function EmptyState({ onAdd }) {
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