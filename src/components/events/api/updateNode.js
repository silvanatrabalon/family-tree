// Update node API logic
import { serializeNodeForSheet } from "../../../utils/serializeNodeForSheet";

export async function updateNode(node, fetchedNodes) {
  const nodeData = serializeNodeForSheet({ ...node });
  const rowIndex = fetchedNodes.findIndex(n => String(n.id) === String(node.id)) + 2;

  await fetch("http://localhost:3001/api/update-node", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rowIndex, nodeData }),
  });
}
