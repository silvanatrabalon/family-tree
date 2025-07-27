import { getTag, getTagFromNodeData } from "../../../constant/getTag";
import { serializeNodeForSheet } from "../../../utils/serializeNodeForSheet";
import { API_CONFIG, makeApiRequest, makeExpressRequest } from "../../../utils/apiConfig";

export async function addNode(node, nodes = null) {
  const nodeCopy = { ...node };
  
  // Solo procesar tags y Descendientes si no están ya definidos en el nodo
  if (!nodeCopy.tags || !nodeCopy.Descendientes) {
    const pidsCheck = node.pids || [];
    let refId = pidsCheck[0] || node.mid || node.fid;
    
    // Si no tiene refId directo, buscar si otros nodos lo referencian como padre/madre
    if (!refId && nodes) {
      // Buscar nodos que tengan este ID como fid o mid
      const childNode = nodes.find(n => n.fid === node.id || n.mid === node.id);
      if (childNode) {
        refId = childNode.id;
      }
    }
    
    let tagNumber = null;
    let descendientes = node.nombre; // Default al nombre del nodo
    let inheritedTags = null;
    
    // Si tenemos los datos de los nodos (desde AdminPanel), usamos la función basada en datos
    if (nodes && refId) {
      // Buscar el nodo padre/relacionado
      const relatedNode = nodes.find(n => n.id === refId);
      
      if (relatedNode) {
        // Heredar los tags COMPLETOS del nodo padre
        let parentTags = relatedNode.tags;
        
        // Manejar diferentes formatos de tags
        if (typeof parentTags === 'string') {
          if (parentTags.startsWith('[')) {
            try {
              parentTags = JSON.parse(parentTags);
            } catch (e) {
              parentTags = parentTags.split(',');
            }
          } else {
            parentTags = parentTags.split(',');
          }
        }
        
        if (Array.isArray(parentTags) && parentTags.length >= 2) {
          inheritedTags = [...parentTags]; // Copia completa de los tags
          tagNumber = parseInt(parentTags[1], 10);
        } else {
          tagNumber = getTagFromNodeData(refId, nodes);
        }
        
        // Obtener Descendientes del nodo relacionado
        if (relatedNode.Descendientes) {
          descendientes = relatedNode.Descendientes;
        }
      }
    } else if (refId) {
      // Si no tenemos datos, usamos la función DOM (para compatibilidad)
      tagNumber = getTag(refId);
    }
    
    // Usar los tags heredados si están disponibles, sino crear nuevos
    if (inheritedTags && !nodeCopy.tags) {
      nodeCopy.tags = inheritedTags;
    } else if (tagNumber !== null && !isNaN(tagNumber) && !nodeCopy.tags) {
      nodeCopy.tags = ["Descendientes", String(tagNumber)];
    } else if (!nodeCopy.tags) {
      nodeCopy.tags = ["Descendientes", "0"]; // Tag por defecto
    }
    
    if (!nodeCopy.Descendientes) {
      nodeCopy.Descendientes = descendientes;
    }
  }

  // Serializa todo una sola vez
  const nodeData = serializeNodeForSheet(nodeCopy);

  if (API_CONFIG.USE_APPS_SCRIPT) {
    await makeApiRequest('add-node', { nodeData });
  } else {
    await makeExpressRequest('/api/add-node', { nodeData });
  }
}
