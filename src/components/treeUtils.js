// Utility functions for FamilyTree
export const validateNodeIds = (nodes) => {
  const ids = nodes.map(node => node.id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  
  if (duplicates.length > 0) {
    throw new Error(`Duplicate IDs found: ${duplicates.join(', ')}`);
  }
  
  return true;
};

export function hasSelfParenting(nodes) {
  return nodes.some(n => n.id === n.pid || (Array.isArray(n.pids) && n.pids.includes(n.id)));
}
