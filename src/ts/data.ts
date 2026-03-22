import type { ColorGroup } from "./types";

export const COLOR_GROUPS: ColorGroup[] = [
  {
    label: "Accent & Selection",
    badge: { text: "JSON-controlled", cls: "bg-[#8427E0]/10 text-[#8427E0]" },
    colors: [
      [
        "main",
        "Accent colour",
        "Active sidebar items, links, selected icons, tints (main1 / main2)",
        "#e8e8e8",
        100,
        "accent",
      ],
      [
        "selector",
        "Selection background",
        "Background of the selected sidebar item (derived: accent @ 12%)",
        "#e8e8e8",
        12,
        "accent",
      ],
    ],
  },
  {
    label: "Sidebar",
    badge: { text: "JSON-controlled", cls: "bg-[#66CF80]/15 text-[#66CF80]" },
    colors: [
      [
        "sidebarBg",
        "Sidebar background",
        "Background of the entire side panel (sidebarBg)",
        "#0a0a0a",
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
        "Background of the content / editor area (surface / shader2 / bg1)",
        "#111111",
        100,
      ],
      [
        "topbarBg",
        "Top bar background",
        "Background of the top navigation bar (topbarBg / shader1)",
        "#080808",
        100,
      ],
      [
        "input",
        "Input background",
        "Background of text inputs and the floating toolbar (input / toolbarColor)",
        "#181818",
        100,
      ],
    ],
  },
  {
    label: "Text",
    colors: [
      ["strongText", "Strong text", "Headings, main content", "#ffffff", 100],
      ["text", "Body text", "Body copy (text / shader5)", "#909090", 100],
      ["secondaryText", "Secondary text", "Metadata, subtitles, labels", "#606060", 100],
      ["hint", "Placeholder", "Empty field text", "#3d3d3d", 100],
    ],
  },
  {
    label: "Hover & Interactions",
    colors: [
      ["hoverBG1", "Hover background 1", "Item hover — translucent white", "#ffffff", 10],
      ["hoverBG2", "Hover background 2", "Item hover — typically accent colour", "#e8e8e8", 100],
      ["hoverFG", "Hover text", "Text colour on hover", "#ffffff", 90],
    ],
  },
  {
    label: "Separators & Borders",
    colors: [
      ["divider", "Divider", "Separator lines (divider / shader3)", "#1a1a1a", 100],
      ["border", "Component border", "Field and card borders (borderColor)", "#202020", 100],
      ["shadow", "Shadow", "Shadow of floating menus", "#000000", 100],
    ],
  },
  {
    label: "Icons",
    colors: [
      ["icon", "Default icon", "Default icon colour (icon / shader5)", "#606060", 100],
      ["white", "Inverted / white icon", "Icons on coloured backgrounds (shader7)", "#ffffff", 100],
    ],
  },
  {
    label: "Semantic Colours",
    colors: [
      ["red", "Red", "Error, danger", "#ff3355", 100],
      ["yellow", "Yellow", "Warning", "#f5c800", 100],
      ["green", "Green", "Success", "#44cc70", 100],
    ],
  },
  {
    label: "Tint Scale tint1–9 (derived from accent)",
    colors: [
      ["tint1", "Tint 1", "10% opacity of 'main'", "#e8e8e8", 10],
      ["tint2", "Tint 2", "", "#e8e8e8", 20],
      ["tint3", "Tint 3", "", "#e8e8e8", 30],
      ["tint4", "Tint 4", "", "#e8e8e8", 40],
      ["tint5", "Tint 5", "", "#e8e8e8", 50],
      ["tint6", "Tint 6", "", "#e8e8e8", 60],
      ["tint7", "Tint 7", "", "#e8e8e8", 70],
      ["tint8", "Tint 8", "", "#e8e8e8", 80],
      ["tint9", "Tint 9", "", "#e8e8e8", 90],
    ],
  },
];
