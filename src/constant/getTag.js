
function getTag(id) {
    const nodeEl = document.querySelector(`g[data-n-id=${id}]`);

    if (nodeEl) {
        const classAttr = nodeEl.getAttribute('class'); // Ej: "node Descendientes 4 male"
        const match = classAttr.match(/Descendientes\s+(\d+)/);

        return parseInt(match[1], 10);
    }
    return null; // Si no se encuentra el nodo o no tiene la clase esperada
}

// Función alternativa que trabaja con datos directamente
function getTagFromNodeData(id, nodes) {
    const node = nodes.find(n => n.id === id);
    if (node && node.tags && node.tags.length >= 2) {
        return parseInt(node.tags[1], 10);
    }
    return 0; // Tag por defecto
}

export { getTag, getTagFromNodeData };