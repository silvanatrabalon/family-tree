function deserializeNodeFromSheet(row, headers) {
  const obj = {};
  headers.forEach((header, index) => {
    let value = row[index];

    // Campos que deben ser parseados como string sin comillas extras
    if (["id", "fid", "mid"].includes(header) && value) {
      try {
        value = JSON.parse(value); // "\"_d0il\"" → "_d0il"
      } catch (err) {
        console.warn(`Error parsing ${header}:`, value);
      }
    }

    // Arrays de strings
    if (["pids", "tags"].includes(header)) {
      try {
        value = value ? JSON.parse(value) : [];
      } catch (err) {
        console.warn(`Error parsing ${header}:`, value);
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