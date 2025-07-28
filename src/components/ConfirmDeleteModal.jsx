import React from 'react';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, personName, isLoading = false }) => {
  if (!isOpen) return null;

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.2s ease-out'
    },
    modal: {
      background: 'linear-gradient(to bottom, #1a1a1a 0%, #2a2a2a 100%)',
      borderRadius: '16px',
      border: '1px solid #404040',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
      padding: '32px',
      maxWidth: '400px',
      width: '90%',
      textAlign: 'center',
      animation: 'slideIn 0.3s ease-out'
    },
    iconContainer: {
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 24px auto',
      fontSize: '28px'
    },
    title: {
      color: '#ffffff',
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '12px',
      letterSpacing: '-0.025em'
    },
    message: {
      color: '#a1a1aa',
      fontSize: '16px',
      lineHeight: '1.5',
      marginBottom: '32px'
    },
    personName: {
      color: '#ffffff',
      fontWeight: '600'
    },
    buttonContainer: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center'
    },
    cancelButton: {
      background: 'transparent',
      color: '#a1a1aa',
      border: '1px solid #404040',
      padding: '12px 24px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      minWidth: '100px'
    },
    confirmButton: {
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      color: '#ffffff',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      minWidth: '100px',
      position: 'relative'
    },
    confirmButtonDisabled: {
      background: '#6b7280',
      cursor: 'not-allowed'
    },
    loadingSpinner: {
      width: '16px',
      height: '16px',
      border: '2px solid transparent',
      borderTop: '2px solid #ffffff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      display: 'inline-block'
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  const handleCancel = () => {
    if (!isLoading) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (!isLoading) {
      onConfirm();
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideIn {
            from { 
              opacity: 0; 
              transform: translateY(-20px) scale(0.95); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0) scale(1); 
            }
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={modalStyles.overlay} onClick={handleOverlayClick}>
        <div style={modalStyles.modal}>
          <div style={modalStyles.iconContainer}>
            🗑️
          </div>
          
          <h3 style={modalStyles.title}>
            Confirmar Eliminación
          </h3>
          
          <p style={modalStyles.message}>
            ¿Estás seguro de que quieres eliminar a{' '}
            <span style={modalStyles.personName}>{personName}</span>?
            <br />
            <br />
            Esta acción no se puede deshacer.
          </p>
          
          <div style={modalStyles.buttonContainer}>
            <button
              style={modalStyles.cancelButton}
              onClick={handleCancel}
              disabled={isLoading}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.background = '#2a2a2a';
                  e.target.style.color = '#ffffff';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#a1a1aa';
                }
              }}
            >
              Cancelar
            </button>
            
            <button
              style={{
                ...modalStyles.confirmButton,
                ...(isLoading ? modalStyles.confirmButtonDisabled : {})
              }}
              onClick={handleConfirm}
              disabled={isLoading}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {isLoading ? (
                <>
                  <span style={modalStyles.loadingSpinner}></span>
                  <span style={{ marginLeft: '8px' }}>Eliminando...</span>
                </>
              ) : (
                'Eliminar'
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmDeleteModal;
