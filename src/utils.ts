import type { StatusCode } from "hono/utils/http-status";

export function withCache(fn: (...args: any[]) => any) {
	const cache = new Map();

	return async (...args: string[]) => {
		const key = args.join(":");
		if (cache.has(key))
			return cache.get(key);

		const result = await fn(...args);
		cache.set(key, result);

		return result;
	};
}

export class ServerError {
	constructor(
		public readonly status: StatusCode,
		public readonly message: string,
	) {}
}
