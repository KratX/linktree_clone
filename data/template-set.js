// data/templates.js
export const TEMPLATES = [
    // ==========================================
    // CREATOR (5 Solids, 11 Images)
    // ==========================================
    { id: "c-s2", name: "Mint Tech", category: "Creator", bgColor: "#E0F2F1", boxColor: "#00897B", textColor: "#004D40", iconColor: "#004D40" },
    { id: "c-s3", name: "Lavender Haze", category: "Creator", bgColor: "#EDE7F6", boxColor: "#5E35B1", textColor: "#311B92", iconColor: "#311B92" },
    { id: "c-s4", name: "Charcoal Pop", category: "Creator", bgColor: "#1C1C1C", boxColor: "#FF4081", textColor: "#FFFFFF", iconColor: "#FF4081" },
    { id: "c-s5", name: "Sunrise", category: "Creator", bgColor: "#FFCC80", boxColor: "#FFFFFF", textColor: "#5D4037", iconColor: "#5D4037" },

    { id: "c-i1", name: "The Desk", category: "Creator", bgImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4", boxColor: "rgba(0,0,0,0.6)", textColor: "#FFFFFF", iconColor: "#FFFFFF" },
    { id: "c-i2", name: "Creative Mess", category: "Creator", bgImage: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848", boxColor: "rgba(255,255,255,0.9)", textColor: "#1A1A1A", iconColor: "#1A1A1A" },
    { id: "c-i3", name: "Neon Studio", category: "Creator", bgImage: "https://images.unsplash.com/photo-1531058020387-3be344556be6", boxColor: "rgba(0,0,0,0.7)", textColor: "#00E5FF", iconColor: "#00E5FF" },
    { id: "c-i4", name: "Film Burn", category: "Creator", bgImage: "https://images.unsplash.com/photo-1500099837081-d4fca5b78e91", boxColor: "rgba(0,0,0,0.6)", textColor: "#FFD700", iconColor: "#FFD700" },
    { id: "c-i5", name: "Watercolor", category: "Creator", bgImage: "https://images.unsplash.com/photo-1493612276216-ee3925520721", boxColor: "rgba(255,255,255,0.9)", textColor: "#333333", iconColor: "#333333" },
    { id: "c-i6", name: "Geometric", category: "Creator", bgImage: "https://images.unsplash.com/photo-1545239351-ef35f43d514b", boxColor: "rgba(0,0,0,0.6)", textColor: "#FFFFFF", iconColor: "#FFFFFF" },
    { id: "c-i7", name: "Camera Gear", category: "Creator", bgImage: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd", boxColor: "rgba(0,0,0,0.7)", textColor: "#FFFFFF", iconColor: "#FFFFFF" },
    { id: "c-i8", name: "Paint Splash", category: "Creator", bgImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f", boxColor: "rgba(255,255,255,0.9)", textColor: "#1A1A1A", iconColor: "#1A1A1A" },
    { id: "c-i9", name: "Code Block", category: "Creator", bgImage: "https://images.unsplash.com/photo-1555099962-4199c345e5dd", boxColor: "rgba(0,0,0,0.7)", textColor: "#00E676", iconColor: "#00E676" },
    { id: "c-i10", name: "Vlogging", category: "Creator", bgImage: "https://images.unsplash.com/photo-1593642634443-44adaa06623a", boxColor: "rgba(0,0,0,0.6)", textColor: "#FFFFFF", iconColor: "#FFFFFF" },
    { id: "c-i11", name: "Podcast Mic", category: "Creator", bgImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618", boxColor: "rgba(0,0,0,0.7)", textColor: "#FF4081", iconColor: "#FF4081" },

    // ==========================================
    // BUSINESS (5 Solids, 10 Images)
    // ==========================================
    { id: "b-s1", name: "Navy Executive", category: "Business", bgColor: "#0A192F", boxColor: "#64FFDA", textColor: "#FFFFFF", iconColor: "#64FFDA" },
    { id: "b-s2", name: "Crisp Slate", category: "Business", bgColor: "#F8F9FA", boxColor: "#212529", textColor: "#212529", iconColor: "#212529" },
    { id: "b-s3", name: "Royal Blue", category: "Business", bgColor: "#EBF5FB", boxColor: "#2874A6", textColor: "#1B4F72", iconColor: "#1B4F72" },
    { id: "b-s4", name: "Steel Wave", category: "Business", bgColor: "#2C3E50", boxColor: "#E67E22", textColor: "#ECF0F1", iconColor: "#E67E22" },
    { id: "b-s5", name: "Minimal Sand", category: "Business", bgColor: "#F5F5DC", boxColor: "#556B2F", textColor: "#2D2D2D", iconColor: "#2D2D2D" },

    { id: "b-i1", name: "Skyline", category: "Business", bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab", boxColor: "rgba(255,255,255,0.9)", textColor: "#1B4F72", iconColor: "#1B4F72" },
    { id: "b-i2", name: "Modern Office", category: "Business", bgImage: "https://images.unsplash.com/photo-1497366216548-37526070297c", boxColor: "rgba(0,0,0,0.7)", textColor: "#FFFFFF", iconColor: "#FFFFFF" },
    { id: "b-i3", name: "Architecture", category: "Business", bgImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e", boxColor: "rgba(0,0,0,0.6)", textColor: "#FFFFFF", iconColor: "#FFFFFF" },
    { id: "b-i4", name: "The Handshake", category: "Business", bgImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216", boxColor: "rgba(0,0,0,0.6)", textColor: "#FFFFFF", iconColor: "#FFFFFF" },
    { id: "b-i5", name: "Glass Facade", category: "Business", bgImage: "https://images.unsplash.com/photo-1517502884422-41eaead166d4", boxColor: "rgba(255,255,255,0.9)", textColor: "#1A1A1A", iconColor: "#1A1A1A" },
    { id: "b-i6", name: "Corporate Stairs", category: "Business", bgImage: "https://images.unsplash.com/photo-1444723121867-7a241cacace9", boxColor: "rgba(0,0,0,0.7)", textColor: "#FFFFFF", iconColor: "#FFFFFF" },
    { id: "b-i7", name: "Data Charts", category: "Business", bgImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f", boxColor: "rgba(0,0,0,0.7)", textColor: "#00E5FF", iconColor: "#00E5FF" },
    { id: "b-i8", name: "City Walk", category: "Business", bgImage: "https://images.unsplash.com/photo-1486218119243-13883505764c", boxColor: "rgba(255,255,255,0.9)", textColor: "#1A1A1A", iconColor: "#1A1A1A" },
    { id: "b-i9", name: "Loft Workspace", category: "Business", bgImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0", boxColor: "rgba(0,0,0,0.6)", textColor: "#FFFFFF", iconColor: "#FFFFFF" },
    { id: "b-i10", name: "Laptop & Coffee", category: "Business", bgImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40", boxColor: "rgba(0,0,0,0.7)", textColor: "#FFFFFF", iconColor: "#FFFFFF" },

    // ==========================================
    // GAMING (4 Solids, 11 Images)
    // ==========================================
    { id: "g-s1", name: "Cyberpunk Pink", category: "Gaming", bgColor: "#0D0221", boxColor: "#FF00A0", textColor: "#FFFFFF", iconColor: "#FF00A0" },
    { id: "g-s2", name: "Matrix Green", category: "Gaming", bgColor: "#0B1D26", boxColor: "#003B00", textColor: "#00FF41", iconColor: "#00FF41" },
    { id: "g-s3", name: "Console Blue", category: "Gaming", bgColor: "#003791", boxColor: "#FFD700", textColor: "#FFFFFF", iconColor: "#FFD700" },
    { id: "g-s4", name: "Twitch Purple", category: "Gaming", bgColor: "#121212", boxColor: "#9147FF", textColor: "#FFFFFF", iconColor: "#9147FF" },

    { id: "g-i1", name: "RGB Setup", category: "Gaming", bgImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e", boxColor: "rgba(20,0,40,0.7)", textColor: "#00E5FF", iconColor: "#00E5FF" },
    { id: "g-i2", name: "Neon Alley", category: "Gaming", bgImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc", boxColor: "rgba(0,0,0,0.7)", textColor: "#FF00A0", iconColor: "#FF00A0" },
    { id: "g-i3", name: "Controller", category: "Gaming", bgImage: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8", boxColor: "rgba(0,0,0,0.6)", textColor: "#FFFFFF", iconColor: "#FFFFFF" },
    { id: "g-i4", name: "Arcade Glow", category: "Gaming", bgImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420", boxColor: "rgba(0,0,0,0.7)", textColor: "#00E5FF", iconColor: "#00E5FF" },
    { id: "g-i5", name: "Esports Arena", category: "Gaming", bgImage: "https://images.unsplash.com/photo-1556438064-2d7646166914", boxColor: "rgba(0,0,0,0.6)", textColor: "#FFD700", iconColor: "#FFD700" },
    { id: "g-i6", name: "Retro Cyber", category: "Gaming", bgImage: "https://images.unsplash.com/photo-1605379399642-870262d3d051", boxColor: "rgba(20,0,40,0.7)", textColor: "#FF00A0", iconColor: "#FF00A0" },
    { id: "g-i7", name: "Neon Mask", category: "Gaming", bgImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f", boxColor: "rgba(0,0,0,0.7)", textColor: "#00E5FF", iconColor: "#00E5FF" },
    { id: "g-i8", name: "Keyboard Macro", category: "Gaming", bgImage: "https://images.unsplash.com/photo-1593305841991-05c297ba4575", boxColor: "rgba(0,0,0,0.7)", textColor: "#FF00A0", iconColor: "#FF00A0" },
    { id: "g-i9", name: "Code Matrix", category: "Gaming", bgImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713", boxColor: "rgba(0,0,0,0.7)", textColor: "#00FF41", iconColor: "#00FF41" },
    { id: "g-i10", name: "VR Headset", category: "Gaming", bgImage: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac", boxColor: "rgba(0,0,0,0.6)", textColor: "#FFFFFF", iconColor: "#FFFFFF" },
    { id: "g-i11", name: "Console Setup", category: "Gaming", bgImage: "https://images.unsplash.com/photo-1602288646724-15c7d3f2f3e4", boxColor: "rgba(0,0,0,0.7)", textColor: "#FFD700", iconColor: "#FFD700" },

    // ==========================================
    // MUSIC (4 Solids, 11 Images)
    // ==========================================
    { id: "m-s1", name: "Spotify Dark", category: "Music", bgColor: "#121212", boxColor: "#1DB954", textColor: "#FFFFFF", iconColor: "#1DB954" },
    { id: "m-s2", name: "Sunset Vibe", category: "Music", bgColor: "#FF5722", boxColor: "#FFFFFF", textColor: "#FFFFFF", iconColor: "#FFFFFF" },
    { id: "m-s3", name: "Deep Synth", category: "Music", bgColor: "#4A148C", boxColor: "#FFD740", textColor: "#FFFFFF", iconColor: "#FFD740" },
    { id: "m-s4", name: "Lo-Fi Beige", category: "Music", bgColor: "#E6D5B8", boxColor: "#4A3B2A", textColor: "#4A3B2A", iconColor: "#4A3B2A" },

    { id: "m-i1", name: "Concert Lights", category: "Music", bgImage: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a", boxColor: "rgba(40,0,20,0.6)", textColor: "#FF4081", iconColor: "#FF4081" },
    { id: "m-i2", name: "Vinyl Record", category: "Music", bgImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745", boxColor: "rgba(0,0,0,0.7)", textColor: "#FFFFFF", iconColor: "#FFFFFF" },
    { id: "m-i3", name: "Studio Mix", category: "Music", bgImage: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625", boxColor: "rgba(0,0,0,0.7)", textColor: "#00E5FF", iconColor: "#00E5FF" },
    { id: "m-i4", name: "Acoustic", category: "Music", bgImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f", boxColor: "rgba(255,255,255,0.9)", textColor: "#3E2723", iconColor: "#3E2723" },
    { id: "m-i5", name: "Jazz Club", category: "Music", bgImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4", boxColor: "rgba(0,0,0,0.6)", textColor: "#FFD700", iconColor: "#FFD700" },
    { id: "m-i6", name: "Festival", category: "Music", bgImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea", boxColor: "rgba(0,0,0,0.6)", textColor: "#FFFFFF", iconColor: "#FFFFFF" },
    { id: "m-i7", name: "Electric Guitar", category: "Music", bgImage: "https://images.unsplash.com/photo-1525201548942-d8732f6617c0", boxColor: "rgba(0,0,0,0.7)", textColor: "#FFD700", iconColor: "#FFD700" },
    { id: "m-i8", name: "DJ Deck", category: "Music", bgImage: "https://images.unsplash.com/photo-1571266028243-d220c9c3b31e", boxColor: "rgba(0,0,0,0.7)", textColor: "#00E5FF", iconColor: "#00E5FF" },
    { id: "m-i9", name: "Piano Keys", category: "Music", bgImage: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0", boxColor: "rgba(255,255,255,0.9)", textColor: "#1A1A1A", iconColor: "#1A1A1A" },
    { id: "m-i10", name: "Festival Crowd", category: "Music", bgImage: "https://images.unsplash.com/photo-1506157786151-b8491531f063", boxColor: "rgba(0,0,0,0.6)", textColor: "#FF4081", iconColor: "#FF4081" },
    { id: "m-i11", name: "Cassette Tape", category: "Music", bgImage: "https://images.unsplash.com/photo-1539375665275-f9de415ef9ac", boxColor: "rgba(255,255,255,0.9)", textColor: "#1A1A1A", iconColor: "#1A1A1A" },

    // ==========================================
    // HEALTH AND FITNESS (4 Solids, 11 Images)
    // ==========================================
    { id: "h-s1", name: "Energizing Orange", category: "Health and Fitness", bgColor: "#FF7043", boxColor: "#1A237E", textColor: "#FFFFFF", iconColor: "#1A237E" },
    { id: "h-s2", name: "Fresh Lime", category: "Health and Fitness", bgColor: "#F1F8E9", boxColor: "#689F38", textColor: "#33691E", iconColor: "#33691E" },
    { id: "h-s3", name: "Dark Steel", category: "Health and Fitness", bgColor: "#263238", boxColor: "#FF1744", textColor: "#FFFFFF", iconColor: "#FF1744" },
    { id: "h-s4", name: "Ocean Calm", category: "Health and Fitness", bgColor: "#E1F5FE", boxColor: "#0277BD", textColor: "#01579B", iconColor: "#01579B" },

    { id: "h-i1", name: "Iron Gym", category: "Health and Fitness", bgImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438", boxColor: "rgba(0,20,10,0.7)", textColor: "#76FF03", iconColor: "#76FF03" },
    { id: "h-i2", name: "Yoga Sunrise", category: "Health and Fitness", bgImage: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb", boxColor: "rgba(255,255,255,0.9)", textColor: "#1A1A1A", iconColor: "#1A1A1A" },
    { id: "h-i3", name: "Road Runner", category: "Health and Fitness", bgImage: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f", boxColor: "rgba(0,0,0,0.6)", textColor: "#FFFFFF", iconColor: "#FFFFFF" },
    { id: "h-i4", name: "Healthy Bowl", category: "Health and Fitness", bgImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061", boxColor: "rgba(255,255,255,0.9)", textColor: "#2E7D32", iconColor: "#2E7D32" },
    { id: "h-i5", name: "Mountain Climb", category: "Health and Fitness", bgImage: "https://images.unsplash.com/photo-1517649763962-0c623066013b", boxColor: "rgba(0,0,0,0.6)", textColor: "#FFFFFF", iconColor: "#FFFFFF" },
    { id: "h-i6", name: "Bike Trail", category: "Health and Fitness", bgImage: "https://images.unsplash.com/photo-1532384748853-8f54a8f476e2", boxColor: "rgba(0,0,0,0.6)", textColor: "#FFD700", iconColor: "#FFD700" },
    { id: "h-i7", name: "Kettlebell", category: "Health and Fitness", bgImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48", boxColor: "rgba(0,0,0,0.7)", textColor: "#76FF03", iconColor: "#76FF03" },
    { id: "h-i8", name: "Sneakers", category: "Health and Fitness", bgImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", boxColor: "rgba(0,0,0,0.6)", textColor: "#FFFFFF", iconColor: "#FFFFFF" },
    { id: "h-i9", name: "Yoga Mat", category: "Health and Fitness", bgImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a", boxColor: "rgba(255,255,255,0.9)", textColor: "#1A1A1A", iconColor: "#1A1A1A" },
    { id: "h-i10", name: "Gym Dark", category: "Health and Fitness", bgImage: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f", boxColor: "rgba(0,0,0,0.7)", textColor: "#FF1744", iconColor: "#FF1744" },
    { id: "h-i11", name: "Fruit Smoothie", category: "Health and Fitness", bgImage: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea", boxColor: "rgba(255,255,255,0.9)", textColor: "#2E7D32", iconColor: "#2E7D32" },

    // ==========================================
    // MARKETING (4 Solids, 11 Images)
    // ==========================================
    { id: "mk-s1", name: "Bold Red", category: "Marketing", bgColor: "#D50000", boxColor: "#FFEB3B", textColor: "#FFFFFF", iconColor: "#FFEB3B" },
    { id: "mk-s2", name: "Trust Blue", category: "Marketing", bgColor: "#1565C0", boxColor: "#FFFFFF", textColor: "#FFFFFF", iconColor: "#FFFFFF" },
    { id: "mk-s3", name: "Sleek Dark", category: "Marketing", bgColor: "#212121", boxColor: "#00E676", textColor: "#FFFFFF", iconColor: "#00E676" },
    { id: "mk-s4", name: "Clean Light", category: "Marketing", bgColor: "#FAFAFA", boxColor: "#3D5AFE", textColor: "#212121", iconColor: "#212121" },

    { id: "mk-i1", name: "Data Analytics", category: "Marketing", bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f", boxColor: "rgba(0,10,30,0.7)", textColor: "#00E5FF", iconColor: "#00E5FF" },
    { id: "mk-i2", name: "Strategy Board", category: "Marketing", bgImage: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07", boxColor: "rgba(255,255,255,0.9)", textColor: "#1A1A1A", iconColor: "#1A1A1A" },
    { id: "mk-i3", name: "Social Media", category: "Marketing", bgImage: "https://images.unsplash.com/photo-1611926653458-09294b3142bf", boxColor: "rgba(0,0,0,0.6)", textColor: "#FFFFFF", iconColor: "#FFFFFF" },
    { id: "mk-i4", name: "Networking", category: "Marketing", bgImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7", boxColor: "rgba(0,0,0,0.6)", textColor: "#FFFFFF", iconColor: "#FFFFFF" },
    { id: "mk-i5", name: "Team Meeting", category: "Marketing", bgImage: "https://images.unsplash.com/photo-1552664730-d307ca884978", boxColor: "rgba(0,0,0,0.7)", textColor: "#FFD700", iconColor: "#FFD700" },
    { id: "mk-i6", name: "Target Audience", category: "Marketing", bgImage: "https://images.unsplash.com/photo-1533750516457-a7f992034fec", boxColor: "rgba(0,0,0,0.6)", textColor: "#FFFFFF", iconColor: "#FFFFFF" },
    { id: "mk-i7", name: "Megaphone", category: "Marketing", bgImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0", boxColor: "rgba(0,0,0,0.6)", textColor: "#FFEB3B", iconColor: "#FFEB3B" },
    { id: "mk-i8", name: "SEO Search", category: "Marketing", bgImage: "https://images.unsplash.com/photo-1611162616475-46b635cb6868", boxColor: "rgba(0,0,0,0.7)", textColor: "#00E676", iconColor: "#00E676" },
    { id: "mk-i9", name: "Lightbulb Idea", category: "Marketing", bgImage: "https://images.unsplash.com/photo-1507842217343-583bb7270b66", boxColor: "rgba(0,0,0,0.6)", textColor: "#FFFFFF", iconColor: "#FFFFFF" },
    { id: "mk-i10", name: "Laptop Graphs", category: "Marketing", bgImage: "https://images.unsplash.com/photo-1556761175-b413da4baf72", boxColor: "rgba(0,0,0,0.7)", textColor: "#00E5FF", iconColor: "#00E5FF" },
    { id: "mk-i11", name: "Plant Growth", category: "Marketing", bgImage: "https://images.unsplash.com/photo-1559526324-4b28b57843d5", boxColor: "rgba(255,255,255,0.9)", textColor: "#1A1A1A", iconColor: "#1A1A1A" },
];

export const CATEGORIES = ["All", "Creator", "Business", "Gaming", "Music", "Health and Fitness", "Marketing"];

// FIX: Updated to explicitly request vertical/portrait cropping (w=600&h=900) for all images
export function bgUrl(id) {
    return `${id}?q=80&w=600&h=900&auto=format&fit=crop`;
}