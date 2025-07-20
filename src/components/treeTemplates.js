// FamilyTree template and UI customization
import FamilyTree from "@balkangraph/familytree.js";

export function setupTreeTemplates() {
  FamilyTree.SEARCH_PLACEHOLDER = "Buscar persona...";
  FamilyTree.filterUI.textFilterBy = "Filtrar por";
  FamilyTree.filterUI.all = "[Todos]";
  FamilyTree.filterUI.clear = "Limpiar filtro";

  // Custom template min view
  if (!FamilyTree.templates.hugo.min) {
    const base = FamilyTree.templates.hugo;
    const min = { ...base };
    min.size = [250, 60];
    min.field_0 =
      '<text data-width="230" style="font-size: 18px;" fill="#fff" x="125" y="40" text-anchor="middle">{val}</text>';
    min.field_1 = "";
    min.field_2 = "";
    FamilyTree.templates.hugo.min = min;
  }

  // Main template fields
  FamilyTree.templates.hugo.field_0 =
    '<text data-width="230" style="font-size: 18px;" fill="#fff" x="125" y="40" text-anchor="middle">{val}</text>';
  FamilyTree.templates.hugo.field_1 =
    '<text data-width="230" style="font-size: 16px;" fill="#fff" x="125" y="65" text-anchor="middle">{val}</text>';
  FamilyTree.templates.hugo.field_2 =
    '<text data-width="230" style="font-size: 14px;" fill="#fff" x="125" y="90" text-anchor="middle">Linea descendiente: {val}</text>';

  FamilyTree.templates.hugo.nodeCircleMenuButton = {
    radius: 25,
    x: 230,
    y: 60,
    color: '#fff',
    stroke: '#aeaeae'
  };
}
