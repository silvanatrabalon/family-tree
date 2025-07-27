// Delete node API logic
import { API_CONFIG, makeApiRequest, makeExpressRequest } from "../../../utils/apiConfig";

export async function deleteNode(nodeIdToRemove, treeInstance) {
  console.log('[deleteNode] Attempting to delete node:', nodeIdToRemove);
  const allTreeNodes = treeInstance.config.nodes || [];
  console.log('[deleteNode] All tree nodes:', allTreeNodes);
  const nodeToDelete = allTreeNodes.find(n => String(n.id) === String(nodeIdToRemove));
  console.log('[deleteNode] Node to delete:', nodeToDelete);
  if (!nodeToDelete) {
    console.error("❌ Nodo a eliminar no encontrado:", nodeIdToRemove);
    return false;
  }
  const rowIndex = allTreeNodes.indexOf(nodeToDelete) + 2;
  console.log('[deleteNode] Calculated rowIndex for delete:', rowIndex);
  if (rowIndex <= 1 || isNaN(rowIndex)) {
    console.error("❌ rowIndex inválido para delete:", rowIndex);
    return false;
  }
  console.log('[deleteNode] Sending delete request for rowIndex:', rowIndex);
  
  if (API_CONFIG.USE_APPS_SCRIPT) {
    await makeApiRequest('delete-node', { rowIndex });
  } else {
    await makeExpressRequest('/api/delete-node', { rowIndex });
  }
  
  console.log('[deleteNode] Delete request sent successfully for node:', nodeIdToRemove);
  return true;
}

// Delete node from admin panel
export async function deleteNodeFromAdmin(node, fetchedNodes) {
  const rowIndex = fetchedNodes.findIndex(n => String(n.id) === String(node.id)) + 2;

  if (rowIndex <= 1) {
    throw new Error("Node not found in the list");
  }

  if (API_CONFIG.USE_APPS_SCRIPT) {
    await makeApiRequest('delete-node', { rowIndex });
  } else {
    await makeExpressRequest('/api/delete-node', { rowIndex });
  }
}
