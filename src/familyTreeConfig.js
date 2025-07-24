import FamilyTree from "@balkangraph/familytree.js";

async function fetchNodesFromSheet() {
  const url = "https://sheets.googleapis.com/v4/spreadsheets/1_4ehjHFEK8IQEVo0JnyCYgEmbzNRl-Ez9aUpncANlRM/values/family-tree?alt=json&key=AIzaSyBDQFpGm89HcwUmzweaR4MQF04IWKvnXgk";
  const response = await fetch(url);
  const data = await response.json();
  const arrayDeArrays = data.values;

 const headers = arrayDeArrays[0];
  const rows = arrayDeArrays.slice(1);

  // Índices de columnas relevantes
  const idIndex = headers.indexOf("id");
  const fidIndex = headers.indexOf("fid");
  const midIndex = headers.indexOf("mid");
  const pidsIndex = headers.indexOf("pids");

  const nodes = rows.map(row => {
    const obj = {};

    headers.forEach((header, index) => {
      let value = row[index];

      if ((index === idIndex || index === fidIndex || index === midIndex) && value) {
        try {
          value = JSON.parse(value); // e.g. "_d0il" → _d0il
        } catch (err) {
          console.warn(`Error parsing ${header}:`, value);
        }
      }

      if (index === pidsIndex) {
        try {
          value = value ? JSON.parse(value) : []; // Always return array
        } catch (err) {
          console.warn(`Error parsing pids:`, value);
          value = [];
        }
      }

      obj[header] = value;
    });

    // Map fid and mid to pid/mid for FamilyTree.js
    // if (obj.fid) obj.pid = obj.fid;
    // if (obj.mid) obj.mid = obj.mid;

    return obj;
  });
  return nodes;
}
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
      { type: "textbox", label: "PID (Padre)", binding: "pid" },
      { type: "textbox", label: "PIDs (Padres)", binding: "pids" },
      { type: "textbox", label: "Tags", binding: "tags" },
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
