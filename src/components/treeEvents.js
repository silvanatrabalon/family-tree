// FamilyTree event handlers
import { fetchNodesFromSheet } from "../familyTreeConfig";

export function setupTreeEvents(treeInstance, setNodes, fetchedNodes) {
  // Click toggle min/max
  treeInstance.on("click", (sender, args) => {
    if (args?.node?.min) {
      sender.maximize(args.node.id);
    } else {
      sender.minimize(args.node.id);
    }
    return false;
  });

  // Sync node changes
  treeInstance.onUpdateNode(async (args) => {
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
        const rowIndex = fetchedNodes.findIndex(n => String(n.id) === String(node.id)) + 2;
        await fetch("http://localhost:3001/api/update-node", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rowIndex, nodeData }),
        });
      }
    }

    // Delete
    if (args.removeNodeId) {
      const nodeIdToRemove = args.removeNodeId;
      const allTreeNodes = treeInstance.config.nodes || [];
      const nodeToDelete = allTreeNodes.find(n => String(n.id) === String(nodeIdToRemove));
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
}
