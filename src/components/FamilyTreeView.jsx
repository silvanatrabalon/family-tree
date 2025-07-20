import { useEffect, useRef, useState } from "react";
import { initTree } from "./treeInit";

const FamilyTreeView = () => {
  const treeRef = useRef(null);
  const treeInstance = useRef(null);
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    initTree({ treeRef, treeInstance, setNodes });
    return () => {
      if (treeInstance.current?.destroy) {
        try {
          treeInstance.current.destroy();
        } catch (err) {
          console.warn("Error en limpieza de instancia:", err);
        }
      }
    };
  }, [treeRef, treeInstance, setNodes]);

  return <div ref={treeRef} />;
};

export default FamilyTreeView;
