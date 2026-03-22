import { renderGroups, bindColorEvents } from "./render";
import { updatePreview } from "./preview";
import { downloadTheme } from "./export";
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

renderGroups();
bindColorEvents();
updatePreview();
fetchGitHubStars();

el("btnDownload").addEventListener("click", () => {
  const name = el<HTMLInputElement>("themeName").value.trim() || "MyTheme";
  downloadTheme(name)
    .then(() => showToast(`✓ ${name}.flowy_plugin.zip downloaded!`))
    .catch((err: unknown) => {
      throw err;
    });
});
