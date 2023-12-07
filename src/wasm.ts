import { initWasm as initResvg } from "@resvg/resvg-wasm";
import { init as initSatori } from "satori/wasm";
import initYoga from "yoga-wasm-web";

import wasmResvg from "../node_modules/@resvg/resvg-wasm/index_bg.wasm";
import wasmYoga from "../node_modules/yoga-wasm-web/dist/yoga.wasm";

export function genWasmInit() {
  // eslint-disable-next-line unused-imports/no-unused-vars
  let isInit = false;

  return async () => {
    if (isInit) {
      return;
    }

    const yoga = await initYoga(wasmYoga);
    initSatori(yoga);
    await initResvg(wasmResvg);
    isInit = true;
  };
}
