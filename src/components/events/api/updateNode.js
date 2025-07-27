// Update node API logic
import { serializeNodeForSheet } from "../../../utils/serializeNodeForSheet";
import { API_CONFIG, makeApiRequest, makeExpressRequest } from "../../../utils/apiConfig";

export async function updateNode(node, fetchedNodes) {
  const nodeData = serializeNodeForSheet({ ...node });
  const rowIndex = fetchedNodes.findIndex(n => String(n.id) === String(node.id)) + 2;

  if (API_CONFIG.USE_APPS_SCRIPT) {
    await makeApiRequest('update-node', { rowIndex, nodeData });
  } else {
    await makeExpressRequest('/api/update-node', { rowIndex, nodeData });
  }
}
