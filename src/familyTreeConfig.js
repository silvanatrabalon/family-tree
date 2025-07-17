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
    enableEditForm: true,
  nodeTreeMenu: true,
  nodeMenu: {
    add: { text: "Agregar persona" },
    edit: { text: "Editar persona" },
    remove: { text: "Eliminar persona" },
    details: { text: "Ver Detalles" }
  },
  nodeDetails: [
    { label: "Nombre", binding: "nombre" },
    { label: "Año de nacimiento", binding: "nacimiento" },
    { label: "Género", binding: "genero" }
  ],
  editForm: {
    generateElementsFromFields: false,
    fields: [
      { type: "textbox", label: "Nombre", binding: "nombre" },
      { type: "textbox", label: "Nacimiento", binding: "nacimiento" },
      { type: "textbox", label: "Género", binding: "genero" },
      { type: "textbox", label: "Descendientes", binding: "Descendientes" }
    ],
    buttons: {
      edit: null,
      share: null,
      pdf: null
    }
  },

    nodeDetails: [
        { label: "Nombre", binding: "nombre" },
        { label: "Año de nacimiento", binding: "nacimiento" },
        { label: "Género", binding: "genero" }
    ],
    filterBy: ['Descendientes'],
    toolbar: {
        zoom: true,
        fit: true,
    },
    menu: {
        pdf: { text: "Exportar documento PDF" },
        png: { text: "Exportar imagen PNG" },
    }
};

export { fetchNodesFromSheet, familyTreeData };
