import { COLOR_GROUPS } from "./data";
import type { ColorEntry, ColorState } from "./types";

export const state: ColorState = {};

for (const group of COLOR_GROUPS) {
  for (const [key, , , hex, opacity] of group.colors) {
    state[key] = { hex, opacity };
  }
}

export function getColor(key: string): ColorEntry {
  const entry = state[key];
  if (!entry) throw new Error(`Unknown color: "${key}"`);
  return entry;
}

export function syncTints(): void {
  const main = state["main"];
  if (!main) return;
  for (let i = 1; i <= 9; i++) {
    const tint = state[`tint${i}`];
    if (tint) tint.hex = main.hex;
  }
}
