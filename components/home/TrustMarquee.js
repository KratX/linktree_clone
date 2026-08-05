const trustWords = [
    "Musicians", "Coaches", "Photographers", "Nonprofits", "Podcasters",
    "Small businesses", "Artists", "Educators", "Freelancers", "Newsletters",
];

export default function TrustMarquee() {
    return (
        <section className="border-b border-slate-100 bg-white py-8">
            <div className="mx-auto max-w-7xl overflow-hidden px-6 md:px-10 lg:px-16">
                <div className="flex w-max animate-marquee gap-10">
                    {[...trustWords, ...trustWords].map((word, i) => (
                        <span key={i} className="whitespace-nowrap text-xl font-bold text-slate-300">
                            {word}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}