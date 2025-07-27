// Utility functions for FamilyTree
export function hasDuplicateIds(nodes) {
  const ids = nodes.map(n => n.id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  
  if (duplicates.length > 0) {
    console.error('🔍 IDs duplicados encontrados:', duplicates);
    console.error('📋 Todos los IDs:', ids);
    console.error('🗂️ Nodos con IDs duplicados:', 
      nodes.filter(n => duplicates.includes(n.id))
    );
  }
  
  return ids.length !== new Set(ids).size;
}

export function hasSelfParenting(nodes) {
  return nodes.some(n => n.id === n.pid || (Array.isArray(n.pids) && n.pids.includes(n.id)));
}
