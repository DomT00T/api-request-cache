# api-request-cache

A versatile API request caching library with customizable strategies and storage options.

## Installation

Install the library using npm:

```bash
npm install api-request-cache
```

## Usage

Basic Usage
To use the library, start by importing the CacheManager along with the desired cache storage and strategy:

import { CacheManager, InMemoryCache, FIFOCacheStrategy } from 'api-request-cache';

// Initialize CacheManager with in-memory storage and FIFO cache strategy
const cacheManager = new CacheManager(new InMemoryCache(), new FIFOCacheStrategy(100));

// Use the cache manager to fetch data
const fetchData = async (url: string) => {
const data = await cacheManager.get(url, async () => {
const response = await fetch(url);
return response.json();
});

console.log(data);
};

fetchData('https://api.example.com/data');

Custom Cache Strategy
You can create your own caching strategy by implementing the ICacheStrategy interface:

import { ICacheStrategy, CacheEntry } from 'api-request-cache';

class MyCustomStrategy implements ICacheStrategy {
shouldCache(entry: CacheEntry): boolean {
// Implement custom logic for caching
return true;
}

evict(): void {
// Implement custom eviction logic
}
}

const cacheManager = new CacheManager(new InMemoryCache(), new MyCustomStrategy());

Invalidating Cache
To invalidate a specific cache entry:

cacheManager.invalidate('https://api.example.com/data');

To invalidate all cache entries:

cacheManager.invalidateAll();

API Reference
CacheManager
A class to manage caching with flexible storage and strategies.

Methods
get(key: string, fetcher: () => Promise<T>): Promise<T>: Gets the cached data if available or fetches it if not.
invalidate(key: string): void: Removes a specific cache entry.
invalidateAll(): void: Clears all cache entries.
Interfaces
ICacheStorage: Interface for creating custom cache storage solutions.
ICacheStrategy: Interface for creating custom cache strategies.
Built-in Cache Strategies
FIFOCacheStrategy: First-In-First-Out cache eviction strategy.
LRUCacheStrategy: Least Recently Used cache eviction strategy.
TimeBasedCacheStrategy: Cache eviction based on a time-to-live (TTL).
Built-in Cache Storage
InMemoryCache: Simple in-memory storage for caching.
Contributing
Contributions are welcome! Feel free to submit issues or pull requests.

License
This project is licensed under the MIT License. See the LICENSE file for more details.

Author
Developed by domtoot.
