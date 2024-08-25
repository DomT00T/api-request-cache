// staleWhileRevalidate.ts

export interface StaleWhileRevalidate {
    getItem<T>(key: string): Promise<T | null>;
    setItem<T>(key: string, value: T): Promise<void>;
    removeItem(key: string): Promise<void>;
    clear(): Promise<void>;
}

export class StaleWhileRevalidate implements StaleWhileRevalidate {
    async execute<T>(key: string, fetcher: () => Promise<T>, storage: StaleWhileRevalidate, ttl: number): Promise<T> {
        const cached = await storage.getItem<T>(key);

        if (cached) {
            // Trigger the fetch and update cache in the background
            fetcher().then(async (result) => {
                await storage.setItem(key, result);
            }).catch(console.error);

            return cached;
        } else {
            // Fetch and cache the result if no cache exists
            const result = await fetcher();
            await storage.setItem(key, result);
            return result;
        }
    }
}
