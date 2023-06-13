import satori, { init as initSatori } from 'satori/wasm';
import initYoga from 'yoga-wasm-web';
import { Resvg, initWasm as initResvg } from '@resvg/resvg-wasm';
import wasmYoga from '../node_modules/yoga-wasm-web/dist/yoga.wasm';
import wasmResvg from '../node_modules/@resvg/resvg-wasm/index_bg.wasm';
import { withCache } from './utils';
import type { ReactNode } from 'react';

const yoga = await initYoga(wasmYoga);
initSatori(yoga);
await initResvg(wasmResvg);

type Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type Style$1 = 'normal' | 'italic';
type FontOptions = {
  data: ArrayBuffer;
  name: string;
  weight?: Weight;
  style?: Style$1;
  lang?: string;
};

export async function generateImage(
  element: ReactNode,
  width: number,
  height: number,
  fonts: Array<FontOptions>,
  loadAdditionalAsset: (
    languageCode: string,
    segment: string,
  ) => Promise<string | Array<FontOptions>>,
): Promise<Uint8Array> {
  const svg = await satori(element, {
    width,
    height,
    fonts,
    loadAdditionalAsset: withCache(loadAdditionalAsset),
  });
  const png = new Resvg(svg).render().asPng();

  return png;
}
