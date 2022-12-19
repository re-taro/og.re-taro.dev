import pickBy from "lodash-es/pickBy";

import type { OgImageOption, OgImageOptionConverted } from "@/types/og";

export const buildOgImageUrl = (options: OgImageOption): string => {
  const converted: OgImageOptionConverted = {
    ...options,
  };
  const purgedOptions = pickBy(converted);
  const urlParams = new URLSearchParams(purgedOptions).toString();
  const params = urlParams ? `?${urlParams}` : "";
  return `${import.meta.url}/api/ogp${params}`;
};
