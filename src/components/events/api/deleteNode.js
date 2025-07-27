// Delete node API logic
import { API_CONFIG, makeApiRequest, makeExpressRequest } from "../../../utils/apiConfig";

export async function deleteNode(nodeIdToRemove, treeInstance) {
  const allTreeNodes = treeInstance.config.nodes || [];
  const nodeToDelete = allTreeNodes.find(n => String(n.id) === String(nodeIdToRemove));
  
  if (!nodeToDelete) {
    return false;
  }
  
  const rowIndex = allTreeNodes.indexOf(nodeToDelete) + 2;
  
  if (rowIndex <= 1 || isNaN(rowIndex)) {
    return false;
  }
  
  if (API_CONFIG.USE_APPS_SCRIPT) {
    await makeApiRequest('delete-node', { rowIndex });
  } else {
    await makeExpressRequest('/api/delete-node', { rowIndex });
  }
  
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
