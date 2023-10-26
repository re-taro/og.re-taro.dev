import { Hono } from 'hono';
import { etag } from 'hono/etag';
import { cache } from 'hono/cache';
import { Card } from './card';
import { generateImage } from './image';
import { getIconCode, loadEmoji } from './emoji';

type Bindings = {
  BUCKET: R2Bucket;
};

const app = new Hono<{ Bindings: Bindings }>();

let notoSansBuf: null | ArrayBuffer = null;
let jbMonoBuf: null | ArrayBuffer = null;

app.use(
  '/',
  etag(),
  cache({
    cacheName: 'ogp',
    cacheControl: 'public, max-age=604800',
  }),
);

app.get('/', async (c) => {
  const title = c.req.query('title') ? (c.req.query('title') as string) : '';
  const date = c.req.query('date') ? `📅 ― ${c.req.query('date')}` : '';
  const domain = c.req.query('domain')
    ? (c.req.query('domain') as string)
    : 're-taro.dev';

  const cache = caches.default;
  const cachedRes = await cache.match(c.req.url);
  if (cachedRes) {
    const etag = c.req.raw.headers.get('If-None-Match');
    if (etag !== null && etag === cachedRes.headers.get('ETag')) {
      return new Response(null, {
        status: 304,
        headers: cachedRes.headers,
      });
    }

    return cachedRes;
  }

  const key = `${title}-${date}-${domain}`;
  const cachedImage = await c.env.BUCKET.get(`cache/${key}.png`);
  if (cachedImage !== null && typeof cachedImage !== 'undefined') {
    const res = new Response(cachedImage.body, {
      headers: {
        'Cache-Control': 'public, max-age=604800',
        ETag: `W/${cachedImage.httpEtag}`,
        'Content-Type':
          cachedImage.httpMetadata?.contentType ?? 'application/octet-stream',
      },
    });

    return res;
  }

  if (notoSansBuf === null) {
    const fontObj = await c.env.BUCKET.get('fonts/NotoSansJP-Bold.ttf');
    if (fontObj === null || typeof fontObj === 'undefined') {
      return c.text('Failed to get font', 500, {
        'Content-Type': 'text/plain',
      });
    }
    notoSansBuf = await fontObj.arrayBuffer();
  }
  if (jbMonoBuf === null) {
    const fontObj = await c.env.BUCKET.get('fonts/JetBrainsMono-Medium.ttf');
    if (fontObj === null || typeof fontObj === 'undefined') {
      return c.text('Failed to get font', 500, {
        'Content-Type': 'text/plain',
      });
    }
    jbMonoBuf = await fontObj.arrayBuffer();
  }
  const image = await generateImage(
    <Card title={title} date={date} domain={domain} />,
    1200,
    630,
    [
      {
        name: 'NotoSansJP',
        data: notoSansBuf,
        weight: 700,
        style: 'normal',
      },
      {
        name: 'JetBrainsMono',
        data: jbMonoBuf,
        weight: 500,
        style: 'normal',
      },
    ],
    async (code, text) => {
      if (code === 'emoji') {
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
      'Cache-Control': 'public, max-age=604800',
      'Conetnt-Type': 'image/png',
    },
  });
});

export default app;
