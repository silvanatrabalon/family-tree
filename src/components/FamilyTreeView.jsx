// src/components/FamilyTreeView.jsx
import { useEffect, useRef } from "react";
import FamilyTree from "@balkangraph/familytree.js";

const FamilyTreeView = () => {
  const treeRef = useRef(null);
  const treeInstance = useRef(null); // Referencia a la instancia del árbol

  useEffect(() => {
    if (treeRef.current && !treeInstance.current) {
      treeInstance.current = new FamilyTree(treeRef.current, {
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
        enableEditForm: true
      });
    }

    // Cleanup
    return () => {
      if (treeInstance.current?.destroy) {
        try {
          treeInstance.current.destroy();
        } catch (err) {
          console.warn("Error destroying FamilyTree instance:", err);
        }
      }
    };
  }, []);

  return (
      <div ref={treeRef} />
  );
};

export default FamilyTreeView;
