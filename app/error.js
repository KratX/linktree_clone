"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error }) {
    useEffect(() => {
        // Log the error to an error reporting service (or console)
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="text-center max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Something went wrong!
                </h1>
                <p className="mt-2 text-gray-500">
                    An unexpected error occurred while trying to process your request. Please try again.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="w-full sm:w-auto border border-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors text-center"
                    >
                        Go back to HomePage
                    </Link>
                </div>
            </div>
        </div>
    );
}