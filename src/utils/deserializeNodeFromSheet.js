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

    obj[header] = value;
  });

  return obj;
}

export { deserializeNodeFromSheet };