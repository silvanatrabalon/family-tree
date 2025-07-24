// Handles FamilyTree click events
export function setupClickEvents(treeInstance) {
  treeInstance.on("click", (sender, args) => {
    console.log('Node clicked:', args.node.id);
    if (args?.node?.min) {
      sender.maximize(args.node.id);
    } else {
      sender.minimize(args.node.id);
    }
    return false;
  });
}
