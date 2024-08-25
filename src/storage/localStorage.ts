
export class LocalStorage implements LocalStorage {
    getItem<T>(key: string): T | null {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    setItem<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }

    // Implementation of other Storage properties and methods (optional)
    length: number = localStorage.length;

    key(index: number): string | null {
        return localStorage.key(index);
    }
}
