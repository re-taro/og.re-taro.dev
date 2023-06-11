const U200D = String.fromCharCode(8205);
const UFE0Fg = /\uFE0F/g;
const emojiCache: Record<string, Promise<string>> = {};

const toCodePoint = (unicodeSurrogates: string) => {
  const r = [];
  let c = 0;
  let p = 0;
  let i = 0;

  while (i < unicodeSurrogates.length) {
    c = unicodeSurrogates.charCodeAt(i++);
    if (p) {
      r.push((65536 + ((p - 55296) << 10) + (c - 56320)).toString(16));
      p = 0;
    } else if (c >= 55296 && c <= 56319) {
      p = c;
    } else {
      r.push(c.toString(16));
    }
  }

  return r.join('-');
};

export const getIconCode = (char: string) => {
  return toCodePoint(!char.includes(U200D) ? char.replace(UFE0Fg, '') : char);
};

export const loadEmoji = (code: string) => {
  if (code in emojiCache) return emojiCache[code];

  return (emojiCache[code] = fetch(
    `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${code.toLowerCase()}.svg`,
  ).then((r) => r.text()));
};
