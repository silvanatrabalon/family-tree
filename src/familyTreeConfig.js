import FamilyTree from "@balkangraph/familytree.js";

async function fetchNodesFromSheet() {
  const url = "https://sheets.googleapis.com/v4/spreadsheets/1_4ehjHFEK8IQEVo0JnyCYgEmbzNRl-Ez9aUpncANlRM/values/family-tree?alt=json&key=AIzaSyBDQFpGm89HcwUmzweaR4MQF04IWKvnXgk";
  const response = await fetch(url);
  const data = await response.json();
  const rows = data.values;
  const headers = rows[0];
  const nodes = rows.slice(1).map(row => {
    const node = {};
    headers.forEach((header, i) => {
      let value = row[i];
      // Parse arrays from string
      if (header === "pids" || header === "tags") {
        try {
          value = JSON.parse(value);
        } catch {
          value = [];
        }
      }
      // Parse numbers
      if (["id", "fid", "mid"].includes(header)) {
        value = value ? Number(value) : undefined;
      }
      node[header] = value;
    });
    return node;
  });
  return nodes;
}
const nodes = await fetchNodesFromSheet();
const familyTreeData = {
  nodes,
  nodeBinding: {
    field_0: "nombre",
    field_1: "nacimiento",
    field_2: "Descendientes"
  },
  template: "hugo",
  // nodeTreeMenu: false, // este es el icono de
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
      { type: "textbox", label: "PID (Padre)", binding: "pid" },
      { type: "textbox", label: "PIDs (Padres)", binding: "pids" },
      { type: "textbox", label: "Tags", binding: "tags" },
    ],
  },
  nodeMenu: {
    add: { text: "Agregar" },
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
