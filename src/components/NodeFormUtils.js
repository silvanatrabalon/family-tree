// Funciones utilitarias para NodeForm
export const generateNodeId = (nodes) => {
  let newId;
  let attempts = 0;
  const maxAttempts = 10;
  
  do {
    newId = "_" + Math.random().toString(36).substr(2, 4);
    attempts++;
  } while (nodes.some(node => node.id === newId) && attempts < maxAttempts);
  
  // Si después de 10 intentos aún hay duplicado, usar timestamp
  if (attempts >= maxAttempts) {
    newId = "_" + Date.now().toString(36).substr(-4);
  }
  
  return newId;
};

export const createResetFormData = () => ({
  id: "",
  nombre: "",
  gender: "",
  nacimiento: "",
  fid: "",
  mid: "",
  pids: [],
  relationshipType: "child",
  relatedNodeId: "",
  fatherId: "",
  motherId: "",
  contacto: "",
  detalles: "",
  whatsapp: false,
  ha_sido_invitado: false,
  confirmo_asistencia: false,
  realizo_pago: false,
});

export const handleRelationshipConfiguration = (formData, nodes, relatedNodeId) => {
  const newFormData = { ...formData, relatedNodeId };

  // Configurar relaciones según el tipo
  if (formData.relationshipType === "spouse") {
    newFormData.pids = [relatedNodeId];
  } else if (formData.relationshipType === "parent") {
    // Encontrar el nodo hijo y actualizar sus padres
    const childNode = nodes.find(node => node.id === relatedNodeId);
    if (childNode) {
      newFormData.relatedNodeId = relatedNodeId;
    }
  }
  // Para "child", no hacemos nada aquí ya que se maneja con fatherId/motherId por separado

  return newFormData;
};

// Funciones para manejar la selección de padre y madre por separado
export const handleFatherChange = (formData, fatherId) => {
  return {
    ...formData,
    fatherId,
    fid: fatherId
  };
};

export const handleMotherChange = (formData, motherId) => {
  return {
    ...formData,
    motherId,
    mid: motherId
  };
};
