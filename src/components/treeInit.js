import FamilyTree from "@balkangraph/familytree.js";
import { hasDuplicateIds, hasSelfParenting } from "./treeUtils";
import { fetchNodesFromSheet, familyTreeData } from "../familyTreeConfig";
import { setupTreeTemplates } from "./treeTemplates";
import { setupTreeEvents } from "./events/treeEvents";

export async function initTree({ treeRef, treeInstance, setNodes }) {
  const fetchedNodes = await fetchNodesFromSheet();
  setNodes(fetchedNodes);

  if (hasDuplicateIds(fetchedNodes)) {
    console.error("❌ Data error: Duplicate node IDs detected.");
    return;
  }
  if (hasSelfParenting(fetchedNodes)) {
    console.error("❌ Data error: Self-parenting detected.");
    return;
  }

  if (treeRef.current && fetchedNodes.length > 0) {
    if (treeInstance.current?.destroy) {
      try {
        treeInstance.current.destroy();
      } catch (err) {
        console.warn("Error al destruir instancia previa:", err);
      }
    }

    setupTreeTemplates();

    try {
      treeInstance.current = new FamilyTree(treeRef.current, {
        ...familyTreeData,
        nodes: fetchedNodes,
        template: "hugo",
        min: true,
        enableEditForm: true,
      });
      setupTreeEvents(treeInstance.current, setNodes, fetchedNodes);
    } catch (error) {
      console.error("❌ Error al inicializar el árbol:", error);
    }
  }
}
