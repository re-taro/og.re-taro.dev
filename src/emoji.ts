const U200D = String.fromCharCode(8205);
const UFE0Fg = /\uFE0F/g;
const emojiCache: Record<string, Promise<string>> = {};

function toCodePoint(unicodeSurrogates: string) {
	const r = [];
	let c = 0;
	let p = 0;
	let i = 0;

	while (i < unicodeSurrogates.length) {
		c = unicodeSurrogates.charCodeAt(i++);
		if (p) {
			r.push((65_536 + ((p - 55_296) << 10) + (c - 56_320)).toString(16));
			p = 0;
		}
		else if (c >= 55_296 && c <= 56_319) {
			p = c;
		}
		else {
			r.push(c.toString(16));
		}
	}

	return r.join("-");
}

export function getIconCode(char: string) {
	return toCodePoint(char.includes(U200D) ? char : char.replace(UFE0Fg, ""));
}

export function loadEmoji(code: string) {
	if (code in emojiCache)
		return emojiCache[code];

	return (emojiCache[code] = fetch(
		`https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.0.3/assets/svg${code.toLowerCase()}.svg`,
	).then(r => r.text()));
}
