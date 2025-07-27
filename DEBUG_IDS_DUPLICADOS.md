# 🔍 DEBUG: IDs Duplicados en Google Sheets

## 🚨 **Problema identificado:**
IDs duplicados al cargar datos desde Google Sheets al renderizar el árbol genealógico.

## ✅ **Cambios realizados para debugging:**

### 1. **Deserializador mejorado** (`deserializeNodeFromSheet.js`)
- ✅ Maneja tanto formato nuevo (IDs limpios) como formato anterior (con comillas)
- ✅ Arrays pueden ser CSV o JSON
- ✅ Mejor manejo de errores

### 2. **Función de detección mejorada** (`treeUtils.js`)
- ✅ Muestra exactamente cuáles IDs están duplicados
- ✅ Logs detallados de todos los IDs
- ✅ Información de nodos problemáticos

### 3. **Logging adicional** (`fetchNode.js`)
- ✅ Logs del proceso de carga de datos
- ✅ Muestra headers y cantidad de filas
- ✅ Debugging de los primeros nodos

## 🔍 **Debugging paso a paso:**

### Paso 1: Refresca y observa los logs
1. Refresca tu aplicación (`Ctrl+F5`)
2. Abre la consola del navegador
3. Observa los logs de carga de datos

**Logs esperados:**
```
🔄 Cargando datos desde Google Sheets...
📊 Headers: id, pids, nombre, gender, fid, mid, ...
📝 Filas encontradas: X
🔍 Nodo 1: {id: "...", nombre: "...", rawId: "..."}
🔍 Nodo 2: {id: "...", nombre: "...", rawId: "..."}
✅ X nodos deserializados
```

### Paso 2: Si hay IDs duplicados
```
🔍 IDs duplicados encontrados: ["_abc", "_xyz"]
📋 Todos los IDs: ["_abc", "_def", "_abc", "_xyz", "_xyz"]
🗂️ Nodos con IDs duplicados: [{...}, {...}]
```

## 🛠️ **Posibles causas y soluciones:**

### Causa 1: Datos inconsistentes en Google Sheets
**Síntomas:** IDs con formato `"\"_abc\""` mezclados con IDs limpios `_abc`
**Solución:** ✅ El deserializador ahora maneja ambos formatos

### Causa 2: Filas duplicadas en Google Sheets
**Síntomas:** Mismos IDs aparecen en múltiples filas
**Solución:** Revisar Google Sheets y eliminar filas duplicadas manualmente

### Causa 3: IDs vacíos o null
**Síntomas:** Múltiples nodos con ID `""` o `null`
**Solución:** Generar IDs únicos para nodos sin ID

## 🔧 **Solución automática para IDs duplicados:**

Si quieres una solución temporal automática, agrega esto a `fetchNode.js`:

```javascript
// Al final de fetchNodesFromSheet(), antes del return:
const uniqueNodes = [];
const seenIds = new Set();

nodes.forEach(node => {
  if (!node.id || seenIds.has(node.id)) {
    // Generar nuevo ID único
    let newId;
    do {
      newId = "_" + Math.random().toString(36).substr(2, 6);
    } while (seenIds.has(newId));
    
    console.warn(`🔧 ID duplicado/vacío corregido: ${node.id} → ${newId}`);
    node.id = newId;
  }
  
  seenIds.add(node.id);
  uniqueNodes.push(node);
});

return uniqueNodes;
```

## 📊 **Información para reportar:**

Después de refrescar, comparte:

1. **Logs de carga de datos** (🔄 hasta ✅)
2. **Logs de IDs duplicados** (si aparecen)
3. **Cantidad total de nodos** cargados
4. **Primeros 3 nodos** con sus IDs raw y procesados

## 🎯 **Objetivo:**

Identificar exactamente:
- ¿Cuántos nodos hay en total?
- ¿Cuáles IDs están duplicados?
- ¿En qué formato están los IDs en Google Sheets?
- ¿Hay filas completamente duplicadas?

Con esta información podremos decidir si limpiar Google Sheets manualmente o implementar limpieza automática.
