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
      console.log('[NodeSyncEvents] Adding nodes:', args.addNodesData);
      for (const node of args.addNodesData) {
        await addNode(node);
      }
    }

    if (args.updateNodesData?.length) {
      console.log('[NodeSyncEvents] Updating nodes:', args.updateNodesData);
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
      console.log('[NodeSyncEvents] Deleting node:', args.removeNodeId);
      await deleteNode(args.removeNodeId, treeInstance);
    }

    // Refresh UI
    console.log('[NodeSyncEvents] Refreshing nodes from sheet...');
    const updatedNodes = await fetchNodesFromSheet();
    setNodes(updatedNodes);
    console.log('[NodeSyncEvents] Nodes refreshed:', updatedNodes);
  });
}
