// lib/adminUtils.js
export function calculateBanExpiry(duration) {
    if (duration === "permanent") return null; // null means permanent in our DB logic
    const now = new Date();
    const days = parseInt(duration, 10);
    now.setDate(now.getDate() + days);
    return now;
}

export function isBanned(bannedUntil) {
    if (!bannedUntil) return false;
    // If it's a date in the future, they are banned
    return new Date(bannedUntil) > new Date();
}

export function formatBanDate(date) {
    if (!date) return "Permanently Banned";
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}