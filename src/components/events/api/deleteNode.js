// Delete node API logic
export async function deleteNode(nodeIdToRemove, treeInstance) {
  const allTreeNodes = treeInstance.config.nodes || [];
  const nodeToDelete = allTreeNodes.find(n => String(n.id) === String(nodeIdToRemove));
  if (!nodeToDelete) {
    console.error("❌ Nodo a eliminar no encontrado:", nodeIdToRemove);
    return false;
  }
  const rowIndex = allTreeNodes.indexOf(nodeToDelete) + 2;
  if (rowIndex <= 1 || isNaN(rowIndex)) {
    console.error("❌ rowIndex inválido para delete:", rowIndex);
    return false;
  }
  await fetch("http://localhost:3001/api/delete-node", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rowIndex }),
  });
  return true;
}
