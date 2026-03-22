import JSZip from "jszip";
import { COLOR_GROUPS } from "./data";
import type { ColorDef, ColorEntry, ColorState } from "./types";

// ─── State ─────────────────────────────────────────────────────────────────────

const state: ColorState = {};

COLOR_GROUPS.forEach((group) => {
  group.colors.forEach(([key, , , hex, opacity]) => {
    state[key] = { hex, opacity };
  });
});

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Returns an `rgba(r,g,b,a)` CSS string. */
function rgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/** Converts a hex colour + opacity% to AppFlowy's `0xAARRGGBB` integer string. */
function toAF(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const a = Math.round((opacity / 100) * 255);
  const h = (n: number): string =>
    n.toString(16).padStart(2, "0").toUpperCase();
  return `0x${h(a)}${h(r)}${h(g)}${h(b)}`;
}

/** Converts a state key to AppFlowy ARGB. Throws if the key is unknown. */
function cf(key: string): string {
  const entry = state[key];
  if (!entry) throw new Error(`Unknown colour key: "${key}"`);
  return toAF(entry.hex, entry.opacity);
}

/**
 * Returns a typed `HTMLElement` by id.
 * Throws at runtime if the element is missing (catches template mismatches early).
 */
function el<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Element #${id} not found in the DOM`);
  return element as T;
}

// ─── DOM rendering ─────────────────────────────────────────────────────────────

/** Rebuilds the entire colour-group list from COLOR_GROUPS. */
function renderGroups(): void {
  const container = el("colorGroups");
  container.innerHTML = "";

  COLOR_GROUPS.forEach((group) => {
    const groupEl = document.createElement("div");
    groupEl.className = "mb-6";
    groupEl.innerHTML = `
      <div class="flex items-center gap-2 mb-2">
        <div class="font-semibold text-[12px] text-[#101012]">${group.label}</div>
        ${group.badge ? `<span class="font-mono text-[10px] px-1.5 py-0.5 rounded-sm ${group.badge.cls}">${group.badge.text}</span>` : ""}
      </div>`;
    group.colors.forEach((def) => groupEl.appendChild(buildRow(def)));
    container.appendChild(groupEl);
  });
}

/** Builds a single colour row element. */
function buildRow([key, label, desc, , , style]: ColorDef): HTMLElement {
  const entry = state[key];
  if (!entry) throw new Error(`Unknown colour key: "${key}"`);

  const { hex } = entry;
  const BASE =
    "flex items-center gap-3 mb-2 py-2.5 px-3 rounded-xl border transition-colors duration-[150ms]";
  const variantClass =
    style === "accent"
      ? "bg-[#8427E0]/5 border-[#8427E0]/15"
      : style === "sidebar"
        ? "bg-[#7edaa8]/5 border-[#7edaa8]/20"
        : "bg-[#F9F9FC] border-transparent hover:border-[#9327ff]/15";

  const row = document.createElement("div");
  row.className = `${BASE} ${variantClass}`;
  row.innerHTML = `
    <div class="w-[30px] h-[30px] rounded-lg border border-black/10 cursor-pointer shrink-0 relative overflow-hidden"
         id="sw_${key}" style="background:${hex}">
      <input type="color" value="${hex}" data-key="${key}"
             class="opacity-0 absolute inset-0 w-full h-full cursor-pointer border-none p-0">
    </div>
    <div class="flex-1 min-w-0">
      <div class="font-medium text-[13px] text-[#101012] whitespace-nowrap overflow-hidden text-ellipsis">${label}</div>
      ${desc ? `<div class="text-[11px] text-[#6F748C] mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">${desc}</div>` : ""}
    </div>
    <input type="text" id="hi_${key}"
           class="hex-input font-mono text-[12px] bg-white border border-[#9327ff]/20 text-[#6F748C] rounded-lg px-2 py-1.5 w-[84px] text-center focus:outline-none focus:border-[#8427E0] focus:text-[#101012]"
           value="${hex.toUpperCase()}" data-key="${key}" maxlength="7">
  `;
  return row;
}

// ─── Event handlers ────────────────────────────────────────────────────────────

/** Handles a native colour-picker change. */
function onColorInput(input: HTMLInputElement): void {
  const key = input.dataset["key"];
  if (!key) return;

  const entry = state[key];
  if (!entry) return;

  entry.hex = input.value;
  el(`sw_${key}`).style.background = input.value;
  el<HTMLInputElement>(`hi_${key}`).value = input.value.toUpperCase();

  if (key === "main") syncTints();
  updatePreview();
}

