import { CacheStrategy } from "./cacheFirst";
export interface Storage {
    getItem<T>(key: string): Promise<T | null>;
    setItem<T>(key: string, value: T): Promise<void>;
    removeItem(key: string): Promise<void>;
    clear(): Promise<void>;
}
export class NetworkFirst implements CacheStrategy {
    async execute<T>(key: string, fetcher: () => Promise<T>, storage: Storage, ttl: number): Promise<T> {
        try {
            const result = await fetcher();
            await storage.setItem(key, result);
            return result;
        } catch (error) {
            const cached = await storage.getItem<T>(key);
            if (cached) return cached;
            throw error;
        }
    }
}
