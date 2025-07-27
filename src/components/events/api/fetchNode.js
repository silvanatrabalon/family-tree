import { deserializeNodeFromSheet } from "../../../utils/deserializeNodeFromSheet.js";

async function fetchNodesFromSheet() {
  const url = "https://sheets.googleapis.com/v4/spreadsheets/1_4ehjHFEK8IQEVo0JnyCYgEmbzNRl-Ez9aUpncANlRM/values/family-tree?alt=json&key=AIzaSyBDQFpGm89HcwUmzweaR4MQF04IWKvnXgk";
  const response = await fetch(url);
  const data = await response.json();
  const arrayDeArrays = data.values;

  const headers = arrayDeArrays[0];
  const rows = arrayDeArrays.slice(1);
  const nodes = rows.map(row => deserializeNodeFromSheet(row, headers));

  return nodes;
}

export { fetchNodesFromSheet };