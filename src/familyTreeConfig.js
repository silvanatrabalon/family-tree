import nodes from "./nodes";

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
        details: { text: "Ver Detalles" },
        edit: { text: "Editar persona" },
        remove: { text: "Eliminar persona" },
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

export default familyTreeData;
