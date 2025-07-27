// Add node API logic
import { getTag } from "../../../constant/getTag";
export async function addNode(node, treeInstance) {
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

  // Prioridad: fid > mid > pids[0]
  const pidsCheck = JSON.parse(nodeData.pids) || [];
  const refId = pidsCheck[0]  || nodeData.mid || nodeData.fid ;
  const tagNumber = getTag(refId);
  if (tagNumber !== null) {
    const tag = ["Descendientes", String(tagNumber)];
    nodeData.tags = tag;
  } else {
    console.log("⚠️ No se pudo obtener tag de Descendientes para:", refId);
  }

  if (nodeData.tags) {
    nodeData.tags = JSON.stringify(nodeData.tags); // convierte ["tag1", "tag2"] → "[\"tag1\", \"tag2\"]"
  }

  await fetch("http://localhost:3001/api/add-node", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nodeData }),
  });
}
