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
    FamilyTree.filterUI.clear = "Limpiar filtro";
    // Definir plantilla minimizada si no existe
    if (!FamilyTree.templates.hugo.min) {
      const base = FamilyTree.templates.hugo;
      const min = Object.assign({}, base);
      min.size = [250, 60];
      min.field_0 =
        '<text data-width="230" style="font-size: 18px;" fill="#fff" x="125" y="40" text-anchor="middle">{val}</text>';
      min.field_1 = "";
      min.field_2 = "";
      FamilyTree.templates.hugo.min = min;
    }

    // Definir plantilla maximizada para mostrar los tres campos
    FamilyTree.templates.hugo.field_0 =
      '<text data-width="230" style="font-size: 18px;" fill="#fff" x="125" y="40" text-anchor="middle">{val}</text>';
    FamilyTree.templates.hugo.field_1 =
      '<text data-width="230" style="font-size: 16px;" fill="#fff" x="125" y="65" text-anchor="middle">{val}</text>';
    FamilyTree.templates.hugo.field_2 =
      '<text data-width="230" style="font-size: 14px;" fill="#fff" x="125" y="90" text-anchor="middle">{val}</text>';

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

  return <div ref={treeRef}  />;
};

export default FamilyTreeView;
