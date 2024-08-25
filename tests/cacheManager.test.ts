// cacheManager.test.ts

import { CacheManager } from '../src/cacheManager';
import { CacheFirst } from '../src/strategies/cacheFirst';

export type MockMemoryStorage = {
    getItem: jest.Mock<Promise<any | null>, [string]>;
    setItem: jest.Mock<Promise<void>, [string, any]>;
    removeItem: jest.Mock<Promise<void>, [string]>;
    clear: jest.Mock<Promise<void>>;
};

describe('CacheManager', () => {
    let storage: MockMemoryStorage;
    let strategy: jest.Mocked<CacheFirst>;
    let cacheManager: CacheManager;

    beforeEach(() => {
        storage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn(),
        };

        strategy = {
            execute: jest.fn(),
        } as jest.Mocked<CacheFirst>;

        cacheManager = new CacheManager({
            storage: storage as any, // Type assertion to satisfy TypeScript
            strategy,
            ttl: 60000, // Default TTL
        });
    });

    it('should call strategy execute method with correct parameters', async () => {
        const key = 'testKey';
        const fetchedData = { foo: 'bar' };
        const fetcher = jest.fn().mockResolvedValue(fetchedData);

        strategy.execute.mockResolvedValue(fetchedData);

        const result = await cacheManager.get(key, fetcher);

        expect(strategy.execute).toHaveBeenCalledWith(key, fetcher, storage, 60000);
        expect(result).toBe(fetchedData);
    });

    it('should call storage setItem method correctly', async () => {
        const key = 'testKey';
        const value = { foo: 'bar' };

        await cacheManager.set(key, value);

        expect(storage.setItem).toHaveBeenCalledWith(key, value);
    });

    it('should call storage removeItem method correctly', async () => {
        const key = 'testKey';

        await cacheManager.invalidate(key);

        expect(storage.removeItem).toHaveBeenCalledWith(key);
    });

    it('should call storage clear method correctly', async () => {
        await cacheManager.clearAll();

        expect(storage.clear).toHaveBeenCalled();
    });
});