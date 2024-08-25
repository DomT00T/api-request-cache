// cacheFirst.ts
import { MemoryStorage } from "../storage/memoryStorage"; // Adjust import path as needed

// Define the CacheStrategy interface
export interface CacheStrategy {
    execute<T>(key: string, fetcher: () => Promise<T>, storage: MemoryStorage, ttl: number): Promise<T>;
}

// Implement the CacheFirst strategy
export class CacheFirst implements CacheStrategy {
    async execute<T>(key: string, fetcher: () => Promise<T>, storage: MemoryStorage, ttl: number): Promise<T> {
        // Try to get the cached data
        const cached = await storage.getItem<T>(key);

        if (cached) {
            return cached;
        }

        // If no cached data, fetch from network
        try {
            const result = await fetcher();
            await storage.setItem(key, result);
            return result;
        } catch (error) {
            // Optionally handle errors or fall back
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}
