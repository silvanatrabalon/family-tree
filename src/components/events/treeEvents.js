// FamilyTree event handlers
import { setupClickEvents } from "./treeClickEvents";
import { setupNodeSyncEvents } from "./api/treeNodeSyncEvents";

export function setupTreeEvents(treeInstance, setNodes, fetchedNodes) {
  setupClickEvents(treeInstance);
  setupNodeSyncEvents(treeInstance, setNodes, fetchedNodes);
}
