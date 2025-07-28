// Lógica de validación para el formulario
export const validateFormData = (formData, editNode) => {
  const errors = [];
  
  if (!formData.nombre.trim()) {
    errors.push("El nombre es obligatorio");
  }
  
  if (!formData.gender) {
    errors.push("El género es obligatorio");
  }
  
  if (!editNode) {
    if (!formData.relationshipType) {
      errors.push("El tipo de relación es obligatorio");
    }
    
    if (!formData.relatedNodeId) {
      errors.push("Debe seleccionar una persona relacionada");
    }
  }
  
  return errors;
};

// Configurar mensajes de validación HTML5 personalizados
export const setupCustomValidityMessages = (editNode) => {
  const setCustomValidityMessages = () => {
    const nombreInput = document.getElementById('nombre');
    const genderSelect = document.getElementById('gender');
    const relationshipSelect = document.getElementById('relationshipType');
    
    if (nombreInput) {
      nombreInput.addEventListener('invalid', function() {
        if (this.validity.valueMissing) {
          this.setCustomValidity('Por favor ingrese el nombre completo');
        }
      });
      nombreInput.addEventListener('input', function() {
        this.setCustomValidity('');
      });
    }
    
    if (genderSelect) {
      genderSelect.addEventListener('invalid', function() {
        if (this.validity.valueMissing) {
          this.setCustomValidity('Por favor seleccione el género');
        }
      });
      genderSelect.addEventListener('change', function() {
        this.setCustomValidity('');
      });
    }
    
    if (relationshipSelect) {
      relationshipSelect.addEventListener('invalid', function() {
        if (this.validity.valueMissing) {
          this.setCustomValidity('Por favor seleccione el tipo de relación');
        }
      });
      relationshipSelect.addEventListener('change', function() {
        this.setCustomValidity('');
      });
    }
  };

  const timeoutId = setTimeout(setCustomValidityMessages, 100);
  return () => clearTimeout(timeoutId);
};
