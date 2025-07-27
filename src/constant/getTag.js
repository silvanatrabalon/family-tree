
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
    if (!nodes || !Array.isArray(nodes)) {
        return 0;
    }
    
    const node = nodes.find(n => n.id === id);
    
    if (node && node.tags) {
        // Manejar tanto arrays como strings CSV
        let tagsArray = node.tags;
        if (typeof node.tags === 'string') {
            // Si es string, podría ser CSV o JSON
            if (node.tags.startsWith('[')) {
                try {
                    tagsArray = JSON.parse(node.tags);
                } catch (e) {
                    tagsArray = node.tags.split(',').map(item => item.trim());
                }
            } else {
                tagsArray = node.tags.split(',').map(item => item.trim());
            }
        } else if (Array.isArray(node.tags)) {
            // Si ya es array, verificar si los elementos son strings que necesitan limpieza
            tagsArray = node.tags.map(item => {
                if (typeof item === 'string') {
                    // Limpiar comillas extras y espacios
                    return item.replace(/^["'\s]+|["'\s\]]+$/g, '').trim();
                }
                return item;
            });
        }
        
        if (Array.isArray(tagsArray) && tagsArray.length >= 2) {
            const tagNumber = parseInt(tagsArray[1], 10);
            
            // Validar que no sea NaN
            if (!isNaN(tagNumber)) {
                return tagNumber;
            }
        }
    }
    
    return 0; // Tag por defecto si no se encuentra o es inválido
}

export { getTag, getTagFromNodeData };