export const withCache = (fn: Function) => {
  const cache = new Map();
  return async (...args: string[]) => {
    const key = args.join(':');
    if (cache.has(key)) return cache.get(key);
    const result = await fn(...args);
    cache.set(key, result);
    return result;
  };
};
