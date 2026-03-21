import type { ColorGroup } from "./types";

/**
 * All colour groups displayed in the generator UI.
 *
 * Each colour entry is a tuple: [key, label, desc, hex, opacity, style?]
 *   - key      : internal identifier (matches AppFlowy JSON keys)
 *   - label    : displayed name
 *   - desc     : short description of the colour's role
 *   - hex      : default value (#rrggbb)
 *   - opacity  : opacity in % (0–100) used when exporting as ARGB
 *   - style    : 'accent' | 'sidebar' | undefined — controls visual highlight
 */
export const COLOR_GROUPS: ColorGroup[] = [
  {
    label: "Accent & Selection",
    badge: { text: "JSON-controlled", cls: "bg-[#a8c5ff]/15 text-[#a8c5ff]" },
    colors: [
      [
        "main",
        "Accent colour",
        "Active sidebar items, links, selected icons, tints",
        "#a8c5ff",
        100,
        "accent",
      ],
      [
        "selector",
        "Selection background",
        "Background of the selected sidebar item",
        "#a8c5ff",
        12,
        "accent",
      ],
    ],
  },
  {
    label: "Sidebar",
    badge: { text: "JSON-controlled", cls: "bg-[#7edaa8]/15 text-[#7edaa8]" },
    colors: [
      [
        "bg",
        "Sidebar background",
        "Background of the entire side panel",
        "#111113",
        100,
        "sidebar",
      ],
      [
        "sidebarContainerBGColor",
        "Section background",
        "Background of page groups in the sidebar",
        "#0e0e11",
        100,
        "sidebar",
      ],
    ],
  },
  {
    label: "Editor Backgrounds",
    colors: [
      [
        "surface",
        "Editor surface",
        "Background of the content / editor area",
        "#171719",
        100,
      ],
      [
        "toolbarColor",
        "Floating toolbar",
        "Background of the formatting toolbar",
        "#1f1f24",
        100,
      ],
    ],
  },
  {
    label: "Text",
    colors: [
      ["strongText", "Strong text", "Headings, main content", "#e8e8f0", 100],
      ["text", "Body text", "Body copy", "#b8b8c8", 100],
      [
        "secondaryText",
        "Secondary text",
        "Metadata, subtitles, labels",
        "#6b6b80",
        100,
      ],
      ["hint", "Placeholder", "Empty field text", "#45455a", 100],
    ],
  },
  {
    label: "Hover & Interactions",
    colors: [
      ["hoverBG1", "Hover background 1", "Item hover (primary)", "#ffffff", 6],
      [
        "hoverBG2",
        "Hover background 2",
        "Item hover (secondary)",
        "#ffffff",
        4,
      ],
      ["hoverFG", "Hover text", "Text on hover", "#e8e8f0", 100],
    ],
  },
  {
    label: "Separators & Borders",
    colors: [
      ["divider", "Divider", "Separator lines", "#2a2a35", 100],
      ["border", "Component border", "Field and card borders", "#2a2a35", 100],
      ["borderGray", "Grey border", "Secondary borders", "#383848", 100],
      ["shadow", "Shadow", "Shadow of floating menus", "#000000", 40],
    ],
  },
  {
    label: "Icons",
    colors: [
      ["icon", "Default icon", "Default icon colour", "#8888a0", 100],
      [
        "white",
        "Inverted icon",
        "Icons on coloured backgrounds",
        "#e8e8f0",
        100,
      ],
    ],
  },
  {
    label: "Tags & Semantic Colours",
    colors: [
      [
        "taginlineBg",
        "Inline tag background",
        "Background of in-editor tags",
        "#a8c5ff",
        15,
      ],
      ["red", "Red", "Error, danger", "#ff6b6b", 100],
      ["orange", "Orange", "Warning", "#ff9f43", 100],
      ["yellow", "Yellow", "", "#ffd32a", 100],
      ["lime", "Lime", "", "#a3cb38", 100],
      ["green", "Green", "Success", "#4ade80", 100],
      ["aqua", "Aqua", "", "#48dbfb", 100],
      ["blue", "Blue", "Link", "#54a0ff", 100],
      ["purple", "Purple", "", "#a29bfe", 100],
      ["pink", "Pink", "", "#fd79a8", 100],
      ["brown", "Brown", "", "#b8860b", 100],
    ],
  },
  {
    label: "Tint Scale tint1–9 (derived from accent)",
    colors: [
      ["tint1", "Tint 1", "10% opacity of 'main'", "#a8c5ff", 10],
      ["tint2", "Tint 2", "", "#a8c5ff", 20],
      ["tint3", "Tint 3", "", "#a8c5ff", 30],
      ["tint4", "Tint 4", "", "#a8c5ff", 40],
      ["tint5", "Tint 5", "", "#a8c5ff", 50],
      ["tint6", "Tint 6", "", "#a8c5ff", 60],
      ["tint7", "Tint 7", "", "#a8c5ff", 70],
      ["tint8", "Tint 8", "", "#a8c5ff", 80],
      ["tint9", "Tint 9", "", "#a8c5ff", 90],
    ],
  },
];
