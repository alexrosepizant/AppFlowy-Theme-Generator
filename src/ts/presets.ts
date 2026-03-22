import { state, syncTints } from "./state";
import { renderGroups, bindColorEvents } from "./render";
import { updatePreview } from "./preview";
import monochrome from "../presets/monochrome.json";
import monochromeLight from "../presets/monochrome-light.json";
import dracula from "../presets/dracula.json";
import notionLight from "../presets/notion-light.json";
import notionDark from "../presets/notion-dark.json";
import minimalNotion from "../presets/minimal-notion.json";
import developerDark from "../presets/developer-dark.json";
import developerLight from "../presets/developer-light.json";

interface PresetColors {
  surface: { hex: string; opacity: number };
  sidebarBg: { hex: string; opacity: number };
  topbarBg: { hex: string; opacity: number };
  input: { hex: string; opacity: number };
  main: { hex: string; opacity: number };
  text: { hex: string; opacity: number };
  secondaryText: { hex: string; opacity: number };
  strongText: { hex: string; opacity: number };
  hint: { hex: string; opacity: number };
  icon: { hex: string; opacity: number };
  white: { hex: string; opacity: number };
  hoverBG1: { hex: string; opacity: number };
  hoverBG2: { hex: string; opacity: number };
  hoverFG: { hex: string; opacity: number };
  divider: { hex: string; opacity: number };
  border: { hex: string; opacity: number };
  shadow: { hex: string; opacity: number };
  red: { hex: string; opacity: number };
  yellow: { hex: string; opacity: number };
  green: { hex: string; opacity: number };
}

export interface PresetTheme {
  id: string;
  label: string;
  dark: boolean;
  accent: string;
  colors: PresetColors;
}

export const PRESETS: PresetTheme[] = [
  monochrome,
  monochromeLight,
  dracula,
  notionLight,
  notionDark,
  minimalNotion,
  developerDark,
  developerLight,
];

export function loadPreset(id: string): void {
  const preset = PRESETS.find((p) => p.id === id);
  if (!preset) return;

  for (const [key, entry] of Object.entries(preset.colors)) {
    const current = state[key];
    if (current) {
      current.hex = entry.hex;
      current.opacity = entry.opacity;
    }
  }

  if (state["selector"] && state["main"]) {
    state["selector"].hex = state["main"].hex;
    state["selector"].opacity = 12;
  }

  syncTints();
  renderGroups();
  bindColorEvents();
  updatePreview();
}
