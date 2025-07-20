// Handles FamilyTree node sync events
import { fetchNodesFromSheet } from "../../../familyTreeConfig";
import { addNode } from "./addNode";
import { updateNode } from "./updateNode";
import { deleteNode } from "./deleteNode";


export function setupNodeSyncEvents(treeInstance, setNodes, fetchedNodes) {
  treeInstance.onUpdateNode(async (args) => {
    // Add
    if (args.addNodesData?.length) {
      console.log('[NodeSyncEvents] Adding nodes:', args.addNodesData);
      for (const node of args.addNodesData) {
        await addNode(node);
      }
    }


const colorMap = {
  "1": "#f44336",
  "2": "#e91e63",
  "3": "#9c27b0",
  "4": "#673ab7",
  "5": "#3f51b5",
  "6": "#2196f3",
  "7": "#009688",
  "8": "#4caf50",
  "9": "#ff9800"
};

if (args.updateNodesData?.length) {
  console.log('[NodeSyncEvents] Updating nodes:', args.updateNodesData);
  for (const node of args.updateNodesData) {
    await updateNode(node, fetchedNodes);

    const index = node.id - 2; // el cálculo que pediste
    const colorKey = index.toString();

    const color = colorMap[colorKey] || '#ccc'; // fallback gris si no existe

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
