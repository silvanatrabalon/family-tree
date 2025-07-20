import { useEffect, useRef, useState } from "react";
import FamilyTree from "@balkangraph/familytree.js";
import { fetchNodesFromSheet, familyTreeData } from "../familyTreeConfig";

const FamilyTreeView = () => {
  const treeRef = useRef(null);
  const treeInstance = useRef(null);
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    function hasDuplicateIds(nodes) {
      const ids = nodes.map(n => n.id);
      return ids.length !== new Set(ids).size;
    }

    function hasSelfParenting(nodes) {
      return nodes.some(n => n.id === n.pid || (Array.isArray(n.pids) && n.pids.includes(n.id)));
    }

    async function initTree() {
      const fetchedNodes = await fetchNodesFromSheet();
      setNodes(fetchedNodes);

      if (hasDuplicateIds(fetchedNodes)) {
        console.error("❌ Data error: Duplicate node IDs detected.");
        return;
      }
      if (hasSelfParenting(fetchedNodes)) {
        console.error("❌ Data error: Self-parenting detected.");
        return;
      }

      if (treeRef.current && fetchedNodes.length > 0) {
        if (treeInstance.current?.destroy) {
          try {
            treeInstance.current.destroy();
          } catch (err) {
            console.warn("Error al destruir instancia previa:", err);
          }
        }

        FamilyTree.SEARCH_PLACEHOLDER = "Buscar persona...";
        FamilyTree.filterUI.textFilterBy = "Filtrar por";
        FamilyTree.filterUI.all = "[Todos]";
        FamilyTree.filterUI.clear = "Limpiar filtro";

        // Custom template min view
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

        // Main template fields
        FamilyTree.templates.hugo.field_0 =
          '<text data-width="230" style="font-size: 18px;" fill="#fff" x="125" y="40" text-anchor="middle">{val}</text>';
        FamilyTree.templates.hugo.field_1 =
          '<text data-width="230" style="font-size: 16px;" fill="#fff" x="125" y="65" text-anchor="middle">{val}</text>';
        FamilyTree.templates.hugo.field_2 =
          '<text data-width="230" style="font-size: 14px;" fill="#fff" x="125" y="90" text-anchor="middle">Linea descendiente: {val}</text>';

        FamilyTree.templates.hugo.nodeCircleMenuButton = {
          radius: 25,
          x: 230,
          y: 60,
          color: '#fff',
          stroke: '#aeaeae'
        };

        try {
          treeInstance.current = new FamilyTree(treeRef.current, {
            ...familyTreeData,
            nodes: fetchedNodes,
            template: "hugo",
            min: true,
            enableEditForm: true,
          });

          // Click toggle min/max
          treeInstance.current.on("click", (sender, args) => {
            if (args?.node?.min) {
              sender.maximize(args.node.id);
            } else {
              sender.minimize(args.node.id);
            }
            return false;
          });

          // Sync node changes
          treeInstance.current.onUpdateNode(async (args) => {
            // Add
            if (args.addNodesData?.length) {
              for (const node of args.addNodesData) {
                const nodeData = { ...node };
                if (Array.isArray(nodeData.tags)) nodeData.tags = JSON.stringify(nodeData.tags);
                if (Array.isArray(nodeData.pids)) nodeData.pids = JSON.stringify(nodeData.pids);
                await fetch("http://localhost:3001/api/add-node", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ nodeData }),
                });
              }
            }

            // Update
            if (args.updateNodesData?.length) {
              for (const node of args.updateNodesData) {
                const nodeData = { ...node };
                if (Array.isArray(nodeData.tags)) nodeData.tags = JSON.stringify(nodeData.tags);
                if (Array.isArray(nodeData.pids)) nodeData.pids = JSON.stringify(nodeData.pids);
                const rowIndex = nodes.findIndex(n => String(n.id) === String(node.id)) + 2;
                await fetch("http://localhost:3001/api/update-node", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ rowIndex, nodeData }),
                });
              }
            }

            // Delete
            if (args.removeNodeId) {
                console.error("❌ Nodo remove action");

              const nodeIdToRemove = args.removeNodeId;
              console.error("❌ Nodo remove ", nodeIdToRemove);
              const allTreeNodes = treeInstance.current.config.nodes || [];
              const nodeToDelete = allTreeNodes.find(n => String(n.id) === String(nodeIdToRemove));
              console.log("Nodo a eliminar:", nodeToDelete);
              if (!nodeToDelete) {
                console.error("❌ Nodo a eliminar no encontrado:", nodeIdToRemove);
                return;
              }
              const rowIndex = allTreeNodes.indexOf(nodeToDelete) + 2;
              if (rowIndex <= 1 || isNaN(rowIndex)) {
                console.error("❌ rowIndex inválido para delete:", rowIndex);
                return;
              }
              await fetch("http://localhost:3001/api/delete-node", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rowIndex }),
              });
            }

            // Refresh UI
            const updatedNodes = await fetchNodesFromSheet();
            setNodes(updatedNodes);
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
