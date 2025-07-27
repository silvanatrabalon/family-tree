import { getTag, getTagFromNodeData } from "../../../constant/getTag";
import { serializeNodeForSheet } from "../../../utils/serializeNodeForSheet";
import { API_CONFIG, makeApiRequest, makeExpressRequest } from "../../../utils/apiConfig";

export async function addNode(node, nodes = null) {
  const nodeCopy = { ...node };
  
  // Solo procesar tags y Descendientes si no están ya definidos en el nodo
  if (!nodeCopy.tags || !nodeCopy.Descendientes) {
    const pidsCheck = node.pids || [];
    const refId = pidsCheck[0] || node.mid || node.fid;
    
    console.log('🔍 [AddNode] ID de referencia:', refId);
    console.log('🔍 [AddNode] pids del nodo:', pidsCheck);
    console.log('🔍 [AddNode] mid del nodo:', node.mid);
    console.log('🔍 [AddNode] fid del nodo:', node.fid);
    
    let tagNumber = null;
    let descendientes = node.nombre; // Default al nombre del nodo
    let inheritedTags = null;
    
    // Si tenemos los datos de los nodos (desde AdminPanel), usamos la función basada en datos
    if (nodes && refId) {
      // Buscar el nodo padre/relacionado
      const relatedNode = nodes.find(n => n.id === refId);
      console.log('👨‍👩‍👧‍👦 [AddNode] Nodo relacionado encontrado:', relatedNode);
      
      if (relatedNode) {
        // Heredar los tags COMPLETOS del nodo padre
        console.log('🏷️ [AddNode] Tags del nodo padre (raw):', relatedNode.tags);
        console.log('🏷️ [AddNode] Tipo de tags del padre:', typeof relatedNode.tags);
        
        let parentTags = relatedNode.tags;
        
        // Manejar diferentes formatos de tags
        if (typeof parentTags === 'string') {
          if (parentTags.startsWith('[')) {
            try {
              parentTags = JSON.parse(parentTags);
              console.log('🔄 [AddNode] Tags del padre parseados de JSON:', parentTags);
            } catch (e) {
              console.warn('⚠️ [AddNode] Error parseando tags JSON:', e);
              parentTags = parentTags.split(',');
              console.log('🔄 [AddNode] Tags del padre parseados de CSV:', parentTags);
            }
          } else {
            parentTags = parentTags.split(',');
            console.log('🔄 [AddNode] Tags del padre parseados de CSV:', parentTags);
          }
        }
        
        if (Array.isArray(parentTags) && parentTags.length >= 2) {
          inheritedTags = [...parentTags]; // Copia completa de los tags
          tagNumber = parseInt(parentTags[1], 10);
          console.log('🏷️ [AddNode] Tags heredados del nodo padre:', inheritedTags);
          console.log('🏷️ [AddNode] Tag número heredado:', tagNumber);
        } else {
          console.warn('⚠️ [AddNode] Tags del padre no son válidos, usando getTagFromNodeData');
          tagNumber = getTagFromNodeData(refId, nodes);
          console.log('🏷️ [AddNode] Tag obtenido con getTagFromNodeData:', tagNumber);
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
      console.log('✅ [AddNode] Tags heredados asignados:', nodeCopy.tags);
    } else if (tagNumber !== null && !isNaN(tagNumber) && !nodeCopy.tags) {
      nodeCopy.tags = ["Descendientes", String(tagNumber)];
      console.log('✅ [AddNode] Tags creados con tagNumber:', nodeCopy.tags);
    } else if (!nodeCopy.tags) {
      nodeCopy.tags = ["Descendientes", "0"]; // Tag por defecto
      console.log('⚠️ [AddNode] Tags por defecto asignados:', nodeCopy.tags);
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
