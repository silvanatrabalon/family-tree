import { getTag, getTagFromNodeData } from "../../../constant/getTag";
import { serializeNodeForSheet } from "../../../utils/serializeNodeForSheet";

export async function addNode(node, nodes = null) {
  const nodeCopy = { ...node };

  // Solo procesar tags y Descendientes si no están ya definidos en el nodo
  if (!nodeCopy.tags || !nodeCopy.Descendientes) {
    const pidsCheck = node.pids || [];
    const refId = pidsCheck[0] || node.mid || node.fid;
    
    let tagNumber = null;
    let descendientes = node.nombre; // Default al nombre del nodo
    
    // Si tenemos los datos de los nodos (desde AdminPanel), usamos la función basada en datos
    if (nodes && refId) {
      tagNumber = getTagFromNodeData(refId, nodes);
      
      // Obtener Descendientes del nodo relacionado
      const relatedNode = nodes.find(n => n.id === refId);
      if (relatedNode && relatedNode.Descendientes) {
        descendientes = relatedNode.Descendientes;
      }
    } else if (refId) {
      // Si no tenemos datos, usamos la función DOM (para compatibilidad)
      tagNumber = getTag(refId);
    }
    
    if (tagNumber !== null && !nodeCopy.tags) {
      nodeCopy.tags = ["Descendientes", String(tagNumber)];
    }
    
    if (!nodeCopy.Descendientes) {
      nodeCopy.Descendientes = descendientes;
    }
  }

  // Serializa todo una sola vez
  const nodeData = serializeNodeForSheet(nodeCopy);

  await fetch("http://localhost:3001/api/add-node", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nodeData }),
  });
}
