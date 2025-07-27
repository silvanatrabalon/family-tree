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

  if (duplicateIds.length > 0) {
    throw new Error("Duplicate node IDs detected.");
  }
  if (selfParentingNodes.length > 0) {
    throw new Error("Self-parenting detected.");
  }

  if (treeRef.current && fetchedNodes.length > 0) {
    if (treeInstance.current?.destroy) {
      try {
        treeInstance.current.destroy();
      } catch (err) {
        // Silently handle destruction errors
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
          return;
        }

        Object.values(nodesObj).forEach(node => {
          const rect = document.querySelector(`g[data-n-id="${node.id}"] rect`);
          if (rect) rect.setAttribute('fill', colorMap[node.id] || '#ccc');
        });
      });



    } catch (error) {
      throw new Error(`Failed to initialize tree: ${error.message}`);
    }
  }
}
