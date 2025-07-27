function serializeNodeForSheet(node) {
  const serialized = { ...node };

  if (serialized.id) serialized.id = JSON.stringify(serialized.id);
  if (serialized.fid) serialized.fid = JSON.stringify(serialized.fid);
  if (serialized.mid) serialized.mid = JSON.stringify(serialized.mid);

  if (serialized.pids) serialized.pids = JSON.stringify(serialized.pids);
  if (serialized.tags) serialized.tags = JSON.stringify(serialized.tags);

  // Los booleanos se serializan como strings para Google Sheets
  if (typeof serialized.whatsapp === 'boolean') serialized.whatsapp = serialized.whatsapp.toString();
  if (typeof serialized.ha_sido_invitado === 'boolean') serialized.ha_sido_invitado = serialized.ha_sido_invitado.toString();
  if (typeof serialized.confirmo_asistencia === 'boolean') serialized.confirmo_asistencia = serialized.confirmo_asistencia.toString();

  return serialized;
}

export {serializeNodeForSheet};