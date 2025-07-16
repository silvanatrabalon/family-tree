const familyTreeData = {
    nodes: [
        {
            id: 1,
            pids: [2],
            nombre: "Juan",
            genero: "masculino",
            nacimiento: "1950",
            tags: ["8"]
        },
        {
            id: 2,
            pids: [1],
            nombre: "Maria",
            genero: "femenino",
            nacimiento: "1952",
            tags: ["6"]
        },
        {
            id: 3,
            mid: 2,
            fid: 1,
            nombre: "Luis",
            genero: "masculino",
            nacimiento: "1975",
            tags: ["1"]
        },
    ],
    nodeBinding: {
        field_0: "nombre",
        field_1: "nacimiento",
        field_2: "tags"
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
    filterBy: ['tags'],
    tags: {
        filter: {
            template: 'hugo' // or your custom template
        }
    },
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
