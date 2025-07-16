import { useEffect, useRef } from "react";
import FamilyTree from "@balkangraph/familytree.js";
import familyTreeData from "../familyTreeConfig";

const FamilyTreeView = () => {
  const treeRef = useRef(null);
  const treeInstance = useRef(null);

  useEffect(() => {
    // Configurar textos en la UI
    FamilyTree.SEARCH_PLACEHOLDER = "Buscar persona...";
    FamilyTree.filterUI.textFilterBy = "Filtrar por";
    FamilyTree.filterUI.all = "[Todos]";

    // Definir plantilla minimizada si no existe
    if (!FamilyTree.templates.hugo.min) {
      const base = FamilyTree.templates.hugo;
      const min = Object.assign({}, base);
      min.size = [250, 60];
        min.field_0 =
        '<text data-width="230" style="font-size: 18px;" fill="#000000" x="125" y="40" text-anchor="middle">{val}</text>';

      min.field_1 = "";
      FamilyTree.templates.hugo.min = min;
    }

    if (treeRef.current) {
      // Destruir instancia anterior si existe y es válida
      if (treeInstance.current && typeof treeInstance.current.destroy === "function") {
        try {
          treeInstance.current.destroy();
        } catch (err) {
          console.warn("Error destroying FamilyTree instance:", err);
        }
      }

      try {
        // Crear nueva instancia
        treeInstance.current = new FamilyTree(treeRef.current, {
          ...familyTreeData,
          template: "hugo",
          min: true,
        });

        // Click para minimizar/maximizar
        treeInstance.current.on("click", (sender, args) => {
          if (args?.node?.min) {
            sender.maximize(args.node.id);
          } else {
            sender.minimize(args.node.id);
          }
          return false;
        });
      } catch (error) {
        console.error("Error initializing FamilyTree:", error);
      }
    }

    return () => {
      if (treeInstance.current && typeof treeInstance.current.destroy === "function") {
        try {
          treeInstance.current.destroy();
        } catch (err) {
          console.warn("Error destroying FamilyTree instance during cleanup:", err);
        }
      }
    };
  }, []);

  return <div ref={treeRef} style={{ width: "100%", height: "90vh" }} />;
};

export default FamilyTreeView;
