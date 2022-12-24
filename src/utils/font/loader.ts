export const fontLoader = (url: string) =>
  fetch(new URL(url, import.meta.url)).then(res => res.arrayBuffer())
