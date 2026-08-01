// components/Avatars.jsx
export const AVATARS = [
    { id: 'gamepad', name: 'Gaming' },
    { id: 'music', name: 'Music' },
    { id: 'camera', name: 'Photography' },
    { id: 'rocket', name: 'Startup' },
    { id: 'palette', name: 'Creator' },
    { id: 'dumbbell', name: 'Fitness' },
];

export function AvatarRenderer({ avatarId }) {
    switch (avatarId) {
        case 'gamepad':
            return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M6 12h4M8 10v4" /><circle cx="15" cy="11" r="1" fill="currentColor" /><circle cx="17" cy="13" r="1" fill="currentColor" /><path d="M17.5 17.5L22 22M19.5 10.5a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
        case 'music':
            return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>;
        case 'camera':
            return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M3 9a2 2 0 012-2h.93a2 2 0 001.66-.9l.82-1.2A2 2 0 0110.07 4h3.86a2 2 0 011.66.9l.82 1.2A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><circle cx="12" cy="13" r="4" /></svg>;
        case 'rocket':
            return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09zM12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>;
        case 'palette':
            return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10c0 2.2-1.8 4-4 4h-1.5a1.5 1.5 0 00-1.5 1.5c0 .4.2.7.4 1 .3.3.4.6.4 1a1.5 1.5 0 01-1.5 1.5H12z" /><circle cx="7.5" cy="10.5" r="1" fill="currentColor" /><circle cx="12" cy="7.5" r="1" fill="currentColor" /><circle cx="16.5" cy="10.5" r="1" fill="currentColor" /></svg>;
        case 'dumbbell':
            return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M14.4 14.4L9.6 9.6M18.657 21.485a2 2 0 11-2.829-2.828l-1.767 1.768a2 2 0 11-2.829-2.829l6.364-6.364a2 2 0 112.829 2.829l-1.768 1.767a2 2 0 112.828 2.829zM2.515 5.343a2 2 0 112.828 2.829l1.768-1.768a2 2 0 112.829 2.829L5.85 15.778a2 2 0 11-2.828-2.829l1.767-1.767a2 2 0 11-2.828-2.829z" /></svg>;
        default:
            return null;
    }
}