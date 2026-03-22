import { el, rgba } from "./utils";
import { getColor } from "./state";

export function updatePreview(): void {
  const c = (key: string) => getColor(key).hex;

  el("mockSidebar").style.background = c("sidebarBg");
  el("mockSidebar").style.color = c("text");
  el("mockSidebarHeader").style.color = c("strongText");

  el("mockItem1").style.background = rgba(c("main"), 0.12);
  el("mockItem1").style.color = c("main");
  for (const id of ["mockSearch", "mockItem2", "mockItem3"]) {
    el(id).style.background = "transparent";
    el(id).style.color = c("text");
  }

  el("mockContent").style.background = c("surface");
  el("mockContentTop").style.color = c("text");
  el("mockPageTitle").style.color = c("text");
  el("mockContextLabel").style.color = c("secondaryText");
  el("mockHeading").style.color = c("strongText");
  el("mockText").style.color = c("text");

  el("mockFooterLinks").style.color = rgba(c("text"), 0.65);

  el("mockTodoLabel").style.color = c("strongText");
  el("mockNotice").style.color = c("text");
  el("mockTodoRow2").style.color = c("text");
  const cbBorder = rgba(c("text"), 0.35);
  el("mockTodoCheckbox1").style.borderColor = cbBorder;
  el("mockTodoCheckbox2").style.borderColor = cbBorder;
}
