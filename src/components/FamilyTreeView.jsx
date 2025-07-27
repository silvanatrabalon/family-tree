import { useEffect, useRef, useState } from "react";
import { initTree } from "./treeInit";
import "./FamilyTreeHamburger.css";

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
          // Silently handle cleanup errors
        }
      }
    };
  }, [treeRef, treeInstance, setNodes]);

  return <div ref={treeRef} />;
};

export default FamilyTreeView;
