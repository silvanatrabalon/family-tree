const familyTreeData = {
    nodes: [
        {
            id: 1,
            pids: [2],
            nombre: "Juan",
            genero: "masculino",
            nacimiento: "1950",
            Descendientes: ["8"],
            tags: ["Descendientes", "8"]
        },
        {
            id: 2,
            pids: [1],
            nombre: "Maria",
            genero: "femenino",
            nacimiento: "1952",
            Descendientes: ["6"],
            tags: ["Descendientes", "6"]
        },
        {
            id: 3,
            mid: 2,
            fid: 1,
            nombre: "Luis",
            genero: "masculino",
            nacimiento: "1975",
            Descendientes: ["1"],
            tags: ["Descendientes", "1"]
        },
    ],
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
