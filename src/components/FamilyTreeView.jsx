// src/components/FamilyTreeView.jsx
import { useEffect, useRef } from "react";
import FamilyTree from "@balkangraph/familytree.js";
import familyTreeData from "../familyTreeConfig";
const FamilyTreeView = () => {
  const treeRef = useRef(null);
  const treeInstance = useRef(null); // Referencia a la instancia del árbol

  useEffect(() => {
    FamilyTree.SEARCH_PLACEHOLDER = "Buscar persona...";
    if (treeRef.current && !treeInstance.current) {
        console.log("Config FamilyTree:", familyTreeData);
      treeInstance.current = new FamilyTree(treeRef.current, familyTreeData);
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
