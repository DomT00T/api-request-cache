# api-request-cache

A versatile API request caching library with customizable strategies and storage options.

## Installation

Install the library using npm:

```bash
npm install api-request-cache
```

## Usage

### Basic Usage

To use the library, import the `CacheManager`, along with the desired cache storage and strategy:

```typescript
import {
  CacheManager,
  InMemoryCache,
  FIFOCacheStrategy,
} from "api-request-cache";

// Initialize CacheManager with in-memory storage and FIFO cache strategy
const cacheManager = new CacheManager(
  new InMemoryCache(),
  new FIFOCacheStrategy(100),
);

// Use the cache manager to fetch data
const fetchData = async (url: string) => {
  const data = await cacheManager.get(url, async () => {
    const response = await fetch(url);
    return response.json();
  });

  console.log(data);
};

fetchData("https://api.example.com/data");
```

### Custom Cache Strategy

You can create your own caching strategy by implementing the `ICacheStrategy` interface:

```typescript
import { ICacheStrategy, CacheEntry } from "api-request-cache";

class MyCustomStrategy implements ICacheStrategy {
  shouldCache(entry: CacheEntry): boolean {
    // Implement custom logic for caching
    return true;
  }

  evict(): void {
    // Implement custom eviction logic
  }
}

const cacheManager = new CacheManager(
  new InMemoryCache(),
  new MyCustomStrategy(),
);
```

### Invalidating Cache

To invalidate a specific cache entry:

```typescript
cacheManager.invalidate("https://api.example.com/data");
```

To invalidate all cache entries:

```typescript
cacheManager.invalidateAll();
```

## API Reference

### CacheManager

A class to manage caching with flexible storage and strategies.

**Methods:**

- `get(key: string, fetcher: () => Promise<T>): Promise<T>`: Gets the cached data if available or fetches it if not.
- `invalidate(key: string): void`: Removes a specific cache entry.
- `invalidateAll(): void`: Clears all cache entries.

**Interfaces:**

- `ICacheStorage`: Interface for creating custom cache storage solutions.
- `ICacheStrategy`: Interface for creating custom cache strategies.

**Built-in Cache Strategies:**

- `FIFOCacheStrategy`: First-In-First-Out cache eviction strategy.
- `LRUCacheStrategy`: Least Recently Used cache eviction strategy.
- `TimeBasedCacheStrategy`: Cache eviction based on a time-to-live (TTL).

**Built-in Cache Storage:**

- `InMemoryCache`: Simple in-memory storage for caching.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Author

Developed by domtoot.

---

# api-request-cache

ไลบรารีสำหรับการแคชคำขอ API ที่หลากหลาย พร้อมกลยุทธ์และตัวเลือกการจัดเก็บที่ปรับแต่งได้

## การติดตั้ง

ติดตั้งไลบรารีโดยใช้ npm:

```bash
npm install api-request-cache
```

## การใช้งาน

### การใช้งานพื้นฐาน

ในการใช้ไลบรารีนี้ ให้นำเข้า `CacheManager` พร้อมกับการจัดเก็บและกลยุทธ์แคชที่ต้องการ:

```typescript
import {
  CacheManager,
  InMemoryCache,
  FIFOCacheStrategy,
} from "api-request-cache";

// เริ่มต้น CacheManager ด้วยการจัดเก็บในหน่วยความจำและกลยุทธ์ FIFO
const cacheManager = new CacheManager(
  new InMemoryCache(),
  new FIFOCacheStrategy(100),
);

// ใช้ CacheManager เพื่อดึงข้อมูล
const fetchData = async (url: string) => {
  const data = await cacheManager.get(url, async () => {
    const response = await fetch(url);
    return response.json();
  });

  console.log(data);
};

fetchData("https://api.example.com/data");
```

### การสร้างกลยุทธ์แคชแบบกำหนดเอง

คุณสามารถสร้างกลยุทธ์แคชของคุณเองโดยการทำตามอินเทอร์เฟซ `ICacheStrategy`:

```typescript
import { ICacheStrategy, CacheEntry } from "api-request-cache";

class MyCustomStrategy implements ICacheStrategy {
  shouldCache(entry: CacheEntry): boolean {
    // ติดตั้งตรรกะการแคชแบบกำหนดเอง
    return true;
  }

  evict(): void {
    // ติดตั้งตรรกะการลบแบบกำหนดเอง
  }
}

const cacheManager = new CacheManager(
  new InMemoryCache(),
  new MyCustomStrategy(),
);
```

### การล้างแคช

ในการล้างข้อมูลแคชเฉพาะรายการหนึ่ง:

```typescript
cacheManager.invalidate("https://api.example.com/data");
```

ในการล้างข้อมูลแคชทั้งหมด:

```typescript
cacheManager.invalidateAll();
```

## อ้างอิง API

### CacheManager

คลาสสำหรับจัดการการแคชด้วยการจัดเก็บและกลยุทธ์ที่ยืดหยุ่น

**เมธอด:**

- `get(key: string, fetcher: () => Promise<T>): Promise<T>`: ดึงข้อมูลที่แคชถ้ามี หรือดึงข้อมูลใหม่หากไม่มี
- `invalidate(key: string): void`: ลบรายการแคชเฉพาะ
- `invalidateAll(): void`: ล้างรายการแคชทั้งหมด

**อินเทอร์เฟซ:**

- `ICacheStorage`: อินเทอร์เฟซสำหรับการสร้างโซลูชันการจัดเก็บแคชแบบกำหนดเอง
- `ICacheStrategy`: อินเทอร์เฟซสำหรับการสร้างกลยุทธ์แคชแบบกำหนดเอง

**กลยุทธ์แคชที่สร้างมาแล้ว:**

- `FIFOCacheStrategy`: กลยุทธ์การลบแคชตามลำดับการเข้ามาก่อน-ออกก่อน (FIFO)
- `LRUCacheStrategy`: กลยุทธ์การลบแคชที่ใช้ข้อมูลล่าสุดน้อยที่สุด (LRU)
- `TimeBasedCacheStrategy`: การลบแคชตามเวลาในการมีชีวิต (TTL)

**การจัดเก็บแคชที่สร้างมาแล้ว:**

- `InMemoryCache`: การจัดเก็บข้อมูลแคชในหน่วยความจำ

## การมีส่วนร่วม

การมีส่วนร่วมยินดีต้อนรับ! สามารถส่งปัญหาหรือคำขอการดึง (pull requests) ได้ตามต้องการ

## สัญญาอนุญาต

โครงการนี้ได้รับอนุญาตภายใต้ MIT License ดูรายละเอียดในไฟล์ LICENSE

## ผู้พัฒนา

พัฒนาโดย domtoot

---
