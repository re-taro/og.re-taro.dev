import { Hono } from "hono";
import { cache } from "hono/cache";
import { etag } from "hono/etag";

import { Card } from "./card";
import { getIconCode, loadEmoji } from "./emoji";
import { generateImage } from "./image";
import { ServerError } from "./utils";

// eslint-disable-next-line ts/consistent-type-definitions
type Bindings = {
	BUCKET: R2Bucket;
};

const app = new Hono<{ Bindings: Bindings }>();

let notoSansBuf: null | ArrayBuffer = null;
let jbMonoBuf: null | ArrayBuffer = null;

app.use(
	"/",
	etag(),
	cache({
		cacheName: "og",
		cacheControl: "public, max-age=604800",
	}),
);

app.get("/", async (c) => {
	try {
		const title = c.req.query("title") ? c.req.query("title")! : "";
		const date = c.req.query("date") ? `📅 ― ${c.req.query("date")}` : "";
		const domain = c.req.query("domain")
			? c.req.query("domain")!
			: "re-taro.dev";

		const cache = caches.default;
		const cachedRes = await cache.match(c.req.url);
		if (cachedRes) {
			const etag = c.req.raw.headers.get("If-None-Match");
			if (etag !== null && etag === cachedRes.headers.get("ETag")) {
				return new Response(null, {
					status: 304,
					headers: cachedRes.headers,
				});
			}

			return cachedRes;
		}

		const key = `${title}-${date}-${domain}`;
		const cachedImage = await c.env.BUCKET.get(`cache/${key}.png`);
		if (cachedImage !== null && typeof cachedImage !== "undefined") {
			const res = new Response(cachedImage.body, {
				headers: {
					"Cache-Control": "public, max-age=604800",
					ETag: `W/${cachedImage.httpEtag}`,
					"Content-Type":
						cachedImage.httpMetadata?.contentType ?? "application/octet-stream",
				},
			});

			return res;
		}

		if (notoSansBuf === null) {
			const fontObj = await c.env.BUCKET.get("fonts/NotoSansJP-Bold.ttf");
			if (fontObj === null || typeof fontObj === "undefined") {
				// eslint-disable-next-line ts/no-throw-literal
				throw new ServerError(500, "Failed to get NotoSansJP");
			}
			notoSansBuf = await fontObj.arrayBuffer();
		}
		if (jbMonoBuf === null) {
			const fontObj = await c.env.BUCKET.get("fonts/JetBrainsMono-Medium.ttf");
			if (fontObj === null || typeof fontObj === "undefined") {
				// eslint-disable-next-line ts/no-throw-literal
				throw new ServerError(500, "Failed to get JetBrainsMono");
			}
			jbMonoBuf = await fontObj.arrayBuffer();
		}
		const image = await generateImage(
			<Card title={title} date={date} domain={domain} />,
			1200,
			630,
			[
				{
					name: "NotoSansJP",
					data: notoSansBuf,
					weight: 700,
					style: "normal",
				},
				{
					name: "JetBrainsMono",
					data: jbMonoBuf,
					weight: 500,
					style: "normal",
				},
			],
			async (code, text) => {
				if (code === "emoji") {
					return `data:image/svg+xml;base64,${btoa(
						await loadEmoji(getIconCode(text)),
					)}`;
				}

				return [];
			},
		);
		await c.env.BUCKET.put(`cache/${key}.png`, image);

		return new Response(image, {
			headers: {
				"Cache-Control": "public, max-age=604800",
				"Conetnt-Type": "image/png",
			},
		});
	} catch (e: unknown) {
		if (e instanceof ServerError) {
			return c.text(e.message, e.status, {
				"Content-Type": "text/plain",
			});
		} else if (e instanceof Error) {
			return c.text(
				`[${e.name}]: ${e.message} ${e.stack && `(${e.stack})`}`,
				500,
				{
					"Content-Type": "text/plain",
				},
			);
		} else {
			return c.text("Internal Server Error", 500, {
				"Content-Type": "text/plain",
			});
		}
	}
});

export default app;
