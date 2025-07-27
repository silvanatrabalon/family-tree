function deserializeNodeFromSheet(row, headers) {
  const obj = {};
  
  // Si la fila está completamente vacía, devolver objeto con id undefined
  if (!row || row.length === 0 || row.every(cell => !cell || cell === '')) {
    return { id: undefined, nombre: undefined };
  }
  
  headers.forEach((header, index) => {
    let value = row[index];

    // Si el valor está vacío, undefined o null, usar string vacío o undefined según el campo
    if (value === null || value === undefined || value === '') {
      if (['id', 'fid', 'mid', 'nombre'].includes(header)) {
        value = undefined; // Estos campos críticos se marcan como undefined para filtrar después
      } else {
        value = ''; // Otros campos se dejan como string vacío
      }
    }

    // Campos que deben ser parseados como string sin comillas extras
    if (["id", "fid", "mid"].includes(header) && value) {
      try {
        // Si el valor ya es un string limpio, úsalo directamente
        if (typeof value === 'string' && !value.startsWith('"')) {
          // No hacer nada, ya es un ID limpio
        } else {
          // Intentar parsear JSON para datos del formato anterior
          value = JSON.parse(value); // "\"_d0il\"" → "_d0il"
        }
      } catch (err) {
        console.warn(`Error parsing ${header}:`, value, 'usando valor original');
        // Si falla el parsing, usar el valor original
      }
    }

    // Arrays de strings
    if (["pids", "tags"].includes(header)) {
      try {
        if (!value || value === '') {
          value = [];
        } else if (typeof value === 'string') {
          // Verificar si es JSON array (empieza con [)
          if (value.startsWith('[')) {
            value = JSON.parse(value);
          } else if (value.includes(',')) {
            // CSV format: "item1,item2,item3"
            value = value.split(',').map(item => item.trim()).filter(item => item !== '');
          } else {
            // Single item
            value = [value.trim()];
          }
        } else {
          // Ya es array o no es string
          value = Array.isArray(value) ? value : [];
        }
      } catch (err) {
        console.warn(`Error parsing ${header}:`, value, 'usando array vacío');
        value = [];
      }
    }

    // Campos booleanos
    if (["whatsapp", "ha_sido_invitado", "confirmo_asistencia", "realizo_pago"].includes(header)) {
      if (value === "true" || value === true) {
        value = true;
      } else if (value === "false" || value === false) {
        value = false;
      } else {
        value = false; // Default a false para booleanos
      }
    }

    obj[header] = value;
  });

  return obj;
}

export { deserializeNodeFromSheet };