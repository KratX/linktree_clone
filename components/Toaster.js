// components/Toaster.jsx
"use client";

import { Toaster as HotToaster } from "react-hot-toast";

export default function Toaster() {
    return (
        <HotToaster
            position="bottom-center"
            toastOptions={{
                duration: 2000,
                style: {
                    background: '#000000',
                    color: '#FFFFFF',
                    borderRadius: '9999px',
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: '600',
                },
            }}
        />
    );
}