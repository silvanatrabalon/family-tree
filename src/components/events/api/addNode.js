// Add node API logic
export async function addNode(node) {
  const nodeData = { ...node };
  if (Array.isArray(nodeData.tags)) nodeData.tags = JSON.stringify(nodeData.tags);
  if (Array.isArray(nodeData.pids)) nodeData.pids = JSON.stringify(nodeData.pids);
  await fetch("http://localhost:3001/api/add-node", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nodeData }),
  });
}
