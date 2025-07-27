function serializeNodeForSheet(node) {
  const serialized = { ...node };

  if (serialized.id) serialized.id = JSON.stringify(serialized.id);
  if (serialized.fid) serialized.fid = JSON.stringify(serialized.fid);
  if (serialized.mid) serialized.mid = JSON.stringify(serialized.mid);

  if (serialized.pids) serialized.pids = JSON.stringify(serialized.pids);
  if (serialized.tags) serialized.tags = JSON.stringify(serialized.tags);

  return serialized;
}

export {serializeNodeForSheet};