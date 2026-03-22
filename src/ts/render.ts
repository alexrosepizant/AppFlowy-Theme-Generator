import { COLOR_GROUPS } from "./data";
import { state, syncTints } from "./state";
import { updatePreview } from "./preview";
import { el } from "./utils";
import type { ColorDef } from "./types";

export function renderGroups(): void {
  const container = el("colorGroups");
  container.innerHTML = "";

  for (const group of COLOR_GROUPS) {
    const groupEl = document.createElement("div");
    groupEl.className = "mb-6";
    groupEl.innerHTML = `
      <div class="flex items-center gap-2 mb-2">
        <div class="font-semibold text-[12px] text-[#101012]">${group.label}</div>
        ${group.badge ? `<span class="font-mono text-[10px] px-1.5 py-0.5 rounded-sm ${group.badge.cls}">${group.badge.text}</span>` : ""}
      </div>`;
    for (const def of group.colors) groupEl.appendChild(buildRow(def));
    container.appendChild(groupEl);
  }
}

function buildRow([key, label, desc, , , style]: ColorDef): HTMLElement {
  const entry = state[key];
  if (!entry) throw new Error(`Unknown color key: "${key}"`);
  const { hex } = entry;

  const base =
    "flex items-center gap-3 mb-2 py-2.5 px-3 rounded-xl border transition-colors duration-[150ms]";
  const variant =
    style === "accent"
      ? "bg-[#8427E0]/5 border-[#8427E0]/15"
      : style === "sidebar"
        ? "bg-[#7edaa8]/5 border-[#7edaa8]/20"
        : "bg-[#F9F9FC] border-transparent hover:border-[#9327ff]/15";

  const row = document.createElement("div");
  row.className = `${base} ${variant}`;
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

export function bindColorEvents(): void {
  const container = el("colorGroups");

  container.addEventListener("change", (e) => {
    const input = e.target as HTMLInputElement;
    if (input.type !== "color") return;
    const { key } = input.dataset as { key?: string };
    const entry = key ? state[key] : null;
    if (!key || !entry) return;

    entry.hex = input.value;
    el(`sw_${key}`).style.background = input.value;
    el<HTMLInputElement>(`hi_${key}`).value = input.value.toUpperCase();
    if (key === "main") syncTints();
    updatePreview();
  });

  container.addEventListener("input", (e) => {
    const input = e.target as HTMLInputElement;
    if (!input.classList.contains("hex-input")) return;
    const { key } = input.dataset as { key?: string };
    const entry = key ? state[key] : null;
    if (!key || !entry) return;

    let value = input.value.trim();
    if (!value.startsWith("#")) value = "#" + value;
    if (!/^#[0-9a-fA-F]{6}$/.test(value)) return;

    entry.hex = value;
    const swatch = el(`sw_${key}`);
    swatch.style.background = value;
    const picker = swatch.querySelector<HTMLInputElement>("input[type=color]");
    if (picker) picker.value = value;
    if (key === "main") syncTints();
    updatePreview();
  });
}