/** Handles a manual hex-code text input. */
function onHexInput(input: HTMLInputElement): void {
  const key = input.dataset["key"];
  if (!key) return;

  let value = input.value.trim();
  if (!value.startsWith("#")) value = "#" + value;
  if (!/^#[0-9a-fA-F]{6}$/.test(value)) return;

  const entry = state[key];
  if (!entry) return;

  entry.hex = value;

  const swatch = el(`sw_${key}`);
  swatch.style.background = value;
  const picker = swatch.querySelector<HTMLInputElement>("input[type=color]");
  if (picker) picker.value = value;

  if (key === "main") syncTints();
  updatePreview();
}

/** Keeps tint1–9 in sync with the accent colour. */
function syncTints(): void {
  const main = state["main"];
  if (!main) return;
  for (let i = 1; i <= 9; i++) {
    const tint = state[`tint${i}`];
    if (tint) tint.hex = main.hex;
  }
}

// ─── Live preview ──────────────────────────────────────────────────────────────

/** Applies current state colours to all mock-app elements. */
function updatePreview(): void {
  // Helper: get a required colour entry by key
  const c = (key: string): ColorEntry => {
    const entry = state[key];
    if (!entry) throw new Error(`Unknown colour: "${key}"`);
    return entry;
  };

  // Sidebar
  el("mockSidebar").style.background = c("sidebarBg").hex;
  el("mockSidebar").style.color = c("text").hex;
  el("mockSidebarHeader").style.color = c("strongText").hex;

  // Active sidebar item
  const activeItem = el("mockItem1");
  activeItem.style.background = rgba(c("main").hex, 0.12);
  activeItem.style.color = c("main").hex;

  // Inactive sidebar items
  ["mockItem2", "mockItem3", "mockItem4"].forEach((id) => {
    const item = el(id);
    item.style.background = "transparent";
    item.style.color = c("text").hex;
  });

  // Avatar / username
  const avatar = el("mockAvatar");
  avatar.style.background = rgba(c("main").hex, 0.18);
  avatar.style.color = c("main").hex;
  el("mockUsername").style.color = c("secondaryText").hex;

  // Editor content
  el("mockContent").style.background = c("surface").hex;
  el("mockContentTop").style.color = c("text").hex;
  el("mockPageTitle").style.color = c("text").hex;
  el("mockHeading").style.color = c("strongText").hex;
  el("mockText").style.color = c("text").hex;

  // Tags
  const tagMap: [string, string][] = [
    ["mockTag1", "red"],
    ["mockTag2", "green"],
    ["mockTag3", "yellow"],
  ];
  tagMap.forEach(([id, key]) => {
    const tag = el(id);
    tag.style.background = rgba(c(key).hex, 0.15);
    tag.style.color = c(key).hex;
  });

  // Accent action button
  const btnAccent = el("mockBtnAccent");
  btnAccent.style.background = rgba(c("main").hex, 0.18);
  btnAccent.style.color = c("main").hex;

  // Ghost action button
  const btnGhost = el("mockBtnGhost");
  btnGhost.style.borderColor = rgba(c("main").hex, 0.3);
  btnGhost.style.color = c("secondaryText").hex;

  // Notice
  el("mockNotice").style.color = c("secondaryText").hex;
}

// ─── JSON export ───────────────────────────────────────────────────────────────

/** Builds the AppFlowy theme JSON object from the current state. */
function buildJSON(): Record<string, string> {
  const mainHex = state["main"]?.hex ?? "#00BCF0";
  return {
    // ── Surfaces ────────────────────────────────────────────────
    surface: cf("surface"),
    sidebarBg: cf("sidebarBg"),
    topbarBg: cf("topbarBg"),
    input: cf("input"),
    toolbarColor: cf("input"), // same source as input

    // ── Shader scale (derived from semantic colours) ─────────────
    shader1: cf("topbarBg"),
    shader2: cf("surface"),
    shader3: cf("divider"),
    shader4: toAF("#505469", 100),
    shader5: cf("text"),
    shader6: toAF("#F2F2F2", 100),
    shader7: cf("white"),

    // ── Background scale ─────────────────────────────────────────
    bg1: cf("surface"),
    bg2: toAF("#EDEEF2", 100),
    bg3: cf("main"),
    bg4: toAF("#2C144B", 100),

    // ── Accent ───────────────────────────────────────────────────
    main1: cf("main"),
    main2: cf("main"),
    primary: cf("main"),
    hover: cf("main"),
    selector: toAF(mainHex, 12),
    onPrimary: cf("topbarBg"),

    // ── Text ─────────────────────────────────────────────────────
    text: cf("text"),
    secondaryText: cf("secondaryText"),
    strongText: cf("strongText"),
    hint: cf("hint"),
    icon: cf("icon"),

    // ── Hover & interactions ──────────────────────────────────────
    hoverBG1: cf("hoverBG1"),
    hoverBG2: cf("hoverBG2"),
    hoverBG3: toAF("#ffffff", 2),
    hoverFG: cf("hoverFG"),

    // ── Borders & separators ──────────────────────────────────────
    borderColor: cf("border"),
    divider: cf("divider"),
    shadow: cf("shadow"),

    // ── Component-specific ───────────────────────────────────────
    questionBubbleBG: toAF(mainHex, 12),
    progressBarBGColor: cf("divider"),
    toggleButtonBGColor: toAF("#828282", 100),
    calendarWeekendBGColor: cf("topbarBg"),
    gridRowCountColor: cf("text"),
    scrollbarColor: toAF("#ffffff", 25),
    scrollbarHoverColor: toAF("#ffffff", 50),
    lightIconColor: toAF("#8F959E", 100),
    toolbarHoverColor: toAF("#F2F2F2", 100),

    // ── Tint scale (derived from accent) ─────────────────────────
    tint1: toAF(mainHex, 10),
    tint2: toAF(mainHex, 20),
    tint3: toAF(mainHex, 30),
    tint4: toAF(mainHex, 40),
    tint5: toAF(mainHex, 50),
    tint6: toAF(mainHex, 60),
    tint7: toAF(mainHex, 70),
    tint8: toAF(mainHex, 80),
    tint9: toAF(mainHex, 90),

    // ── Semantic colours ─────────────────────────────────────────
    red: cf("red"),
    yellow: cf("yellow"),
    green: cf("green"),
  };
}

// ─── Download ──────────────────────────────────────────────────────────────────

/** Generates and downloads the `.flowy_plugin.zip` archive. */
async function downloadTheme(): Promise<void> {
  const name = el<HTMLInputElement>("themeName").value.trim() || "MyTheme";
  const json = JSON.stringify(buildJSON(), null, 2);

  const zip = new JSZip();
  const folder = zip.folder(`${name}.flowy_plugin`);
  if (!folder) throw new Error("Failed to create zip folder");

  folder.file(`${name}.dark.json`, json);
  folder.file(`${name}.light.json`, json); // AppFlowy requires both variants

  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${name}.flowy_plugin.zip`;
  anchor.click();
  URL.revokeObjectURL(url);

  showToast(`✓ ${name}.flowy_plugin.zip downloaded!`);
}

/** Briefly shows a success toast notification. */
function showToast(message: string): void {
  const toast = el("toast");
  toast.textContent = message;
  toast.classList.add("visible");
  setTimeout(() => toast.classList.remove("visible"), 3000);
}

// ─── Init ──────────────────────────────────────────────────────────────────────

renderGroups();
updatePreview();

// Event delegation for dynamically generated colour rows (no inline handlers)
el("colorGroups").addEventListener("change", (e) => {
  const target = e.target as HTMLInputElement;
  if (target.type === "color") onColorInput(target);
});

el("colorGroups").addEventListener("input", (e) => {
  const target = e.target as HTMLInputElement;
  if (target.classList.contains("hex-input")) onHexInput(target);
});

el("btnDownload").addEventListener("click", () => {
  void downloadTheme();
});

// ─── GitHub stars ─────────────────────────────────────────────────────────────

fetch("https://api.github.com/repos/alexrosepizant/AppFlowy-Theme-Generator")
  .then((r) => r.json())
  .then((data: { stargazers_count?: number }) => {
    const count = data.stargazers_count;
    if (typeof count === "number") {
      const label =
        count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count);
      const el2 = document.getElementById("ghStarsCount");
      if (el2) el2.textContent = label;
    }
  })
  .catch(() => {
    /* silently ignore if offline */
  });
