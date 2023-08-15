import type { ColourHex } from "../types";

export function getFill(hex: string) {
	const { h, s, l } = hexToHsl(hex);
	const newH = Math.max(0, h - 10);
	const newS = Math.min(100, s + 10);
	const newL = Math.min(100, l + 40);
	const fill = hslToHex({ h: newH, s: newS, l: newL });
	return fill as ColourHex;
}

function hexToHsl(hex: string) {
	const RGB = hexToRgb(hex);
	if (!RGB) throw Error("Invalid hex");
	const hsl = rgbToHsl(RGB);
	return hsl;
}

function hslToHex(hsl: { h: number, s: number, l: number }) {
	const RGB = hslToRgb(hsl);
	const hex = rgbToHex(RGB);
	return hex;
}

function hexToRgb(hex: string) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.toUpperCase());
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

function rgbToHex(rgb: { r: number, g: number, b: number }) {
	return "#" + (1 << 24 | rgb.r << 16 | rgb.g << 8 | rgb.b).toString(16).slice(1).toUpperCase();
}

function hueToRgb(v1: number, v2: number, vH: number) {
	if (vH < 0) vH += 1
	if (vH > 1) vH -= 1
	if ((6 * vH) < 1) return (v1 + (v2 - v1) * 6 * vH)
	if ((2 * vH) < 1) return (v2)
	if ((3 * vH) < 2) return (v1 + (v2 - v1) * ((2 / 3) - vH) * 6)
	return v1;
}

// https://www.easyrgb.com/en/math.php
function rgbToHsl(rgb: { r: number, g: number, b: number }) {
	rgb.r /= 255;
	rgb.g /= 255;
	rgb.b /= 255;

	const min = Math.min(rgb.r, rgb.g, rgb.b);
	const max = Math.max(rgb.r, rgb.g, rgb.b);
	const delta = max - min;
	const L = (max + min) / 2;

	let H = 0, S = 0, R = 0, G = 0, B = 0;

	if (delta !== 0) {
		if (L < 0.5) S = delta / (max + min);
		else S = delta / (2 - max - min);

		R = (((max - rgb.r) / 6) + (delta / 2)) / delta;
		G = (((max - rgb.g) / 6) + (delta / 2)) / delta;
		B = (((max - rgb.b) / 6) + (delta / 2)) / delta;

		if (rgb.r == max) H = B - G;
		else if (rgb.g == max) H = (1 / 3) + R - B;
		else if (rgb.b == max) H = (2 / 3) + G - R;

		if (H < 0) H += 1;
		if (H > 1) H -= 1;
	}

	return {
		h: H * 360,
		s: S * 100,
		l: L * 100
	}
}

function hslToRgb(hsl: { h: number, s: number, l: number }) {
	hsl.h /= 360;
	hsl.s /= 100;
	hsl.l /= 100;

	let R = 0, G = 0, B = 0;
	if (hsl.s == 0) {
		R = hsl.l * 255
		G = hsl.l * 255
		B = hsl.l * 255
	}
	else {
		let v2 = 0;
		if (hsl.l < 0.5) v2 = hsl.l * (1 + hsl.s)
		else v2 = (hsl.l + hsl.s) - (hsl.s * hsl.l)

		let v1 = 2 * hsl.l - v2

		R = 255 * hueToRgb(v1, v2, hsl.h + (1 / 3));
		G = 255 * hueToRgb(v1, v2, hsl.h);
		B = 255 * hueToRgb(v1, v2, hsl.h - (1 / 3));
	}

	return {
		r: R,
		g: G,
		b: B
	}
}