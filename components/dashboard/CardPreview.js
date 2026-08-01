// components/dashboard/CardPreview.jsx
import { AvatarRenderer } from "../Avatars";
import { PlatformIcon } from "../SocialIcons";

export default function CardPreview({ p, links, bgStyle }) {
    return (
        <div className="flex flex-col items-center w-full max-w-85 mx-auto">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                <span className="relative flex h-2 w-2">
                    <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{ backgroundColor: "#43E660" }}
                    />
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "#43E660" }} />
                </span>
                Live preview
            </div>

            <div className="relative w-full h-170 rounded-4xl shadow-2xl overflow-hidden flex flex-col border border-black/10" style={bgStyle}>
                <div className="h-full overflow-y-auto overflow-x-hidden p-8 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-gray-200/50 backdrop-blur flex items-center justify-center mb-4 overflow-hidden shrink-0">
                        {p.avatar ? (
                            <div className="w-full h-full p-4" style={{ color: p.iconColor }}>
                                <AvatarRenderer avatarId={p.avatar} />
                            </div>
                        ) : (
                            <span className="text-2xl font-bold text-gray-500">{p.username?.[0]?.toUpperCase()}</span>
                        )}
                    </div>

                    <h3 className="font-bold text-lg text-center wrap-break-word w-full" style={{ color: p.textColor }}>
                        {p.name}
                    </h3>
                    {p.bio && (
                        <p className="text-sm mb-5 text-center w-full wrap-break-word" style={{ color: p.textColor }}>
                            {p.bio}
                        </p>
                    )}

                    <div className="flex flex-wrap justify-center gap-3 mb-6 max-w-full">
                        {links
                            .filter((l) => l.type === "social")
                            .map((link) => (
                                <div key={link._id} style={{ color: p.iconColor }} className="shrink-0">
                                    <PlatformIcon platform={link.platform} className="text-2xl" />
                                </div>
                            ))}
                    </div>

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