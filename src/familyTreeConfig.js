// src/familyTreeConfig.js

const familyTreeData = {
  nodes: [
    { id: 1, pids: [2], name: "Juan", gender: "male", born: "1950", tree: "1", tags: ["green"] },
    { id: 2, pids: [1], name: "Maria", gender: "female", born: "1952", tree: "1", tags: ["red"] },
    { id: 3, mid: 2, fid: 1, name: "Luis", gender: "male", born: "1975", tree: "2", tags: ["green"] },
  ],
  nodeBinding: {
    field_0: "name",
    field_1: "born",
  },
  template: "hugo",
  enableEditForm: true,
};

export default familyTreeData;
