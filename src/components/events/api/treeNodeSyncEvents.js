// Handles FamilyTree node sync events
import { fetchNodesFromSheet } from "../../../familyTreeConfig";
import { addNode } from "./addNode";
import { updateNode } from "./updateNode";
import { deleteNode } from "./deleteNode";

export function setupNodeSyncEvents(treeInstance, setNodes, fetchedNodes) {
  treeInstance.onUpdateNode(async (args) => {
    // Add
    if (args.addNodesData?.length) {
      for (const node of args.addNodesData) {
        await addNode(node);
      }
    }

    // Update
    if (args.updateNodesData?.length) {
      for (const node of args.updateNodesData) {
        await updateNode(node, fetchedNodes);
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
