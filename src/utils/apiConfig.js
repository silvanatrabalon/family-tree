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
  if (USE_APPS_SCRIPT) {
    const payload = {
      action,
      data: JSON.stringify(data)
    };
    
    let url = `${APPS_SCRIPT_URL}?${new URLSearchParams(payload)}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();

      if (result.success === false) {
        throw new Error(result.error || 'Apps Script returned error');
      }

      return result;
    } catch (error) {
      throw new Error(`API request failed: ${error.message}`);
    }
  } else {
    // Express logic
    const response = await fetch(`${EXPRESS_URL}/${action}`, {
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
