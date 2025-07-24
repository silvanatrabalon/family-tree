import FamilyTree from "@balkangraph/familytree.js";
import { hasDuplicateIds, hasSelfParenting } from "./treeUtils";
import { fetchNodesFromSheet, familyTreeData } from "../familyTreeConfig";
import { setupTreeTemplates } from "./treeTemplates";
import { setupTreeEvents } from "./events/treeEvents";
import { colorMap } from "../constant/const";
export async function initTree({ treeRef, treeInstance, setNodes }) {
  const fetchedNodes = await fetchNodesFromSheet();
  setTimeout(() => {
    fetchedNodes.forEach((node) => {
      const color = colorMap[node.id] || "#ccc";
      const svgGroup = document.querySelector(`g[data-n-id="${node.id}"]`);
      if (svgGroup) {
        const rect = svgGroup.querySelector("rect");
        if (rect) {
          rect.setAttribute("fill", color);
        }
      }
    });
  }, 10);
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

    setupTreeTemplates();

    try {
      treeInstance.current = new FamilyTree(treeRef.current, {
        ...familyTreeData,
        nodes: fetchedNodes,
        template: "hugo",
        min: true,
        enableEditForm: true,
      });
      setupTreeEvents(treeInstance.current, setNodes, fetchedNodes);
      treeInstance.current.on('redraw', () => {
        const nodesObj = treeInstance.current.nodes;
        if (!nodesObj) {
          console.warn('[TreeInit] treeInstance.current.nodes is undefined');
          return;
        }

        Object.values(nodesObj).forEach(node => {
          const rect = document.querySelector(`g[data-n-id="${node.id}"] rect`);
          if (rect) rect.setAttribute('fill', colorMap[node.id] || '#ccc');
        });
      });



    } catch (error) {
      console.error("❌ Error al inicializar el árbol:", error);
    }
  }
}
