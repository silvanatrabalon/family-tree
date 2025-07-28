import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

const AdminLoginStyled = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAdmin();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(password);
    
    if (success) {
      setPassword('');
      setError('');
      onClose();
    } else {
      setError('Contraseña incorrecta');
      setPassword('');
    }
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    setShowPassword(false);
    onClose();
  };

  if (!isOpen) return null;

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)'
    },
    modal: {
      backgroundColor: '#2a2a2a',
      border: '1px solid #404040',
      borderRadius: '12px',
      maxWidth: '28rem',
      width: '100%',
      margin: '0 1rem',
      padding: 0,
      overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.5rem',
      borderBottom: '1px solid #404040'
    },
    title: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#ffffff'
    },
    closeButton: {
      width: '32px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#a1a1aa',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    form: {
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#a1a1aa',
      marginBottom: '0.5rem'
    },
    input: {
      width: '100%',
      padding: '0.75rem 3rem 0.75rem 1rem',
      backgroundColor: '#3a3a3a',
      border: '1px solid #404040',
      borderRadius: '8px',
      color: '#ffffff',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      outline: 'none'
    },
    inputContainer: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    toggleButton: {
      position: 'absolute',
      right: '0.75rem',
      background: 'transparent',
      border: 'none',
      color: '#a1a1aa',
      cursor: 'pointer',
      padding: '0.25rem',
      borderRadius: '4px',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputFocus: {
      borderColor: '#6c47ff',
      boxShadow: '0 0 0 3px rgba(108, 71, 255, 0.1)'
    },
    error: {
      padding: '0.75rem',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.2)',
      borderRadius: '8px',
      color: '#f87171',
      fontSize: '14px'
    },
    buttonGroup: {
      display: 'flex',
      gap: '0.75rem',
      paddingTop: '1rem'
    },
    button: {
      flex: 1,
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '14px'
    },
    cancelButton: {
      backgroundColor: '#2a2a2a',
      border: '1px solid #404040',
      color: '#ffffff'
    },
    submitButton: {
      background: 'linear-gradient(135deg, #6c47ff 0%, #a155f9 100%)',
      color: 'white',
      boxShadow: '0 4px 14px 0 rgba(108, 71, 255, 0.25)'
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3 style={styles.title}>Acceso Administrador de Evento</h3>
          <button 
            onClick={handleClose}
            style={styles.closeButton}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#3a3a3a';
              e.target.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#a1a1aa';
            }}
          >
            <svg style={{width: '20px', height: '20px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Contraseña del organizador del evento:
            </label>
            <div style={styles.inputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese la contraseña"
                required
                autoFocus
                style={styles.input}
                onFocus={(e) => {
                  e.target.style.borderColor = '#6c47ff';
                  e.target.style.boxShadow = '0 0 0 3px rgba(108, 71, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#404040';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.toggleButton}
                onMouseEnter={(e) => {
                  e.target.style.color = '#ffffff';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#a1a1aa';
                  e.target.style.backgroundColor = 'transparent';
                }}
                title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? (
                  // Icono de ojo cerrado
                  <svg style={{width: '20px', height: '20px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  // Icono de ojo abierto
                  <svg style={{width: '20px', height: '20px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}
          
          <div style={styles.buttonGroup}>
            <button 
              type="button" 
              onClick={handleClose}
              style={{...styles.button, ...styles.cancelButton}}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#3a3a3a';
                e.target.style.borderColor = '#525252';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#2a2a2a';
                e.target.style.borderColor = '#404040';
              }}
            >
              Cancelar
            </button>
            <button 
              type="submit"
              style={{...styles.button, ...styles.submitButton}}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 8px 25px 0 rgba(108, 71, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 14px 0 rgba(108, 71, 255, 0.25)';
              }}
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginStyled;
