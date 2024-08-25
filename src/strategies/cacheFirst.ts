import { IMemoryStorage } from '../storage/memoryStorage'; // เปลี่ยนชื่อให้ตรงตามที่คุณใช้

// Define the CacheStrategy interface
export interface CacheStrategy {
    execute<T>(key: string, fetcher: () => Promise<T>, storage: IMemoryStorage, ttl: number): Promise<{ data: T; fromCache: boolean }>;
}

// Implement the CacheFirst strategy
export class CacheFirst implements CacheStrategy {
    async execute<T>(key: string, fetcher: () => Promise<T>, storage: IMemoryStorage, ttl: number): Promise<{ data: T; fromCache: boolean }> {
        // Try to get the cached data
        const cached = await storage.getItem<{ data: T; timestamp: number }>(key);

        if (cached && Date.now() - cached.timestamp < ttl) {
            // If cached data is still valid
            return { data: cached.data, fromCache: true };
        }

        // If no valid cached data, fetch from network
        try {
            const result = await fetcher();
            await storage.setItem(key, { data: result, timestamp: Date.now() });
            return { data: result, fromCache: false };
        } catch (error) {
            // Optionally handle errors or fall back
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}
