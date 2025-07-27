import { deserializeNodeFromSheet } from "../../../utils/deserializeNodeFromSheet.js";

async function fetchNodesFromSheet() {
  const url = "https://sheets.googleapis.com/v4/spreadsheets/1_4ehjHFEK8IQEVo0JnyCYgEmbzNRl-Ez9aUpncANlRM/values/family-tree?alt=json&key=AIzaSyBDQFpGm89HcwUmzweaR4MQF04IWKvnXgk";
  const response = await fetch(url);
  const data = await response.json();
  const arrayDeArrays = data.values;

  const headers = arrayDeArrays[0];
  const rows = arrayDeArrays.slice(1);
  
  const nodes = rows.map((row, index) => {
    const node = deserializeNodeFromSheet(row, headers);
    return node;
  });
  
  // Filtrar nodos sin ID o con datos incompletos
  const validNodes = nodes.filter((node, index) => {
    const hasValidId = node.id && node.id !== '' && node.id !== 'undefined';
    const hasValidName = node.nombre && node.nombre !== '';
    const isValid = hasValidId && hasValidName;
    
    return isValid;
  });

  return validNodes;
}

export { fetchNodesFromSheet };