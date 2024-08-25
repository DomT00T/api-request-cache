// index.ts
export * from './cacheManager';
export * from './strategies/cacheFirst';
export * from './strategies/networkFirst';
export * from './strategies/staleWhileRevalidate';
export { MemoryStorage as StorageMemory } from './storage/memoryStorage';
export { LocalStorage as StorageLocal } from './storage/localStorage';
export { IndexedDBStorage as StorageIndexedDB } from './storage/indexedDBStorage';
