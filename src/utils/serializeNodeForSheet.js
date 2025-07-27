function serializeNodeForSheet(node) {
  const serialized = { ...node };

  // Formatear según el patrón esperado: algunos campos como JSON strings, otros como strings normales
  
  // ID como JSON string
  serialized.id = JSON.stringify(serialized.id || '');
  
  // pids como array JSON (o array vacío si no hay)
  if (Array.isArray(serialized.pids)) {
    serialized.pids = JSON.stringify(serialized.pids);
  } else if (serialized.pids) {
    // Si es string, convertir a array y luego a JSON
    serialized.pids = JSON.stringify([serialized.pids]);
  } else {
    serialized.pids = JSON.stringify([]);
  }
  
  // Campos simples como strings normales
  serialized.nombre = serialized.nombre || '';
  serialized.gender = serialized.gender || '';
  
  // fid y mid como JSON strings (pueden ser vacíos)
  serialized.fid = JSON.stringify(serialized.fid || '');
  serialized.mid = JSON.stringify(serialized.mid || '');
  
  serialized.nacimiento = serialized.nacimiento || '';
  serialized.Descendientes = serialized.Descendientes || '';
  
  // tags como array JSON
  if (Array.isArray(serialized.tags)) {
    serialized.tags = JSON.stringify(serialized.tags);
  } else if (serialized.tags) {
    // Si es string CSV, convertir a array y luego a JSON
    serialized.tags = JSON.stringify(serialized.tags.split(','));
  } else {
    serialized.tags = JSON.stringify([]);
  }
  
  serialized.contacto = serialized.contacto || '';
  serialized.detalles = serialized.detalles || '';

  // Los booleanos se mantienen como booleanos
  serialized.whatsapp = serialized.whatsapp === true || serialized.whatsapp === 'true';
  serialized.ha_sido_invitado = serialized.ha_sido_invitado === true || serialized.ha_sido_invitado === 'true';
  serialized.confirmo_asistencia = serialized.confirmo_asistencia === true || serialized.confirmo_asistencia === 'true';
  serialized.realizo_pago = serialized.realizo_pago === true || serialized.realizo_pago === 'true';
  
  return serialized;
}

export {serializeNodeForSheet};