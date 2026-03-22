import JSZip from "jszip";
import { state } from "./state";

function toARGB(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const a = Math.round((opacity / 100) * 255);
  const h = (n: number) => n.toString(16).padStart(2, "0").toUpperCase();
  return `0x${h(a)}${h(r)}${h(g)}${h(b)}`;
}

function cf(key: string): string {
  const entry = state[key];
  if (!entry) throw new Error(`Unknown color: "${key}"`);
  return toARGB(entry.hex, entry.opacity);
}

function buildThemeJSON(): Record<string, string> {
  const main = state["main"]?.hex ?? "#00BCF0";
  return {
    surface: cf("surface"),
    sidebarBg: cf("sidebarBg"),
    topbarBg: cf("topbarBg"),
    input: cf("input"),
    toolbarColor: cf("input"),
    shader1: cf("topbarBg"),
    shader2: cf("surface"),
    shader3: cf("divider"),
    shader4: toARGB("#505469", 100),
    shader5: cf("text"),
    shader6: toARGB("#F2F2F2", 100),
    shader7: cf("white"),
    bg1: cf("surface"),
    bg2: toARGB("#EDEEF2", 100),
    bg3: cf("main"),
    bg4: toARGB("#2C144B", 100),
    main1: cf("main"),
    main2: cf("main"),
    primary: cf("main"),
    hover: cf("main"),
    selector: toARGB(main, 12),
    onPrimary: cf("topbarBg"),
    text: cf("text"),
    secondaryText: cf("secondaryText"),
    strongText: cf("strongText"),
    hint: cf("hint"),
    icon: cf("icon"),
    hoverBG1: cf("hoverBG1"),
    hoverBG2: cf("hoverBG2"),
    hoverBG3: toARGB("#ffffff", 2),
    hoverFG: cf("hoverFG"),
    borderColor: cf("border"),
    divider: cf("divider"),
    shadow: cf("shadow"),
    questionBubbleBG: toARGB(main, 12),
    progressBarBGColor: cf("divider"),
    toggleButtonBGColor: toARGB("#828282", 100),
    calendarWeekendBGColor: cf("topbarBg"),
    gridRowCountColor: cf("text"),
    scrollbarColor: toARGB("#ffffff", 25),
    scrollbarHoverColor: toARGB("#ffffff", 50),
    lightIconColor: toARGB("#8F959E", 100),
    toolbarHoverColor: toARGB("#F2F2F2", 100),
    tint1: toARGB(main, 10),
    tint2: toARGB(main, 20),
    tint3: toARGB(main, 30),
    tint4: toARGB(main, 40),
    tint5: toARGB(main, 50),
    tint6: toARGB(main, 60),
    tint7: toARGB(main, 70),
    tint8: toARGB(main, 80),
    tint9: toARGB(main, 90),
    red: cf("red"),
    yellow: cf("yellow"),
    green: cf("green"),
  };
}

export async function downloadTheme(name: string): Promise<void> {
  const json = JSON.stringify(buildThemeJSON(), null, 2);
  const zip = new JSZip();
  const folder = zip.folder(`${name}.flowy_plugin`);
  if (!folder) throw new Error("Failed to create zip folder");

  folder.file(`${name}.dark.json`, json);
  folder.file(`${name}.light.json`, json);

  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}.flowy_plugin.zip`;
  a.click();
  URL.revokeObjectURL(url);
}
