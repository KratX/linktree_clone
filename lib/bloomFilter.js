import crypto from "crypto";

export class BloomFilter {
    constructor(size = 10000, numHashes = 4) {
        this.size = size;
        this.numHashes = numHashes;
        this.bits = new Uint8Array(Math.ceil(size / 8));
    }

    getHashes(item) {
        const hashes = [];
        for (let i = 0; i < this.numHashes; i++) {
            const hash = crypto.createHash("sha256").update(`${i}${item}`).digest("hex");
            const hashInt = parseInt(hash.substring(0, 8), 16) % this.size;
            hashes.push(hashInt);
        }
        return hashes;
    }

    add(item) {
        const hashes = this.getHashes(item);
        for (const hash of hashes) {
            const byteIndex = Math.floor(hash / 8);
            const bitIndex = hash % 8;
            this.bits[byteIndex] |= (1 << bitIndex);
        }
    }

    contains(item) {
        const hashes = this.getHashes(item);
        for (const hash of hashes) {
            const byteIndex = Math.floor(hash / 8);
            const bitIndex = hash % 8;
            if ((this.bits[byteIndex] & (1 << bitIndex)) === 0) return false;
        }
        return true;
    }

    exportState() {
        return Buffer.from(this.bits).toString("base64");
    }

    importState(state) {
        this.bits = new Uint8Array(Buffer.from(state, "base64"));
    }
}

export const usernameBloom = new BloomFilter(10000, 4);
export const emailBloom = new BloomFilter(10000, 4);