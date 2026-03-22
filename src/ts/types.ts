export type ColorStyle = "accent" | "sidebar";

// [key, label, desc, hex, opacity, style?]
export type ColorDef = [
  key: string,
  label: string,
  desc: string,
  hex: string,
  opacity: number,
  style?: ColorStyle,
];

export interface ColorGroup {
  label: string;
  badge?: { text: string; cls: string };
  colors: ColorDef[];
}

export interface ColorEntry {
  hex: string;
  opacity: number;
}

export type ColorState = Record<string, ColorEntry>;
