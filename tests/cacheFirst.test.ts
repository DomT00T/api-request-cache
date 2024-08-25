import { CacheFirst } from "../src/strategies/cacheFirst";

describe('CacheFirst Strategy', () => {
    let storage: jest.Mocked<any>;
    let cacheFirst: CacheFirst;
    let consoleErrorSpy: jest.SpyInstance;

    beforeAll(() => {
        // Suppress console.error during tests
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterAll(() => {
        // Restore console.error
        consoleErrorSpy.mockRestore();
    });

    beforeEach(() => {
        storage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn(),
        } as jest.Mocked<any>; // Explicitly type as MemoryStorage
        cacheFirst = new CacheFirst();
    });

    it('should return cached data if available', async () => {
        const key = 'testKey';
        const cachedData = { foo: 'bar' };

        storage.getItem.mockResolvedValueOnce(cachedData);

        const result = await cacheFirst.execute(key, jest.fn(), storage, 60000);
        expect(result).toBe(cachedData);
        expect(storage.getItem).toHaveBeenCalledWith(key);
        expect(storage.setItem).not.toHaveBeenCalled();
    });

    it('should fetch from network and cache data if not available', async () => {
        const key = 'testKey';
        const fetchedData = { foo: 'bar' };

        storage.getItem.mockResolvedValueOnce(null);
        storage.setItem.mockResolvedValueOnce();

        const fetcher = jest.fn().mockResolvedValueOnce(fetchedData);

        const result = await cacheFirst.execute(key, fetcher, storage, 60000);
        expect(result).toBe(fetchedData);
        expect(fetcher).toHaveBeenCalled();
        expect(storage.getItem).toHaveBeenCalledWith(key);
        expect(storage.setItem).toHaveBeenCalledWith(key, fetchedData);
    });

    it('should handle network errors gracefully', async () => {
        const key = 'testKey';

        storage.getItem.mockResolvedValueOnce(null);
        const fetcher = jest.fn().mockRejectedValueOnce(new Error('Network error'));

        await expect(cacheFirst.execute(key, fetcher, storage, 60000)).rejects.toThrow('Network error');
        expect(fetcher).toHaveBeenCalled();
        expect(storage.getItem).toHaveBeenCalledWith(key);
        expect(storage.setItem).not.toHaveBeenCalled();
    });
});
