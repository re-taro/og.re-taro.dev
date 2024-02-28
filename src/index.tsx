import { Hono } from "hono";
import { cache } from "hono/cache";
import { etag } from "hono/etag";
import { Parser, jaModel } from "budoux";

import type { CardTemplate } from "./constant";
import { Card } from "./card";
import { getIconCode, loadEmoji } from "./emoji";
import { generateImage } from "./image";
import { ServerError } from "./utils";

// eslint-disable-next-line ts/consistent-type-definitions
type Bindings = {
	BUCKET: R2Bucket;
};

const app = new Hono<{ Bindings: Bindings }>();
const parser = new Parser(jaModel);

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
		if (typeof c.req.query("title") === "string") {
			const title = String(c.req.query("title")).slice(0, 200);
			const text = c.req.query("text")?.slice(0, 200);
			const tmp = (c.req.query("tmp") ?? "plain") as CardTemplate;

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

				return new Response(cachedRes.body, {
					status: cachedRes.status,
					statusText: cachedRes.statusText,
					headers: cachedRes.headers,
					cf: cachedRes.cf,
					webSocket: cachedRes.webSocket,
				});
			}

			const key = new URL(c.req.url).searchParams.toString();
			const cachedImage = await c.env.BUCKET.get(`cache/${key}.png`);
			if (cachedImage !== null && typeof cachedImage !== "undefined") {
				return new Response(cachedImage.body, {
					headers: {
						"Cache-Control": "public, max-age=604800",
						ETag: `W/${cachedImage.httpEtag}`,
						"Content-Type":
							cachedImage.httpMetadata?.contentType ??
							"application/octet-stream",
					},
				});
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
				const fontObj = await c.env.BUCKET.get(
					"fonts/JetBrainsMono-Medium.ttf",
				);
				if (fontObj === null || typeof fontObj === "undefined") {
					// eslint-disable-next-line ts/no-throw-literal
					throw new ServerError(500, "Failed to get JetBrainsMono");
				}
				jbMonoBuf = await fontObj.arrayBuffer();
			}
			const titleNode = parser.parse(title);
			const textNode = text ? parser.parse(text) : [];

			const image = await generateImage(
				<Card titleNode={titleNode} textNode={textNode} tmp={tmp} />,
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
		} else {
			return c.text("Parameter not definer: title", 400, {
				"Content-Type": "text/plain",
			});
		}
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
