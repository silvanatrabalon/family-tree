// FamilyTree template and UI customization
import FamilyTree from "@balkangraph/familytree.js";


export function setupTreeTemplates() {
  FamilyTree.SEARCH_PLACEHOLDER = "Buscar persona...";
  FamilyTree.filterUI.textFilterBy = "Filtrar por";
  FamilyTree.filterUI.all = "[Todos]";
  FamilyTree.filterUI.clear = "Limpiar filtro";

  FamilyTree.templates.myTemplate = Object.assign({}, FamilyTree.templates.tommy);
  FamilyTree.templates.myTemplate.size = [200, 90];
  FamilyTree.templates.myTemplate_male = Object.assign({}, FamilyTree.templates.tommy);
  FamilyTree.templates.myTemplate_male.size = [200, 90];
  FamilyTree.templates.myTemplate_female = Object.assign({}, FamilyTree.templates.tommy);
  FamilyTree.templates.myTemplate_female.size = [200, 90];

  FamilyTree.templates.myTemplate_male.node =
    `<rect x="0" y="0" height="{h}" width="{w}" stroke-width="1" fill="#039BE5" stroke="#aeaeae" rx="15" ry="15"></rect>`;
  FamilyTree.templates.myTemplate_female.node =
    `<rect x="0" y="0" height="{h}" width="{w}" stroke-width="1" fill="#675661ff" stroke="#aeaeae" rx="15" ry="15"></rect>`;


  FamilyTree.templates.myTemplate.field_0 =
    FamilyTree.templates.myTemplate_male.field_0 =
    FamilyTree.templates.myTemplate_female.field_0 =
    `<text data-width="110" data-text-overflow="ellipsis"  style="font-size: 18px; font-weight: bold" fill="#fff" x="59" y="190" text-anchor="middle">{val}</text>`;

  FamilyTree.templates.myTemplate.nodeTreeMenuButton =
    FamilyTree.templates.myTemplate_male.nodeTreeMenuButton =
    FamilyTree.templates.myTemplate_female.nodeTreeMenuButton =
    `<use ${'data-ctrl-n-t-menu-id'}="{id}" x="95" y="7" xlink:href="#base_tree_menu" />`;

  FamilyTree.templates.myTemplate.nodeMenuButton =
    FamilyTree.templates.myTemplate_male.nodeMenuButton =
    FamilyTree.templates.myTemplate_female.nodeMenuButton =
    `<use ${FamilyTree.attr.control_node_menu_id}="{id}" x="5" y="5" xlink:href="#base_node_menu" />`;



}
