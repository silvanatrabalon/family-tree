import { getTag } from "../../../constant/getTag";
import { serializeNodeForSheet } from "../../../utils/serializeNodeForSheet";

export async function addNode(node) {
  const nodeCopy = { ...node };

  // Agrega tags ANTES de serializar
  const pidsCheck = node.pids || [];
  const refId = pidsCheck[0] || node.mid || node.fid;
  const tagNumber = getTag(refId);
  if (tagNumber !== null) {
    nodeCopy.tags = ["Descendientes", String(tagNumber)];
  }

  // Serializa todo una sola vez
  const nodeData = serializeNodeForSheet(nodeCopy);

  await fetch("http://localhost:3001/api/add-node", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nodeData }),
  });
}
