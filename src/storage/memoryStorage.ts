// memoryStorage.ts
export interface MemoryStorage {

    getItem<T>(key: string): Promise<T | null>;
    setItem<T>(key: string, value: T): Promise<void>;
    removeItem(key: string): Promise<void>;
    clear(): Promise<void>;
}


export class MemoryStorage implements MemoryStorage {
    private store: Map<string, any> = new Map();

    async getItem<T>(key: string): Promise<T | null> {
        return this.store.has(key) ? this.store.get(key) : null;
    }

    async setItem<T>(key: string, value: T): Promise<void> {
        this.store.set(key, value);
    }

    async removeItem(key: string): Promise<void> {
        this.store.delete(key);
    }

    async clear(): Promise<void> {
        this.store.clear();
    }
}
