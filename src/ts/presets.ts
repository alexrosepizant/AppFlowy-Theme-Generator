import { state, syncTints } from "./state";
import { renderGroups, bindColorEvents } from "./render";
import { updatePreview } from "./preview";

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
  {
    id: "dracula",
    label: "Dracula",
    dark: true,
    accent: "#8be9fd",
    colors: {
      surface: { hex: "#282a36", opacity: 100 },
      sidebarBg: { hex: "#282a36", opacity: 100 },
      topbarBg: { hex: "#282a36", opacity: 100 },
      input: { hex: "#282e3a", opacity: 100 },
      main: { hex: "#8be9fd", opacity: 100 },
      text: { hex: "#f8f8f2", opacity: 100 },
      secondaryText: { hex: "#f8f8f2", opacity: 100 },
      strongText: { hex: "#f8f8f2", opacity: 100 },
      hint: { hex: "#f8f8f2", opacity: 50 },
      icon: { hex: "#f8f8f2", opacity: 100 },
      white: { hex: "#f8f8f2", opacity: 100 },
      hoverBG1: { hex: "#8be9fd", opacity: 100 },
      hoverBG2: { hex: "#8be9fd", opacity: 100 },
      hoverFG: { hex: "#131720", opacity: 100 },
      divider: { hex: "#6272a4", opacity: 100 },
      border: { hex: "#363d49", opacity: 100 },
      shadow: { hex: "#0f131c", opacity: 100 },
      red: { hex: "#ff5555", opacity: 100 },
      yellow: { hex: "#f1fa8c", opacity: 100 },
      green: { hex: "#50fa7b", opacity: 100 },
    },
  },
  {
    id: "notion-light",
    label: "Notion Light",
    dark: false,
    accent: "#4d84ff",
    colors: {
      surface: { hex: "#f9f9f9", opacity: 100 },
      sidebarBg: { hex: "#eaeaea", opacity: 100 },
      topbarBg: { hex: "#f9f9f9", opacity: 100 },
      input: { hex: "#f4f4f4", opacity: 100 },
      main: { hex: "#4d84ff", opacity: 100 },
      text: { hex: "#3e3e3e", opacity: 100 },
      secondaryText: { hex: "#6e6e6e", opacity: 100 },
      strongText: { hex: "#3e3e3e", opacity: 100 },
      hint: { hex: "#9c9c9c", opacity: 100 },
      icon: { hex: "#3e3e3e", opacity: 100 },
      white: { hex: "#909090", opacity: 100 },
      hoverBG1: { hex: "#e1e1e1", opacity: 100 },
      hoverBG2: { hex: "#d1d1d1", opacity: 100 },
      hoverFG: { hex: "#3e3e3e", opacity: 100 },
      divider: { hex: "#dcdcdc", opacity: 100 },
      border: { hex: "#d1d1d1", opacity: 100 },
      shadow: { hex: "#000000", opacity: 10 },
      red: { hex: "#f28b82", opacity: 100 },
      yellow: { hex: "#f9e788", opacity: 100 },
      green: { hex: "#6dbb6d", opacity: 100 },
    },
  },
  {
    id: "notion-dark",
    label: "Notion Dark",
    dark: true,
    accent: "#68c3ff",
    colors: {
      surface: { hex: "#1f1f1f", opacity: 100 },
      sidebarBg: { hex: "#292929", opacity: 100 },
      topbarBg: { hex: "#1f1f1f", opacity: 100 },
      input: { hex: "#333333", opacity: 100 },
      main: { hex: "#68c3ff", opacity: 100 },
      text: { hex: "#e5e5e5", opacity: 100 },
      secondaryText: { hex: "#a5a5a5", opacity: 100 },
      strongText: { hex: "#e5e5e5", opacity: 100 },
      hint: { hex: "#868686", opacity: 100 },
      icon: { hex: "#e5e5e5", opacity: 100 },
      white: { hex: "#7a7a7a", opacity: 100 },
      hoverBG1: { hex: "#40405a", opacity: 100 },
      hoverBG2: { hex: "#4a4a65", opacity: 100 },
      hoverFG: { hex: "#e5e5e5", opacity: 100 },
      divider: { hex: "#3c3c3c", opacity: 100 },
      border: { hex: "#434343", opacity: 100 },
      shadow: { hex: "#000000", opacity: 16 },
      red: { hex: "#f28b82", opacity: 100 },
      yellow: { hex: "#f9e788", opacity: 100 },
      green: { hex: "#6dbb6d", opacity: 100 },
    },
  },
  {
    id: "minimal-notion",
    label: "Minimal",
    dark: false,
    accent: "#7e8ec2",
    colors: {
      surface: { hex: "#ffffff", opacity: 100 },
      sidebarBg: { hex: "#f8f8f2", opacity: 100 },
      topbarBg: { hex: "#f8f8f2", opacity: 100 },
      input: { hex: "#f8f8f2", opacity: 100 },
      main: { hex: "#7e8ec2", opacity: 100 },
      text: { hex: "#3c4043", opacity: 100 },
      secondaryText: { hex: "#5f6368", opacity: 100 },
      strongText: { hex: "#3c4043", opacity: 100 },
      hint: { hex: "#828282", opacity: 100 },
      icon: { hex: "#3c4043", opacity: 100 },
      white: { hex: "#555555", opacity: 100 },
      hoverBG1: { hex: "#c5c8de", opacity: 75 },
      hoverBG2: { hex: "#c5c8de", opacity: 75 },
      hoverFG: { hex: "#555555", opacity: 100 },
      divider: { hex: "#e0e0e0", opacity: 100 },
      border: { hex: "#828282", opacity: 100 },
      shadow: { hex: "#000000", opacity: 15 },
      red: { hex: "#ff6e6e", opacity: 100 },
      yellow: { hex: "#e9f284", opacity: 100 },
      green: { hex: "#69ff94", opacity: 100 },
    },
  },
  {
    id: "developer-dark",
    label: "Developer",
    dark: true,
    accent: "#68c3ff",
    colors: {
      surface: { hex: "#121212", opacity: 100 },
      sidebarBg: { hex: "#1e1e1e", opacity: 100 },
      topbarBg: { hex: "#121212", opacity: 100 },
      input: { hex: "#333333", opacity: 100 },
      main: { hex: "#68c3ff", opacity: 100 },
      text: { hex: "#e5e5e5", opacity: 100 },
      secondaryText: { hex: "#a5a5a5", opacity: 100 },
      strongText: { hex: "#e5e5e5", opacity: 100 },
      hint: { hex: "#868686", opacity: 100 },
      icon: { hex: "#e5e5e5", opacity: 100 },
      white: { hex: "#e5e5e5", opacity: 100 },
      hoverBG1: { hex: "#3e3e3e", opacity: 100 },
      hoverBG2: { hex: "#4a4a4a", opacity: 100 },
      hoverFG: { hex: "#121212", opacity: 100 },
      divider: { hex: "#3d3d3d", opacity: 100 },
      border: { hex: "#4a4a4a", opacity: 100 },
      shadow: { hex: "#000000", opacity: 16 },
      red: { hex: "#d14343", opacity: 100 },
      yellow: { hex: "#d1d15b", opacity: 100 },
      green: { hex: "#7bd76d", opacity: 100 },
    },
  },
  {
    id: "developer-light",
    label: "Dev Light",
    dark: false,
    accent: "#3d92f1",
    colors: {
      surface: { hex: "#f4f4f4", opacity: 100 },
      sidebarBg: { hex: "#e1e1e1", opacity: 100 },
      topbarBg: { hex: "#f4f4f4", opacity: 100 },
      input: { hex: "#f0f0f0", opacity: 100 },
      main: { hex: "#3d92f1", opacity: 100 },
      text: { hex: "#333333", opacity: 100 },
      secondaryText: { hex: "#666666", opacity: 100 },
      strongText: { hex: "#333333", opacity: 100 },
      hint: { hex: "#a1a1a1", opacity: 100 },
      icon: { hex: "#333333", opacity: 100 },
      white: { hex: "#363636", opacity: 100 },
      hoverBG1: { hex: "#e5e5e5", opacity: 100 },
      hoverBG2: { hex: "#d4d4d4", opacity: 100 },
      hoverFG: { hex: "#333333", opacity: 100 },
      divider: { hex: "#d1d1d1", opacity: 100 },
      border: { hex: "#c4c4c4", opacity: 100 },
      shadow: { hex: "#000000", opacity: 10 },
      red: { hex: "#f14c4c", opacity: 100 },
      yellow: { hex: "#f4d14c", opacity: 100 },
      green: { hex: "#4dbf6e", opacity: 100 },
    },
  },
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
