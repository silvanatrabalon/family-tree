// Add node API logic
export async function addNode(node) {
  const nodeData = { ...node };
  // Google Sheets expects arrays as stringified JSON
  if (Array.isArray(nodeData.tags)) {
    nodeData.tags = JSON.stringify(nodeData.tags.map(String));
  }
  if (Array.isArray(nodeData.pids)) {
    nodeData.pids = JSON.stringify(nodeData.pids.map(String));
  }
  await fetch("http://localhost:3001/api/add-node", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nodeData }),
  });
}
