// Update node API logic
export async function updateNode(node, fetchedNodes) {
  const nodeData = { ...node };
  // Google Sheets expects arrays as stringified JSON
  if (Array.isArray(nodeData.tags)) {
    nodeData.tags = JSON.stringify(nodeData.tags.map(String));
  }
  if (Array.isArray(nodeData.pids)) {
    nodeData.pids = JSON.stringify(nodeData.pids.map(String));
  }
  const rowIndex = fetchedNodes.findIndex(n => String(n.id) === String(node.id)) + 2;
  await fetch("http://localhost:3001/api/update-node", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rowIndex, nodeData }),
  });
}
