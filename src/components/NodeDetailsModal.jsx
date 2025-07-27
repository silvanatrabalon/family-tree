import React from 'react';
import './NodeDetailsModal.css';

const NodeDetailsModal = ({ node, nodes, isOpen, onClose, isAdminMode = false }) => {
  if (!isOpen || !node) return null;

  // Encontrar relaciones familiares
  const father = node.fid ? nodes.find(n => n.id === node.fid) : null;
  const mother = node.mid ? nodes.find(n => n.id === node.mid) : null;
  const partners = node.pids ? node.pids.map(pid => {
    const partner = nodes.find(n => n.id === pid);
    return partner ? partner.nombre : pid;
  }).join(", ") : "";

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>
            <span className="modal-name">{node.nombre}</span>
            <span className={`gender-icon ${node.gender}`}>
              {node.gender === "male" ? "♂" : "♀"}
            </span>
          </h2>
          <button 
            className="close-button" 
            onClick={onClose}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
        
        <div className="modal-body">
          <div className="details-grid">
            <div className="detail-item">
              <label>Género:</label>
              <span>{node.gender === "male" ? "Masculino" : "Femenino"}</span>
            </div>
            
            <div className="detail-item">
              <label>Fecha de nacimiento:</label>
              <span>{node.nacimiento || "No especificada"}</span>
            </div>
            
            <div className="detail-item">
              <label>Padre:</label>
              <span>{father ? father.nombre : "No especificado"}</span>
            </div>
            
            <div className="detail-item">
              <label>Madre:</label>
              <span>{mother ? mother.nombre : "No especificada"}</span>
            </div>
            
            <div className="detail-item">
              <label>Parejas:</label>
              <span>{partners || "No especificadas"}</span>
            </div>
            
            <div className="detail-item">
              <label>Descendiente de:</label>
              <span>{node.Descendientes || "No especificado"}</span>
            </div>
            
            <div className="detail-item">
              <label>Contacto:</label>
              <span>{node.contacto || "No especificado"}</span>
            </div>
            
            {/* Campos booleanos - Solo visibles en modo admin */}
            {isAdminMode && (
              <>
                <div className="detail-item boolean-detail">
                  <label>WhatsApp:</label>
                  <span className={`status-badge ${node.whatsapp ? 'yes' : 'no'}`}>
                    {node.whatsapp ? '✅ Sí' : '❌ No'}
                  </span>
                </div>
                
                <div className="detail-item boolean-detail">
                  <label>Ha sido invitado:</label>
                  <span className={`status-badge ${node.ha_sido_invitado ? 'yes' : 'no'}`}>
                    {node.ha_sido_invitado ? '✅ Sí' : '❌ No'}
                  </span>
                </div>
                
                <div className="detail-item boolean-detail">
                  <label>Confirmó asistencia:</label>
                  <span className={`status-badge ${node.confirmo_asistencia ? 'yes' : 'no'}`}>
                    {node.confirmo_asistencia ? '✅ Sí' : '❌ No'}
                  </span>
                </div>
                
                <div className="detail-item boolean-detail">
                  <label>Realizó el pago:</label>
                  <span className={`status-badge ${node.realizo_pago ? 'yes' : 'no'}`}>
                    {node.realizo_pago ? '✅ Sí' : '❌ No'}
                  </span>
                </div>
              </>
            )}
            
            {node.detalles && (
              <div className="detail-item full-width">
                <label>Detalles:</label>
                <div className="details-text">
                  {node.detalles}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeDetailsModal;
