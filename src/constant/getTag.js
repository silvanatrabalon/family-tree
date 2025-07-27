
function getTag(id) {
    const nodeEl = document.querySelector(`g[data-n-id=${id}]`);

    if (nodeEl) {
        const classAttr = nodeEl.getAttribute('class'); // Ej: "node Descendientes 4 male"
        const match = classAttr.match(/Descendientes\s+(\d+)/);

        return parseInt(match[1], 10);
    }
    return null; // Si no se encuentra el nodo o no tiene la clase esperada
}
export { getTag };