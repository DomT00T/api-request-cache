// cacheManager.ts
import { MemoryStorage } from "./storage/memoryStorage"; // Adjust import path and name
import { CacheStrategy } from "./strategies/cacheFirst";

interface CacheOptions {
    storage: MemoryStorage; // Adjust type name
    strategy: CacheStrategy;
    ttl?: number;
}

export class CacheManager {
    private storage: MemoryStorage; // Adjust type name
    private strategy: CacheStrategy;
    private ttl: number;

    constructor(options: CacheOptions) {
        this.storage = options.storage;
        this.strategy = options.strategy;
        this.ttl = options.ttl || 60000; // Default TTL of 60 seconds
    }

    async get<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
        return this.strategy.execute<T>(key, fetcher, this.storage, this.ttl);
    }

    async set<T>(key: string, value: T): Promise<void> {
        await this.storage.setItem(key, value);
    }

    async invalidate(key: string): Promise<void> {
        await this.storage.removeItem(key);
    }

    async clearAll(): Promise<void> {
        await this.storage.clear();
    }
}
