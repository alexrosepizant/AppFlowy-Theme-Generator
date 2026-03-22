import { renderGroups, bindColorEvents } from "./render";
import { updatePreview } from "./preview";
import { downloadTheme } from "./export";
import { PRESETS, loadPreset } from "./presets";
import { el } from "./utils";

function showToast(message: string): void {
  const toast = el("toast");
  toast.textContent = message;
  toast.classList.add("visible");
  setTimeout(() => toast.classList.remove("visible"), 3000);
}

async function fetchGitHubStars(): Promise<void> {
  try {
    const res = await fetch("https://api.github.com/repos/alexrosepizant/AppFlowy-Theme-Generator");
    if (!res.ok) return;
    const data = (await res.json()) as { stargazers_count?: number };
    const count = data.stargazers_count;
    if (typeof count !== "number") return;
    const label = count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count);
    const node = document.getElementById("ghStarsCount");
    if (node) node.textContent = label;
  } catch {
    // offline — silently ignore
  }
}

let activePresetId: string | null = null;

function renderPresets(): void {
  const container = el("presetPills");
  container.innerHTML = "";

  const darkPresets = PRESETS.filter((p) => p.dark);
  const lightPresets = PRESETS.filter((p) => !p.dark);

  const groups = [
    { label: "Dark", items: darkPresets },
    { label: "Light", items: lightPresets },
  ];

  for (const group of groups) {
    const groupEl = document.createElement("div");
    groupEl.className = "flex items-center gap-2 flex-wrap";

    const labelEl = document.createElement("span");
    labelEl.className =
      "text-[10px] font-semibold text-[#6F748C] uppercase tracking-wide w-full mt-1 first:mt-0";
    labelEl.textContent = group.label;
    groupEl.appendChild(labelEl);

    for (const preset of group.items) {
      const btn = document.createElement("button");
      btn.dataset.presetId = preset.id;
      btn.className =
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all duration-[150ms] " +
        "border-[#9327ff]/15 text-[#6F748C] hover:border-[#9327ff]/40 hover:text-[#101012] cursor-pointer";
      btn.innerHTML = `<span class="w-2.5 h-2.5 rounded-full shrink-0" style="background:${preset.accent}"></span>${preset.label}`;

      btn.addEventListener("click", () => {
        loadPreset(preset.id);
        activePresetId = preset.id;
        el<HTMLInputElement>("themeName").value = preset.label.replace(/\s+/g, "");
        document.querySelectorAll<HTMLButtonElement>("[data-preset-id]").forEach((b) => {
          const active = b.dataset.presetId === activePresetId;
          b.className = active
            ? "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all duration-[150ms] border-[#8427E0] text-[#8427E0] bg-[#8427E0]/5 cursor-pointer"
            : "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all duration-[150ms] border-[#9327ff]/15 text-[#6F748C] hover:border-[#9327ff]/40 hover:text-[#101012] cursor-pointer";
        });
      });

      groupEl.appendChild(btn);
    }

    container.appendChild(groupEl);
  }
}

renderGroups();
bindColorEvents();
updatePreview();
fetchGitHubStars();
renderPresets();

el("btnDownload").addEventListener("click", () => {
  const name = el<HTMLInputElement>("themeName").value.trim() || "MyTheme";
  downloadTheme(name)
    .then(() => showToast(`✓ ${name}.flowy_plugin.zip downloaded!`))
    .catch((err: unknown) => {
      throw err;
    });
});
