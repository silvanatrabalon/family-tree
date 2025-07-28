import FamilyTree from "@balkangraph/familytree.js";
import { fetchNodesFromSheet } from "./components/events/api/fetchNode.js";

// NO ejecutar fetchNodesFromSheet aquí - se ejecutará en treeInit.js
const familyTreeData = {
  mode: "dark",
  nodes: [], // Inicializar vacío, se poblará en treeInit.js
  mouseScrool: FamilyTree.action.ctrlZoom,
  nodeBinding: {
    field_0: "nombre",
    field_1: "nacimiento",
    field_2: "Descendientes"
  },
  template: "myTemplate",
  filterBy: ['Descendientes'],
  toolbar: {
    zoom: true,
    fit: true,
  },
  menu: {
    pdf: { text: "Exportar documento PDF" },
    png: { text: "Exportar imagen PNG" },
  },
  enableEditForm: false, // Activa el formulario de edición desde el menú contextual o doble click
};

export { fetchNodesFromSheet, familyTreeData };
