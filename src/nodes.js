// src/nodes.js
const numberToName = {
    "1": "Leonarda",
    "2": "Jose",
    "3": "Marino",
    "4": "Juan Rosendo",
    "5": "Herminio",
    "6": "Inisida",
    "7": "Emma",
    "8": "Rosendo",
    "9": "Julio"
};

const nodes = [
    {
        id: 1,
        pids: [2],
        nombre: "Rosendo Meana Cueto",
        genero: "masculino",
        nacimiento: "1950",
        tags: ["Descendientes"]
    },
    {
        id: 2,
        pids: [1],
        nombre: "Maria Inisida Fernandez Gonzalez",
        genero: "femenino",
        nacimiento: "1952",
        tags: ["Descendientes"]
    },
    {
        id: 3,
        mid: 2,
        fid: 1,
        nombre: numberToName["1"],
        genero: "femenino",
        nacimiento: "1900",
        Descendientes: numberToName["1"],
        tags: ["Descendientes", "1"]
    },
    {
        id: 4,
        mid: 2,
        fid: 1,
        nombre: numberToName["2"],
        genero: "masculino",
        nacimiento: "1900",
        Descendientes: numberToName["2"],
        tags: ["Descendientes", "2"]
    },
    {
        id: 5,
        mid: 2,
        fid: 1,
        nombre: numberToName["3"],
        genero: "masculino",
        nacimiento: "1900",
        Descendientes: numberToName["3"],
        tags: ["Descendientes", "3"]
    },
    {
        id: 6,
        mid: 2,
        fid: 1,
        nombre: numberToName["4"],
        genero: "masculino",
        nacimiento: "1900",
        Descendientes: numberToName["4"],
        tags: ["Descendientes", "4"]
    },
    {
        id: 7,
        mid: 2,
        fid: 1,
        nombre: numberToName["5"],
        genero: "masculino",
        nacimiento: "1900",
        Descendientes: numberToName["5"],
        tags: ["Descendientes", "5"]
    },
    {
        id: 8,
        mid: 2,
        fid: 1,
        nombre: numberToName["6"],
        genero: "femenino",
        nacimiento: "1900",
        Descendientes: numberToName["6"],
        tags: ["Descendientes", "6"]
    },
    {
        id: 9,
        mid: 2,
        fid: 1,
        nombre: numberToName["7"],
        genero: "femenino",
        nacimiento: "1900",
        Descendientes: numberToName["7"],
        tags: ["Descendientes", "7"]
    },
    {
        id: 10,
        mid: 2,
        fid: 1,
        nombre: numberToName["8"],
        genero: "masculino",
        nacimiento: "1900",
        Descendientes: numberToName["8"],
        tags: ["Descendientes", "8"]
    },
    {
        id: 11,
        mid: 2,
        fid: 1,
        nombre: numberToName["9"],
        genero: "masculino",
        nacimiento: "1900",
        Descendientes: numberToName["9"],
        tags: ["Descendientes", "9"]
    }

];

export default nodes;
