// Update node API logic
import { serializeNodeForSheet } from "../../../utils/serializeNodeForSheet";
import { API_CONFIG, makeApiRequest, makeExpressRequest } from "../../../utils/apiConfig";

export async function updateNode(node, fetchedNodes) {
  console.log('updateNode - nodo original:', node);
  
  const nodeData = serializeNodeForSheet({ ...node });
  console.log('updateNode - datos serializados:', nodeData);
  
  const rowIndex = fetchedNodes.findIndex(n => String(n.id) === String(node.id)) + 2;
  console.log('updateNode - rowIndex:', rowIndex);

  if (API_CONFIG.USE_APPS_SCRIPT) {
    await makeApiRequest('update-node', { rowIndex, nodeData });
  } else {
    await makeExpressRequest('/api/update-node', { rowIndex, nodeData });
  }
}
