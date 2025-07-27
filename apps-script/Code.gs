// Google Apps Script para Family Tree API
const SPREADSHEET_ID = '1_4ehjHFEK8IQEVo0JnyCYgEmbzNRl-Ez9aUpncANlRM';
const SHEET_NAME = 'family-tree';

// Función de prueba para verificar que todo funciona
function testFunction() {
  try {
    console.log('🚀 Iniciando prueba de Apps Script...');
    
    // Probar acceso a la hoja de cálculo
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    console.log('✅ Conexión a Google Sheets exitosa');
    console.log('📊 Nombre de la hoja:', sheet.getName());
    
    // Obtener información básica
    const lastRow = sheet.getLastRow();
    console.log('📝 Última fila con datos:', lastRow);
    
    console.log('🎉 Apps Script funcionando correctamente');
    return 'OK - Todo configurado correctamente';
    
  } catch (error) {
    console.error('❌ Error en la prueba:', error);
    return 'ERROR: ' + error.message;
  }
}

// Función principal que maneja todas las peticiones HTTP
function doPost(e) {
  try {
    console.log('📨 Petición recibida en doPost');
    console.log('📋 Parámetros recibidos:', e.parameter);
    console.log('📋 postData:', e.postData);

    let data;
    
    // Manejar diferentes tipos de datos
    if (e.parameter && e.parameter.data) {
      // FormData - evita preflight requests
      data = JSON.parse(e.parameter.data);
      console.log('📦 Datos desde FormData:', data);
    } else if (e.postData && e.postData.contents) {
      // JSON directo
      data = JSON.parse(e.postData.contents);
      console.log('📦 Datos desde JSON:', data);
    } else {
      throw new Error('No se recibieron datos válidos en la petición');
    }

    const action = data.action;
    console.log('🎯 Acción solicitada:', action);

    let result;
    switch (action) {
      case 'update-node':
        result = updateNode(data);
        break;
      case 'add-node':
        result = addNode(data);
        break;
      case 'delete-node':
        result = deleteNode(data);
        break;
      case 'get-nodes':
        result = getNodes();
        break;
      default:
        result = ContentService
          .createTextOutput(JSON.stringify({ error: 'Acción no válida: ' + action }))
          .setMimeType(ContentService.MimeType.JSON);
    }

    // Agregar headers CORS a todas las respuestas
    return result.setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });

  } catch (error) {
    console.error('❌ Error en doPost:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
  }
}

// Manejar peticiones GET (evita CORS completamente)
function doGet(e) {
  try {
    console.log('📨 Petición GET recibida');
    console.log('📋 Parámetros:', e.parameter);

    if (!e.parameter || !e.parameter.action) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Falta el parámetro action' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const action = e.parameter.action;
    let data = {};
    
    if (e.parameter.data) {
      try {
        data = JSON.parse(e.parameter.data);
      } catch (parseError) {
        console.error('❌ Error parsing data:', parseError);
        return ContentService
          .createTextOutput(JSON.stringify({ error: 'Datos JSON inválidos' }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Agregar la acción al objeto data
    data.action = action;

    console.log('🎯 Acción solicitada:', action);
    console.log('📦 Datos recibidos:', data);

    let result;
    switch (action) {
      case 'update-node':
        result = updateNode(data);
        break;
      case 'add-node':
        result = addNode(data);
        break;
      case 'delete-node':
        result = deleteNode(data);
        break;
      case 'get-nodes':
        result = getNodes();
        break;
      case 'test':
        result = ContentService
          .createTextOutput(JSON.stringify({ success: true, message: 'Apps Script funcionando con GET' }))
          .setMimeType(ContentService.MimeType.JSON);
        break;
      default:
        result = ContentService
          .createTextOutput(JSON.stringify({ error: 'Acción no válida: ' + action }))
          .setMimeType(ContentService.MimeType.JSON);
    }

    return result;

  } catch (error) {
    console.error('❌ Error en doGet:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Actualizar un nodo existente
function updateNode(data) {
  try {
    const { rowIndex, nodeData } = data;
    
    console.log('📝 Actualizando nodo:', { rowIndex, nodeData });
    
    if (!rowIndex || rowIndex < 2) {
      throw new Error("Invalid rowIndex");
    }

    const orderedValues = [
      nodeData.id || '',
      Array.isArray(nodeData.pids) ? nodeData.pids.join(',') : (nodeData.pids || ''),
      nodeData.nombre || '',
      nodeData.gender || '',
      nodeData.fid || '',
      nodeData.mid || '',
      nodeData.nacimiento || '',
      nodeData.Descendientes || '',
      Array.isArray(nodeData.tags) ? nodeData.tags.join(',') : (nodeData.tags || ''),
      nodeData.contacto || '',
      nodeData.detalles || '',
      nodeData.whatsapp || false,
      nodeData.ha_sido_invitado || false,
      nodeData.confirmo_asistencia || false,
      nodeData.realizo_pago || false
    ];

    console.log('📋 Valores ordenados para actualizar:', orderedValues);

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    const range = sheet.getRange(rowIndex, 1, 1, orderedValues.length);
    range.setValues([orderedValues]);

    console.log('✅ Nodo actualizado exitosamente');

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('❌ Error en updateNode:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Agregar un nuevo nodo
function addNode(data) {
  try {
    const { nodeData } = data;
    
    console.log('➕ Agregando nuevo nodo:', nodeData);
    
    // Los datos ya vienen serializados desde el frontend, usarlos directamente
    const orderedValues = [
      nodeData.id || '""',
      nodeData.pids || '[]',
      nodeData.nombre || '',
      nodeData.gender || '',
      nodeData.fid || '""',
      nodeData.mid || '""',
      nodeData.nacimiento || '',
      nodeData.Descendientes || '',
      nodeData.tags || '[]',
      nodeData.contacto || '',
      nodeData.detalles || '',
      nodeData.whatsapp || false,
      nodeData.ha_sido_invitado || false,
      nodeData.confirmo_asistencia || false,
      nodeData.realizo_pago || false
    ];

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    
    // Método más robusto: encontrar la última fila con datos en la columna ID (columna A)
    const allData = sheet.getDataRange().getValues();
    let lastRowWithData = 0;
    
    for (let i = 0; i < allData.length; i++) {
      // Si la fila tiene un ID (columna A no está vacía), es una fila con datos
      if (allData[i][0] && allData[i][0].toString().trim() !== '') {
        lastRowWithData = i + 1; // +1 porque getValues() es 0-indexed pero las filas son 1-indexed
      }
    }
    
    const nextRow = lastRowWithData + 1;
    
    // Insertar en la fila específica en lugar de usar appendRow
    const range = sheet.getRange(nextRow, 1, 1, orderedValues.length);
    range.setValues([orderedValues]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('❌ Error en addNode:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Eliminar un nodo
function deleteNode(data) {
  try {
    const { rowIndex } = data;
    
    console.log('🗑️ Eliminando nodo en fila:', rowIndex);
    
    if (!rowIndex || rowIndex < 2) {
      throw new Error("Invalid rowIndex");
    }

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    sheet.deleteRow(rowIndex);

    console.log('✅ Nodo eliminado exitosamente');

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('❌ Error en deleteNode:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Obtener todos los nodos (opcional, para futuro uso)
function getNodes() {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    // Convertir a formato JSON con headers
    const headers = data[0];
    const rows = data.slice(1).map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, data: rows }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('Error en getNodes:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Función de prueba para verificar que todo funciona
function testFunction() {
  console.log('Apps Script funcionando correctamente');
  return 'OK';
}
