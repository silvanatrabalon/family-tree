import { useEffect, useRef, useState } from "react";
import FamilyTree from "@balkangraph/familytree.js";
import { fetchNodesFromSheet, familyTreeData } from "../familyTreeConfig";

const FamilyTreeView = () => {
  const treeRef = useRef(null);
  const treeInstance = useRef(null);
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    async function initTree() {
      // 1. Obtener los nodos desde el backend
      const fetchedNodes = await fetchNodesFromSheet();
      setNodes(fetchedNodes);

      // 2. Verificar que existe el contenedor
      if (treeRef.current && fetchedNodes.length > 0) {
        // 3. Destruir instancia previa
        if (treeInstance.current?.destroy) {
          try {
            treeInstance.current.destroy();
          } catch (err) {
            console.warn("Error al destruir instancia previa:", err);
          }
        }

        // 4. Configurar textos y plantillas
        FamilyTree.SEARCH_PLACEHOLDER = "Buscar persona...";
        FamilyTree.filterUI.textFilterBy = "Filtrar por";
        FamilyTree.filterUI.all = "[Todos]";
        FamilyTree.filterUI.clear = "Limpiar filtro";

        if (!FamilyTree.templates.hugo.min) {
          const base = FamilyTree.templates.hugo;
          const min = { ...base };
          min.size = [250, 60];
          min.field_0 =
            '<text data-width="230" style="font-size: 18px;" fill="#fff" x="125" y="40" text-anchor="middle">{val}</text>';
          min.field_1 = "";
          min.field_2 = "";
          FamilyTree.templates.hugo.min = min;
        }

        FamilyTree.templates.hugo.field_0 =
          '<text data-width="230" style="font-size: 18px;" fill="#fff" x="125" y="40" text-anchor="middle">{val}</text>';
        FamilyTree.templates.hugo.field_1 =
          '<text data-width="230" style="font-size: 16px;" fill="#fff" x="125" y="65" text-anchor="middle">{val}</text>';
        FamilyTree.templates.hugo.field_2 =
          '<text data-width="230" style="font-size: 14px;" fill="#fff" x="125" y="90" text-anchor="middle">Linea descendiente: {val}</text>';

        // 5. Crear nueva instancia del árbol
        try {
          treeInstance.current = new FamilyTree(treeRef.current, {
            ...familyTreeData,
            nodes: fetchedNodes,
            template: "hugo",
            min: true,
          });

          console.log("✅ Árbol creado correctamente");

          // 6. Listeners de eventos
          treeInstance.current.on("click", (sender, args) => {
            console.log("🖱️ Click en nodo:", args.node);
            if (args?.node?.min) {
              sender.maximize(args.node.id);
            } else {
              sender.minimize(args.node.id);
            }
            return false;
          });


          // Use 'update' event for both add and edit persistence
          treeInstance.current.on("update", async (sender, args) => {
            console.log("🔄 Update event fired:", args);
            const node = args.node;
            const nodeData = { ...node };
            if (Array.isArray(nodeData.tags)) nodeData.tags = JSON.stringify(nodeData.tags);
            if (Array.isArray(nodeData.pids)) nodeData.pids = JSON.stringify(nodeData.pids);
            // If node.id exists in nodes, it's an edit; otherwise, it's an add
            const existing = nodes.find(n => n.id === node.id);
            if (existing) {
              const rowIndex = nodes.findIndex(n => n.id === node.id) + 2;
              await fetch("http://localhost:3001/api/update-node", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rowIndex, nodeData }),
              });
            } else {
              await fetch("http://localhost:3001/api/add-node", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nodeData }),
              });
            }
            // Reload nodes
            const updatedNodes = await fetchNodesFromSheet();
            setNodes(updatedNodes);
          });

          treeInstance.current.on("remove", async (sender, args) => {
            console.log("🗑️ Nodo eliminado:", args);
            const node = args.node;
            const rowIndex = fetchedNodes.findIndex(n => n.id === node.id) + 2;
            await fetch("http://localhost:3001/api/delete-node", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ rowIndex }),
            });
            const updated = await fetchNodesFromSheet();
            setNodes(updated);
          });
        } catch (error) {
          console.error("❌ Error al inicializar el árbol:", error);
        }
      }
    }

    initTree();

    return () => {
      if (treeInstance.current?.destroy) {
        try {
          treeInstance.current.destroy();
        } catch (err) {
          console.warn("Error en limpieza de instancia:", err);
        }
      }
    };
  }, []);

  return <div ref={treeRef} />;
};

export default FamilyTreeView;
