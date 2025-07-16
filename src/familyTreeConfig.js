// src/familyTreeConfig.js

const familyTreeData = {
  nodes: [
    { id: 1, pids: [2], name: "Juan", gender: "male", born: "1950" },
    { id: 2, pids: [1], name: "Maria", gender: "female", born: "1952" },
    { id: 3, mid: 2, fid: 1, name: "Luis", gender: "male", born: "1975" },
  ],
  nodeBinding: {
    field_0: "name",
    field_1: "born"
  },
  template: "hugo",
  enableEditForm: true,
};

export default familyTreeData;
