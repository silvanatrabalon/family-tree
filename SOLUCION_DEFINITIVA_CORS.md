# 🆘 SOLUCIÓN DEFINITIVA CORS - Apps Script

## 🎯 **NUEVA ESTRATEGIA: GET requests**

**Problema**: Apps Script tiene problemas con CORS en peticiones POST
**Solución**: Usar peticiones GET con parámetros URL (no requiere CORS)

## ✅ **Cambios implementados:**

### 1. **Frontend (`apiConfig.js`)**
- ✅ Cambiado de POST a GET
- ✅ Datos enviados como parámetros URL
- ✅ No más headers que causen preflight

### 2. **Backend (Apps Script)**
- ✅ Función `doGet` implementada
- ✅ Parseo de parámetros URL
- ✅ Misma lógica, diferente transporte

## 🚀 **Pasos para aplicar:**

### Paso 1: Actualizar Apps Script
1. Copia el código actualizado de `apps-script/Code.gs`
2. Pégalo en tu proyecto de Google Apps Script
3. Guarda (Ctrl/Cmd + S)
4. **Re-despliega** como aplicación web:
   - Desplegar → Gestionar implementaciones
   - Editar implementación existente
   - Versión: **Nueva**
   - Implementar

### Paso 2: Probar la conexión
1. **Refresca tu app** completamente (Ctrl+F5)
2. Ve a la consola del navegador
3. Ejecuta esta prueba manual:
```javascript
fetch('https://script.google.com/macros/s/AKfycbzQpo0InAFY8P8otfj6hNkTTuT0JtnToF-3klDtClMVK-lnugddmehp1UK9Sb7woU_h/exec?action=test')
  .then(r => r.json())
  .then(console.log);
```

**Resultado esperado:** `{success: true, message: "Apps Script funcionando con GET"}`

### Paso 3: Probar agregar persona
Si el paso 2 funciona, intenta agregar una persona normalmente.

## 🎯 **Ventajas de GET requests:**

- ✅ **No CORS**: GET requests simples no requieren preflight
- ✅ **Más compatible**: Funciona en todos los navegadores
- ✅ **Más simple**: No headers complicados
- ✅ **Cacheable**: Los navegadores pueden cachear si queremos

## 🔍 **Debug logs esperados:**

```
🚀 Enviando petición a Apps Script: {action: "add-node", data: {...}}
🔗 URL construida: https://script.google.com/...?action=add-node&data=...
📡 Respuesta HTTP status: 200
✅ Respuesta de Apps Script: {success: true}
```

## ⚠️ **Si aún no funciona:**

El último recurso es usar el servidor Express temporalmente:

1. Cambia en `apiConfig.js`:
```javascript
USE_APPS_SCRIPT: false,
BASE_URL: 'http://localhost:3001'
```

2. Ejecuta el servidor:
```bash
node server.js
```

Esto te permitirá seguir trabajando mientras investigamos más opciones para Apps Script.

---

**Esta solución GET debería funcionar definitivamente** ✨
