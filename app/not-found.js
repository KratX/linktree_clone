"use client"; // FIX: Added to allow onClick handlers

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="text-center max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <h1 className="text-6xl font-bold tracking-tight text-black mb-4">404</h1>
                <h2 className="text-2xl font-bold text-gray-900">Page Not Found</h2>
                <p className="mt-2 text-gray-500">
                    Sorry, we couldn&apos;t find the page or profile you&apos;re looking for.
                </p>
                <div className="mt-8">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="inline-block w-full bg-black text-white font-semibold py-3 px-6 rounded-xl hover:bg-gray-800 transition-colors"
                    >
                        Go back to HomePage
                    </button>
                </div>
            </div>
        </div>
    );
}