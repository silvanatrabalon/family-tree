const familyTreeData = {
    nodes: [
        {
            id: 1,
            pids: [2],
            nombre: "Juan",
            genero: "masculino",
            nacimiento: "1950",
            linea: "1",
            tags: ["green"]
        },
        {
            id: 2,
            pids: [1],
            nombre: "Maria",
            genero: "femenino",
            nacimiento: "1952",
            linea: "2",
            tags: ["red"]
        },
        {
            id: 3,
            mid: 2,
            fid: 1,
            nombre: "Luis",
            genero: "masculino",
            nacimiento: "1975",
            linea: "1",
            tags: ["green"]
        },
    ],
    nodeBinding: {
        field_0: "nombre",
        field_1: "nacimiento",
    },
    template: "hugo",
    enableEditForm: true,
    nodeTreeMenu: true,
    nodeMenu: {
        details: { text: "Ver Detalles" },
        edit: { text: "Editar persona" },
        remove: { text: "Eliminar persona" },
    },
    editForm: {
        elements: [
            { type: "textbox", label: "Nombre", binding: "nombre" },
            { type: "textbox", label: "Año de nacimiento", binding: "nacimiento" },
            {
                type: "checkbox",
                label: "¿Está en el grupo de WhatsApp?",
                binding: "whatsapp"
            }
        ]
    },
    nodeDetails: [
        { label: "Nombre", binding: "nombre" },
        { label: "Año de nacimiento", binding: "nacimiento" },
        { label: "Género", binding: "genero" },
    ],
    filterBy: ['linea'],
    tags: {
    filter: {
        template: 'hugo' // or your custom template
    }
},
};

export default familyTreeData;
