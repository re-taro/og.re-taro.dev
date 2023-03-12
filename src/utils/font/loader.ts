// eslint-disable-next-line dot-notation
const baseUrl = process.env['NEXT_PUBLIC_BASE_URL'] ?? '';

export const fontLoader = (url: string) =>
  fetch(new URL(url, baseUrl)).then(res => res.arrayBuffer());
