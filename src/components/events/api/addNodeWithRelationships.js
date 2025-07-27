import { updateNode } from "./updateNode";
import { addNode } from "./addNode";

// Función para manejar las relaciones bidireccionales complejas
export async function addNodeWithRelationships(nodeData, relatedNodeId, relationshipType, allNodes) {
  // Primero agregamos el nuevo nodo
  await addNode(nodeData, allNodes);
  
  // Luego actualizamos las relaciones bidireccionales
  if (relatedNodeId && relationshipType) {
    await updateRelationships(nodeData, relatedNodeId, relationshipType, allNodes);
  }
}

async function updateRelationships(newNode, relatedNodeId, relationshipType, allNodes) {
  const relatedNode = allNodes.find(node => node.id === relatedNodeId);
    if (!relatedNode) {
      return;
    }  let updatedRelatedNode = { ...relatedNode };
  let needsUpdate = false;

  switch (relationshipType) {
    case "parent":
      // Si agregamos un padre/madre, actualizamos el hijo
      if (newNode.gender === "male" && !updatedRelatedNode.fid) {
        updatedRelatedNode.fid = newNode.id;
        needsUpdate = true;
      } else if (newNode.gender === "female" && !updatedRelatedNode.mid) {
        updatedRelatedNode.mid = newNode.id;
        needsUpdate = true;
      }
      break;

    case "spouse":
      // Si agregamos una pareja, actualizamos ambos nodos para referenciarse mutuamente
      const currentPids = relatedNode.pids || [];
      if (!currentPids.includes(newNode.id)) {
        updatedRelatedNode.pids = [...currentPids, newNode.id];
        needsUpdate = true;
      }
      break;

    case "child":
      // Para hijos, la relación ya se estableció en el nuevo nodo
      // No necesitamos actualizar el padre/madre
      break;
  }

  if (needsUpdate) {
    await updateNode(updatedRelatedNode, allNodes);
  }
}
