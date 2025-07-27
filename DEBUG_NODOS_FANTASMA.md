# 🔍 DEBUG: Nodos Fantasma

## 🚨 **Problema identificado:**
La aplicación está renderizando nodos que NO existen en Google Sheets.

## ✅ **Cambios realizados para identificar nodos fantasma:**

### 1. **Logging detallado en fetchNode.js**
- ✅ Muestra TODOS los nodos antes del filtrado
- ✅ Muestra qué nodos se eliminan y por qué
- ✅ Muestra los nodos finales que se van a renderizar

### 2. **Logging en treeInit.js**
- ✅ Muestra cuántos nodos se reciben del fetch
- ✅ Muestra cuántos nodos se inicializan en el árbol
- ✅ **DETECTA NODOS FANTASMA** comparando IDs originales vs renderizados

### 3. **Fix en familyTreeConfig.js**
- ✅ Eliminado fetch duplicado que podría causar nodos dobles
- ✅ Configuración limpia sin datos preexistentes

## 🔍 **Debugging paso a paso:**

### Paso 1: Refresca y observa los logs completos
1. Refresca tu aplicación (`Ctrl+F5` / `Cmd+R`)
2. Abre la consola del navegador
3. Busca estos logs específicos:

**Logs de carga:**
```
🔄 Cargando datos desde Google Sheets...
📝 Filas encontradas: X
🔍 DEBUGGING: Todos los nodos antes del filtrado:
  1. ID: "xxx" | Nombre: "yyy" | Válido: true/false
  2. ID: "undefined" | Nombre: "" | Válido: false
...
✅ NODOS FINALES QUE SE VAN A RENDERIZAR:
  1. ID: "xxx" | Nombre: "yyy"
  2. ID: "zzz" | Nombre: "www"
```

**Logs de inicialización:**
```
🌳 [TreeInit] Nodos recibidos para inicializar árbol: X
🌳 [TreeInit] Lista de nodos: [xxx (Nombre1), yyy (Nombre2), ...]
🌳 [TreeInit] Árbol inicializado con X nodos
```

**Logs de renderizado (CRÍTICOS):**
```
🔍 [TreeInit] Redraw event - Nodos en el árbol: [xxx, yyy, zzz, ...]
🔍 [TreeInit] Total nodos renderizados: X

// Si hay nodos fantasma:
⚠️ [TreeInit] NODOS FANTASMA DETECTADOS: X
⚠️ [TreeInit] IDs fantasma: [abc, def, ...]
👻 Nodo fantasma: {id: "abc", nombre: "...", ...}
```

## 🎯 **Posibles causas de nodos fantasma:**

### Causa 1: Librería FamilyTree agrega nodos automáticamente
**Síntomas:** Nodos con IDs que no están en Google Sheets
**Detección:** Logs muestran más nodos renderizados que cargados
**Solución:** Configurar librería para no agregar nodos automáticos

### Causa 2: Nodos padre/hijo fantasma
**Síntomas:** La librería crea nodos padres/hijos faltantes automáticamente
**Detección:** Nodos con nombres como "Unknown", "Missing", etc.
**Solución:** Revisar relaciones padre/hijo en datos

### Causa 3: Nodos de template/configuración
**Síntomas:** Nodos del template Hugo o configuración por defecto
**Detección:** IDs específicos del template
**Solución:** Limpiar configuración del template

### Causa 4: Cache o estado anterior
**Síntomas:** Nodos de sesiones anteriores persisten
**Detección:** Nodos que existían antes pero ya no están en Sheets
**Solución:** Limpiar cache/localStorage

## 🛠️ **Información que necesito:**

Después de refrescar, comparte:

1. **Logs completos de carga** (desde 🔄 hasta ✅)
2. **Logs de inicialización** (🌳 [TreeInit])
3. **Logs de renderizado** (🔍 [TreeInit] Redraw)
4. **Si aparecen nodos fantasma:** Los logs específicos de ⚠️ y 👻

## 🎯 **Objetivo:**

Identificar exactamente:
- ¿Cuántos nodos hay en Google Sheets realmente?
- ¿Cuántos se cargan y filtran?
- ¿Cuántos se inicializan en el árbol?
- ¿Cuántos se renderizan finalmente?
- ¿Cuáles son los IDs de los nodos fantasma?
- ¿De dónde vienen estos nodos fantasma?

Con esta información podremos eliminar los nodos fantasma definitivamente.

---

**¡Refresca la app y comparte todos los logs - especialmente si aparecen los avisos de nodos fantasma!** 👻🔍
