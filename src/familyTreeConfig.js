import FamilyTree from "@balkangraph/familytree.js";
import { fetchNodesFromSheet } from "./components/events/api/fetchNode.js";
const nodes = await fetchNodesFromSheet();
const familyTreeData = {
  mode: 'dark',
  nodes,
  mouseScrool: FamilyTree.action.ctrlZoom,
  nodeBinding: {
    field_0: "nombre",
    field_1: "nacimiento",
    field_2: "Descendientes"
  },
  template: "myTemplate",
  nodeTreeMenu: true, // este es el icono add
  filterBy: ['Descendientes'],
  toolbar: {
    zoom: true,
    fit: true,
  },
  menu: {
    pdf: { text: "Exportar documento PDF" },
    png: { text: "Exportar imagen PNG" },
  },
  editForm: { // Configura cómo debe mostrarse y comportarse el formulario de edición
    titleBinding: "nombre",
    buttons: {
      edit: {
        icon: FamilyTree.icon.edit(24, 24, '#fff'),
        text: 'Edit',
        hideIfEditMode: true,
        hideIfDetailsMode: false
      },
    },
    generateElementsFromFields: false, // Te permite definir tú mismo los campos a mostrar
    elements: [ // Campos personalizados que el formulario mostrará
      { type: "textbox", label: "Nombre", binding: "nombre" },
      { type: "textbox", label: "Fecha de nacimiento", binding: "nacimiento" },
      { type: "textbox", label: "Descendientes", binding: "Descendientes" },
      { type: "textbox", label: "ID", binding: "id", readonly: true },
      { type: "textbox", label: "PID (Padre)", binding: "pid", readonly: true },
      { type: "textbox", label: "PIDs (Padres)", binding: "pids", readonly: true },
      // { type: "textbox", label: "Tags", binding: "tags" , readonly: true },
    ],
  },
  nodeMenu: {
    edit: { text: "Editar" },
    remove: { text: "Eliminar" }
  },
  // nodeCircleMenu: {
  //       PDFProfile: {
  //           icon: FamilyTree.icon.pdf(30, 30, '#aeaeae'),
  //           text: "PDF Profile",
  //           color: "white"
  //           },

  //           editNode: {
  //               icon: FamilyTree.icon.edit(30, 30, '#aeaeae'),
  //               text: "Edit node",
  //               color: "white"
  //           },
  //           addClink: {
  //               icon: FamilyTree.icon.link(30, 30, '#aeaeae'),
  //               text: "Add C link",
  //               color: '#fff',
  //               draggable: true
  //           },
  //   },

  enableEditForm: true, // Activa el formulario de edición desde el menú contextual o doble click
};

export { fetchNodesFromSheet, familyTreeData };
