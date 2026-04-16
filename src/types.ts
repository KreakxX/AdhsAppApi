import superjson from 'superjson';

export async function getCachedOrFetch<T>(
  cacheKey: string,
  fetchFn: () => Promise<T>,
  cache: any,
  ttl: number = 600
): Promise<T> {
  const cached = await cache.get(cacheKey);
  
  if (cached) {
    return superjson.parse<T>(cached);
  }
  
  const data = await fetchFn();
  await cache.set(cacheKey, superjson.stringify(data), ttl);
  return data;
}