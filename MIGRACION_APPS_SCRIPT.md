# Migración de Express Server a Google Apps Script

Este documento explica cómo migrar el servidor Express a Google Apps Script para hacer la aplicación completamente estática.

## ✅ Lo que ya está hecho

1. **Código de Apps Script creado** (`apps-script/Code.gs`)
2. **Cliente actualizado** para soportar tanto Apps Script como Express
3. **Configuración centralizada** en `src/utils/apiConfig.js`

## 🚀 Pasos para completar la migración

### 1. Desplegar en Google Apps Script

1. Ve a [Google Apps Script](https://script.google.com/)
2. Crea un nuevo proyecto
3. Reemplaza el contenido de `Code.gs` con el código de `apps-script/Code.gs`
4. Guarda el proyecto (Ctrl/Cmd + S)

### 2. Configurar el proyecto

1. En el editor de Apps Script, ve a **Configuración del proyecto** (ícono de engranaje en la barra lateral izquierda)
2. Busca "ID del script" y cópialo (lo necesitarás más tarde para la URL)
3. **Nota**: Los servicios (APIs) ahora se detectan automáticamente cuando usas `SpreadsheetApp` en tu código, ya no necesitas agregarlos manualmente

### 3. Configurar permisos

1. En Apps Script, ve a **Editor**
2. En el selector de funciones (arriba), selecciona `testFunction` (NO `doPost`)
3. Haz clic en **Ejecutar** (▶️)
4. Autoriza los permisos cuando se solicite:
   - Acceso a Google Sheets
   - Acceso a ejecutar como aplicación web
5. Verifica en los **logs** que aparezca "✅ Apps Script funcionando correctamente"

**⚠️ Importante**: `doPost` solo funciona cuando recibe peticiones HTTP, NO cuando se ejecuta manualmente

### 4. Desplegar como aplicación web

1. En Apps Script, haz clic en **Desplegar** → **Nueva implementación**
2. Selecciona **Aplicación web** como tipo
3. Configura:
   - **Descripción**: "Family Tree API"
   - **Ejecutar como**: Tu cuenta
   - **Acceso**: "Cualquier persona" (para permitir CORS)
4. Haz clic en **Implementar**
5. **¡IMPORTANTE!** Copia la URL de la aplicación web

### 5. Actualizar la configuración en tu app

1. Abre `src/utils/apiConfig.js`
2. Reemplaza `TU_APPS_SCRIPT_URL_AQUI` con la URL que copiaste
3. Asegúrate de que `USE_APPS_SCRIPT: true`

```javascript
export const API_CONFIG = {
  // Reemplaza con tu URL de Apps Script
  BASE_URL: 'https://script.google.com/macros/s/TU_SCRIPT_ID/exec',
  USE_APPS_SCRIPT: true
};
```

### 6. Probar la migración

1. Detén el servidor Express (si está corriendo)
2. Abre tu aplicación
3. Prueba agregar, editar y eliminar nodos
4. Verifica que los cambios se reflejen en Google Sheets

## 🔧 Configuración para diferentes entornos

### Desarrollo (con servidor local)
```javascript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3001',
  USE_APPS_SCRIPT: false
};
```

### Producción (con Apps Script)
```javascript
export const API_CONFIG = {
  BASE_URL: 'https://script.google.com/macros/s/TU_SCRIPT_ID/exec',
  USE_APPS_SCRIPT: true
};
```

## 📊 Diferencias entre Express y Apps Script

| Aspecto | Express Server | Google Apps Script |
|---------|----------------|-------------------|
| Hosting | Requiere servidor | Gratuito en Google |
| CORS | Configurado manualmente | Manejado en el código |
| Autenticación | Service Account JSON | Automática (OAuth) |
| Escalabilidad | Limitada por servidor | Auto-escalable |
| Costo | Hosting requerido | Gratis (con límites) |

## 🎯 Ventajas de Apps Script

1. **Sin servidor**: No necesitas hostear nada
2. **Gratuito**: Dentro de los límites de Google
3. **Integración nativa**: Acceso directo a Google Sheets
4. **Seguridad**: No necesitas manejar credenciales en el cliente
5. **Escalabilidad**: Google maneja el scaling automáticamente

## 🚨 Consideraciones importantes

1. **Límites de Apps Script**:
   - 6 minutos máximo por ejecución
   - 20,000 triggers por día
   - 100 ejecuciones simultáneas

2. **Latencia**: Apps Script puede ser más lento que un servidor dedicado

3. **Debugging**: Usar `console.log()` en Apps Script para debug

## 🔄 Rollback (si algo sale mal)

Si necesitas volver al servidor Express:

1. Cambia `USE_APPS_SCRIPT` a `false` en `apiConfig.js`
2. Actualiza `BASE_URL` a `http://localhost:3001`
3. Inicia el servidor Express con `npm run dev` o `node server.js`

## 📝 Archivos modificados

- ✅ `src/utils/apiConfig.js` - Nueva configuración de API
- ✅ `src/components/events/api/updateNode.js` - Actualizado
- ✅ `src/components/events/api/addNode.js` - Actualizado  
- ✅ `src/components/events/api/deleteNode.js` - Actualizado
- ✅ `apps-script/Code.gs` - Nuevo código para Apps Script

## 🎉 Resultado final

Una vez completada la migración:
- ✅ No necesitarás el archivo `server.js`
- ✅ No necesitarás el archivo de credenciales JSON
- ✅ Podrás desplegar como sitio estático (Netlify, Vercel, GitHub Pages)
- ✅ La app será completamente independiente del servidor
