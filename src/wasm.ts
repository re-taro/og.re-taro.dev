import { initWasm as initResvg } from "@resvg/resvg-wasm";
import { init as initSatori } from "satori/wasm";
import initYoga from "yoga-wasm-web";

export function genWasmInit() {
  // eslint-disable-next-line unused-imports/no-unused-vars
  let isInit = false;

  return async (resvgBuf: ArrayBuffer, yogaBuf: ArrayBuffer) => {
    const yoga = await initYoga(yogaBuf);
    initSatori(yoga);
    await initResvg(resvgBuf);
    isInit = true;
  };
}
