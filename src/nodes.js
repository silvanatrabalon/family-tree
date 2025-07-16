// src/nodes.js

const nameToNumber = {
    Leonarda: "1",
    Jose: "2",
    Marino: "3",
    "Juan Rosendo": "4",
    Herminio: "5",
    Inisida: "6",
    Emma: "7",
    Rosendo: "8",
    Julio: "9"
};

const nodes = [
    {
        id: 1,
        pids: [2],
        nombre: "Juan",
        genero: "masculino",
        nacimiento: "1950",
        Descendientes: [nameToNumber["Juan Rosendo"]],
        tags: ["Descendientes", nameToNumber["Juan Rosendo"]]
    },
    {
        id: 2,
        pids: [1],
        nombre: "Maria",
        genero: "femenino",
        nacimiento: "1952",
        Descendientes: [nameToNumber["Inisida"]],
        tags: ["Descendientes", nameToNumber["Inisida"]]
    },
    {
        id: 3,
        mid: 2,
        fid: 1,
        nombre: "Luis",
        genero: "masculino",
        nacimiento: "1975",
        Descendientes: [nameToNumber["Leonarda"]],
        tags: ["Descendientes", nameToNumber["Leonarda"]]
    },
];

export default nodes;
