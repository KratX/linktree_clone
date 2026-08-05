export default function FeatureShowcase() {
    return (
        <section className="min-h-screen bg-[#0a5cfa] flex items-center justify-center overflow-hidden">
            {/* FIX: Increased max-width to 1400px to give both elements more room */}
            <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16 py-24 lg:py-32 w-full">
                {/* FIX: Increased gap between video and text */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Video Container */}
                    <div className="order-2 lg:order-1 relative">
                        {/* Subtle glow behind the video */}
                        <div className="absolute -inset-4 bg-white/10 blur-2xl rounded-3xl" aria-hidden="true"></div>

                        <video
                            autoPlay
                            muted
                            playsInline
                            loop
                            preload="auto"
                            /* FIX: Added slight scale to make video feel even larger and immersive */
                            className="relative w-full h-auto rounded-2xl shadow-2xl ring-1 ring-white/10 scale-[1.02]"
                        >
                            <source src="https://assets.production.linktr.ee/static/curate/customise_your_linktree.webm" type="video/webm" />
                            <p>Your browser does not support the video tag.</p>
                        </video>
                    </div>

                    {/* Text Content */}
                    {/* FIX: Increased max-width of text container */}
                    <div className="max-w-2xl order-1 lg:order-2">
                        {/* FIX: Bumped heading up to 7xl on large screens */}
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-yellow-400 leading-[1.05] tracking-tight">
                            Create and customize your Linktree in minutes
                        </h2>
                        {/* FIX: Bumped paragraph up to 2xl on large screens */}
                        <p className="mt-8 lg:mt-10 text-xl lg:text-2xl text-blue-50 leading-relaxed font-medium">
                            Bring all your social platforms, latest content, and storefronts
                            together in one place. Make it uniquely yours with custom colors,
                            templates, and layouts.
                        </p>

                        {/* FIX: Bumped button size up */}
                        <button className="mt-10 lg:mt-12 inline-flex items-center justify-center bg-yellow-400 text-[#0a5cfa] font-bold px-10 py-5 rounded-full hover:bg-yellow-300 transition-all text-xl shadow-xl shadow-blue-900/30 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300/50">
                            Get started for free
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}