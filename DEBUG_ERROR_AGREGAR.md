# 🔍 Debugging: Error al agregar persona

## 🚨 Problema identificado ✅
**PROBLEMA CORS**: Google Apps Script no maneja peticiones OPTIONS (preflight requests) automáticamente.

**ERROR**: `Response to preflight request doesn't pass access control check`

## ✅ SOLUCIÓN IMPLEMENTADA V2

### 1. **Cambio de estrategia para evitar preflight requests**
- ✅ Cambiado de `Content-Type: application/json` a `FormData`
- ✅ `FormData` no requiere preflight requests
- ✅ Apps Script actualizado para manejar ambos formatos

### 2. **Mejorado manejo de datos en Apps Script**
- ✅ Soporte tanto para FormData como JSON
- ✅ Logging detallado para debugging
- ✅ Mejor detección de errores

## 🛠️ Pasos para aplicar la solución

### Paso 1: Actualizar AMBOS archivos (CRÍTICO)

**A) Actualizar Apps Script:**
1. Copia el código **actualizado** de `apps-script/Code.gs`
2. Pégalo en tu proyecto de Google Apps Script
3. **Guarda** el proyecto (Ctrl/Cmd + S)
4. **Re-despliega** la aplicación web:
   - Ve a **Desplegar** → **Gestionar implementaciones**
   - Haz clic en **✏️ Editar** en tu implementación
   - Cambia la versión a **Nueva**
   - Haz clic en **Implementar**

**B) El archivo `apiConfig.js` ya está actualizado automáticamente**

### Paso 2: Probar en tu app
1. **Refresca completamente** tu aplicación web (`Ctrl+F5` o `Cmd+Shift+R`)
2. Intenta agregar una persona
3. ¡Ahora NO debería haber preflight requests! 🎉

## 🔍 Qué buscar en los logs

### En la consola del navegador:
```
🚀 Enviando petición a Apps Script: {action: "add-node", nodeData: {...}}
📡 Respuesta HTTP status: 200
✅ Respuesta de Apps Script: {success: true}
```

### En Apps Script:
```
📨 Petición recibida: add-node
➕ Agregando nuevo nodo: {id: "...", nombre: "...", ...}
📋 Valores ordenados para agregar: ["...", "...", ...]
✅ Nodo agregado exitosamente
```

## 🚩 Posibles errores y soluciones

### Error 1: "Cannot read properties of undefined"
**Causa**: Algún campo está undefined
**Solución**: Verificar que todos los campos requeridos tengan valores

### Error 2: "Invalid rowIndex"
**Causa**: Problema con la indexación de filas
**Solución**: Solo aplica a updateNode, no a addNode

### Error 3: "HTTP error! status: 403"
**Causa**: Permisos de Apps Script
**Solución**: Re-desplegar como aplicación web con acceso "Cualquier persona"

### Error 4: "Apps Script Error: ..."
**Causa**: Error específico de Google Sheets
**Solución**: Revisar logs de Apps Script para detalles

## 🎯 Prueba específica

Intenta agregar una persona con datos mínimos:
- **Nombre**: "Test"
- **Género**: "male"
- **Nacimiento**: "2000"
- **Sin relaciones** (deja tipo de relación en blanco)

Si esto funciona, el problema está en el manejo de relaciones.

## 📞 Datos para reportar

Si el problema persiste, comparte:

1. **Logs de la consola del navegador** (copiar todo)
2. **Logs de Apps Script** (ir a Ejecuciones → última ejecución)
3. **Datos exactos** que intentaste agregar
4. **Configuración** de relaciones (si las hay)

## 🔄 Rollback temporal

Si necesitas que funcione inmediatamente:

1. Cambia en `apiConfig.js`:
```javascript
USE_APPS_SCRIPT: false,
BASE_URL: 'http://localhost:3001'
```

2. Ejecuta el servidor local:
```bash
node server.js
```

Esto te permitirá seguir trabajando mientras debugueamos Apps Script.
