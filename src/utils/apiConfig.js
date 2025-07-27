// Configuración para la API
// Cambiar esta URL por la URL de tu Google Apps Script desplegado
export const API_CONFIG = {
  // Para desarrollo local (comentar cuando uses Apps Script)
  // BASE_URL: 'http://localhost:3001',
  
  // Para producción con Apps Script (descomentar y reemplazar con tu URL)
  BASE_URL: 'https://script.google.com/macros/s/AKfycbzQpo0InAFY8P8otfj6hNkTTuT0JtnToF-3klDtClMVK-lnugddmehp1UK9Sb7woU_h/exec',
  
  // Indica si usar Apps Script (true) o servidor local (false)
  USE_APPS_SCRIPT: true
};

// Función helper para hacer requests a Apps Script
export const makeApiRequest = async (action, data = {}) => {
  try {
    const requestData = {
      action: action,
      ...data
    };

    console.log('🚀 Enviando petición a Apps Script:', { action, data });

    // Estrategia 1: Usar parámetros GET para evitar CORS completamente
    const params = new URLSearchParams();
    params.append('action', action);
    params.append('data', JSON.stringify(data));

    const url = `${API_CONFIG.BASE_URL}?${params.toString()}`;
    console.log('🔗 URL construida:', url);

    const response = await fetch(url, {
      method: 'GET'
    });

    console.log('📡 Respuesta HTTP status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error HTTP:', errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('✅ Respuesta de Apps Script:', result);

    // Verificar si Apps Script devolvió un error
    if (result.error) {
      console.error('❌ Error desde Apps Script:', result.error);
      throw new Error(`Apps Script Error: ${result.error}`);
    }

    return result;
  } catch (error) {
    console.error('❌ Error completo en makeApiRequest:', error);
    throw error;
  }
};

// Función helper para requests del servidor Express (legacy)
export const makeExpressRequest = async (endpoint, data = {}) => {
  const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
