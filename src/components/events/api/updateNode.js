// Update node API logic
export async function updateNode(node, fetchedNodes) {
  const nodeData = { ...node };
    if (nodeData.id) {
    nodeData.id = JSON.stringify(nodeData.id); // convierte _d0il → "\"_d0il\""
  }

  if (nodeData.fid) {
    nodeData.fid = JSON.stringify(nodeData.fid); // convierte _d0il → "\"_d0il\""
  }
  if (nodeData.mid) {
    nodeData.mid = JSON.stringify(nodeData.mid); // convierte _d0il → "\"_d0il\""
  }

  if (nodeData.pids) {
    nodeData.pids = JSON.stringify(nodeData.pids); // convierte ["_42bq"] → "[\"_42bq\"]"
  }

  if (nodeData.tags) {
    nodeData.tags = JSON.stringify(nodeData.tags); // convierte ["tag1", "tag2"] → "[\"tag1\", \"tag2\"]"
  }
  const rowIndex = fetchedNodes.findIndex(n => String(n.id) === String(node.id)) + 2;
  await fetch("http://localhost:3001/api/update-node", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rowIndex, nodeData }),
  });
}
