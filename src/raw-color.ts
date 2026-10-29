import Color from "color";
import { RawHSL, RawRGB } from "./animated-values";

export function rawRGBToHex({ r, g, b }: RawRGB): string {
  return Color({ r, g, b }).hex() as string;
}

export function rawHSLToHex({ h, s, l }: RawHSL): string {
  return Color({ h, s, l }).hex() as string;
}
