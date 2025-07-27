
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
    console.log('🔍 [getTagFromNodeData] Buscando ID:', id);
    console.log('🔍 [getTagFromNodeData] Nodos disponibles:', nodes ? nodes.length : 'undefined');
    
    if (!nodes || !Array.isArray(nodes)) {
        console.warn('⚠️ [getTagFromNodeData] nodes no es un array válido');
        return 0;
    }
    
    const node = nodes.find(n => n.id === id);
    console.log('🔍 [getTagFromNodeData] Nodo encontrado:', node);
    
    if (node && node.tags) {
        console.log('🏷️ [getTagFromNodeData] Tags del nodo:', node.tags);
        console.log('🏷️ [getTagFromNodeData] Tipo de tags:', typeof node.tags);
        console.log('🏷️ [getTagFromNodeData] Es array:', Array.isArray(node.tags));
        
        // Manejar tanto arrays como strings CSV
        let tagsArray = node.tags;
        if (typeof node.tags === 'string') {
            // Si es string, podría ser CSV o JSON
            if (node.tags.startsWith('[')) {
                try {
                    tagsArray = JSON.parse(node.tags);
                    console.log('🔄 [getTagFromNodeData] Tags parseados de JSON:', tagsArray);
                } catch (e) {
                    console.warn('⚠️ [getTagFromNodeData] Error parseando JSON:', e);
                    tagsArray = node.tags.split(',').map(item => item.trim());
                    console.log('🔄 [getTagFromNodeData] Tags parseados de CSV:', tagsArray);
                }
            } else {
                tagsArray = node.tags.split(',').map(item => item.trim());
                console.log('🔄 [getTagFromNodeData] Tags parseados de CSV:', tagsArray);
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
            console.log('🔄 [getTagFromNodeData] Tags limpiados de array:', tagsArray);
        }
        
        if (Array.isArray(tagsArray) && tagsArray.length >= 2) {
            const tagNumber = parseInt(tagsArray[1], 10);
            console.log('🔢 [getTagFromNodeData] Tag número bruto:', tagsArray[1]);
            console.log('🔢 [getTagFromNodeData] Tag número parseado:', tagNumber);
            
            // Validar que no sea NaN
            if (!isNaN(tagNumber)) {
                console.log('✅ [getTagFromNodeData] Tag válido encontrado:', tagNumber);
                return tagNumber;
            } else {
                console.warn('⚠️ [getTagFromNodeData] Tag parseado es NaN:', tagsArray[1]);
            }
        } else {
            console.warn('⚠️ [getTagFromNodeData] Tags no es array válido o no tiene suficientes elementos:', tagsArray);
        }
    } else {
        console.warn('⚠️ [getTagFromNodeData] Nodo no encontrado o no tiene tags');
    }
    
    console.log('🔄 [getTagFromNodeData] Retornando tag por defecto: 0');
    return 0; // Tag por defecto si no se encuentra o es inválido
}

export { getTag, getTagFromNodeData };