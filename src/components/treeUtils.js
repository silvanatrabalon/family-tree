// Utility functions for FamilyTree
export function hasDuplicateIds(nodes) {
  const ids = nodes.map(n => n.id);
  return ids.length !== new Set(ids).size;
}

export function hasSelfParenting(nodes) {
  return nodes.some(n => n.id === n.pid || (Array.isArray(n.pids) && n.pids.includes(n.id)));
}
