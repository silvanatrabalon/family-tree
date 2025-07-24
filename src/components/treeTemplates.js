// FamilyTree template and UI customization
import FamilyTree from "@balkangraph/familytree.js";

export function setupTreeTemplates() {
  FamilyTree.SEARCH_PLACEHOLDER = "Buscar persona...";
  FamilyTree.filterUI.textFilterBy = "Filtrar por";
  FamilyTree.filterUI.all = "[Todos]";
  FamilyTree.filterUI.clear = "Limpiar filtro";

FamilyTree.templates.base.defs = 
    `<g transform="matrix(1,0,0,1,0,0)" id="dot"><circle class="ba-fill" cx="0" cy="0" r="5" stroke="#aeaeae" stroke-width="1"></circle></g>
    <g id="base_node_menu" style="cursor:pointer;">
        <rect x="0" y="0" fill="transparent" width="22" height="22"></rect>
        <circle cx="4" cy="11" r="2" fill="#fff"></circle>
        <circle cx="11" cy="11" r="2" fill="#fff"></circle>
        <circle cx="18" cy="11" r="2" fill="#fff"></circle>
    </g>
    <g style="cursor: pointer;" id="base_tree_menu">
        <rect x="0" y="0" width="25" height="25" fill="transparent"></rect>
        ${FamilyTree.icon.addUser(13, 13, '#fff', 0, 0)}
    </g>
    <g style="cursor: pointer;" id="base_tree_menu_close">
        <circle cx="9" cy="9" r="10" fill="#aeaeae"></circle>
        ${FamilyTree.icon.close(18, 18, '#fff', 0, 0)}
    </g>            
    <g id="base_up">
        <circle cx="15" cy="15" r="15" fill="#fff" stroke="#aeaeae" stroke-width="1"></circle>
        ${FamilyTree.icon.ft(20,20,'#aeaeae', 5, 5)}
    </g>
`;
FamilyTree.templates.myTemplate = Object.assign({}, FamilyTree.templates.tommy);
FamilyTree.templates.myTemplate.size = [120, 200];
FamilyTree.templates.myTemplate_male = Object.assign({}, FamilyTree.templates.tommy);
FamilyTree.templates.myTemplate_male.size = [120, 200];
FamilyTree.templates.myTemplate_female = Object.assign({}, FamilyTree.templates.tommy);
FamilyTree.templates.myTemplate_female.size = [120, 200];

FamilyTree.templates.myTemplate_male.node = 
    `<rect x="0" y="0" height="{h}" width="{w}" stroke-width="1" fill="#039BE5" stroke="#aeaeae" rx="15" ry="15"></rect>`;
FamilyTree.templates.myTemplate_female.node = 
    `<rect x="0" y="0" height="{h}" width="{w}" stroke-width="1" fill="#F57C00" stroke="#aeaeae" rx="15" ry="15"></rect>`;


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

FamilyTree.templates.myTemplate.nodeTreeMenuCloseButton = 
FamilyTree.templates.myTemplate_male.nodeTreeMenuCloseButton = 
FamilyTree.templates.myTemplate_female.nodeTreeMenuCloseButton = 
    `<use ${'data-ctrl-n-t-menu-c'}="" x="5" y="5" xlink:href="#base_tree_menu_close" />`;

FamilyTree.templates.mother = Object.assign({}, FamilyTree.templates.base);
FamilyTree.templates.mother.up = '';
FamilyTree.templates.mother.size = [120, 120];
FamilyTree.templates.mother.node = 
    `<rect x="0" y="0" height="{h}" width="{w}" stroke-width="1" fill="#F57C00" stroke="#aeaeae" rx="15" ry="15"></rect>;
    <text data-width="118" data-text-overflow="ellipsis"  style="font-size: 18px; font-weight: bold" fill="#fff" x="59" y="190" text-anchor="middle">Madre</text>`;

FamilyTree.templates.father = Object.assign({}, FamilyTree.templates.base);
FamilyTree.templates.father.up = '';
FamilyTree.templates.father.size = [120, 120];
FamilyTree.templates.father.node = 
    `<rect x="0" y="0" height="{h}" width="{w}" stroke-width="1" fill="#039BE5" stroke="#aeaeae" rx="15" ry="15"></rect>;
    <text data-width="118" data-text-overflow="ellipsis"  style="font-size: 18px; font-weight: bold" fill="#fff" x="59" y="190" text-anchor="middle">Padre</text>`;

FamilyTree.templates.husband = Object.assign({}, FamilyTree.templates.base);
FamilyTree.templates.husband.up = '';
FamilyTree.templates.husband.size = [120, 120];
FamilyTree.templates.husband.node = 
    `<rect x="0" y="0" height="{h}" width="{w}" stroke-width="1" fill="#039BE5" stroke="#aeaeae" rx="15" ry="15"></rect>;
    <text data-width="118" data-text-overflow="ellipsis"  style="font-size: 18px; font-weight: bold" fill="#fff" x="59" y="190" text-anchor="middle">Agregar esposo</text>`;

FamilyTree.templates.son = Object.assign({}, FamilyTree.templates.base);
FamilyTree.templates.son.up = '';
FamilyTree.templates.son.size = [120, 120];
FamilyTree.templates.son.node = 
    `<rect x="0" y="0" height="{h}" width="{w}" stroke-width="1" fill="#039BE5" stroke="#aeaeae" rx="15" ry="15"></rect>;
    <text data-width="118" data-text-overflow="ellipsis"  style="font-size: 18px; font-weight: bold" fill="#fff" x="59" y="190" text-anchor="middle">Hijo</text>`;

FamilyTree.templates.daughter = Object.assign({}, FamilyTree.templates.base);
FamilyTree.templates.daughter.up = '';
FamilyTree.templates.daughter.size = [120, 120];
FamilyTree.templates.daughter.node = 
    `<rect x="0" y="0" height="{h}" width="{w}" stroke-width="1" fill="#F57C00" stroke="#aeaeae" rx="15" ry="15"></rect>;
    <text data-width="118" data-text-overflow="ellipsis"  style="font-size: 18px; font-weight: bold" fill="#fff" x="59" y="190" text-anchor="middle">Hija</text>`;

FamilyTree.templates.wife = Object.assign({}, FamilyTree.templates.base);
FamilyTree.templates.wife.up = '';
FamilyTree.templates.wife.size = [120, 200];
FamilyTree.templates.wife.node = 
    `<rect x="0" y="0" height="{h}" width="{w}" stroke-width="1" fill="#F57C00" stroke="#aeaeae" rx="15" ry="15"></rect>;
    <text data-width="118" data-text-overflow="ellipsis"  style="font-size: 18px; font-weight: bold" fill="#fff" x="59" y="190" text-anchor="middle">Esposa</text>`;

}
