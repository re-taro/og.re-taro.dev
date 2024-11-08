import { Resvg } from "@resvg/resvg-wasm";
import type { ReactNode } from "react";
import satori from "satori/wasm";

import { withCache } from "./utils";
import { genWasmInit } from "./wasm";

type Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type Style$1 = "italic" | "normal";
interface FontOptions {
	data: ArrayBuffer;
	name: string;
	lang?: string;
	style?: Style$1;
	weight?: Weight;
}

const init = genWasmInit();

export async function generateImage(
	element: ReactNode,
	width: number,
	height: number,
	fonts: FontOptions[],
	loadAdditionalAsset: (
		languageCode: string,
		segment: string,
	) => Promise<FontOptions[] | string>,
): Promise<Uint8Array> {
	await init();
	const svg = await satori(element, {
		fonts,
		height,
		loadAdditionalAsset: withCache(loadAdditionalAsset),
		width,
	});
	const png = new Resvg(svg).render().asPng();

	return png;
}
