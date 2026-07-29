const rateLimitMap = new Map();

export default function rateLimit(limit, timeFrame) {
    return (ip) => {
        const now = Date.now();
        const windowStart = now - timeFrame;

        if (!rateLimitMap.has(ip)) {
            rateLimitMap.set(ip, []);
        }

        const requests = rateLimitMap.get(ip).filter((time) => time > windowStart);

        if (requests.length >= limit) {
            return false; // Rate limit exceeded
        }

        requests.push(now);
        rateLimitMap.set(ip, requests);
        return true;
    };
}