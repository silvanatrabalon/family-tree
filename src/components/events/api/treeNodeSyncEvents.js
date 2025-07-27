// Handles FamilyTree node sync events
import { fetchNodesFromSheet } from "../../../familyTreeConfig";
import { addNode } from "./addNode";
import { updateNode } from "./updateNode";
import { deleteNode } from "./deleteNode";
import { colorMap } from "../../../constant/const";

export function setupNodeSyncEvents(treeInstance, setNodes, fetchedNodes) {

  treeInstance.onUpdateNode(async (args) => {
    // Add
    if (args.addNodesData?.length) {
      for (const node of args.addNodesData) {
        await addNode(node, treeInstance);
      }
    }

    // Update
    if (args.updateNodesData?.length) {
      for (const node of args.updateNodesData) {
        await updateNode(node, fetchedNodes);
        const color = colorMap[node.id] || '#ccc';

        const svgGroup = document.querySelector(`g[data-n-id="${node.id}"]`);
        if (svgGroup) {
          const rect = svgGroup.querySelector('rect');
          if (rect) {
            rect.setAttribute('fill', color);
          }
        }
      }
    }

    // Delete
    if (args.removeNodeId) {
      await deleteNode(args.removeNodeId, treeInstance);
    }

    // Refresh UI
    const updatedNodes = await fetchNodesFromSheet();
    setNodes(updatedNodes);
  });
}
