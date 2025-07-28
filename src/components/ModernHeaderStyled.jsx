import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';

const ModernHeaderStyled = ({ currentView, onNavigateToTree, onNavigateToExpandTree, onNavigateToLanding, onShowAdminLogin, onExpandTabChange }) => {
  const { isAdminMode, logout } = useAdmin();
  const [showExpandDropdown, setShowExpandDropdown] = useState(false);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showExpandDropdown && !event.target.closest('.dropdown-container')) {
        setShowExpandDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showExpandDropdown]);

  const styles = {
    header: {
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 50,
      backgroundColor: 'rgba(26, 26, 26, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #404040'
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '1rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    logoButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      transition: 'opacity 0.3s ease'
    },
    logoIcon: {
      width: '40px',
      height: '40px',
      background: 'linear-gradient(135deg, #6c47ff 0%, #a155f9 100%)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold'
    },
    logoText: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#ffffff'
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    navButton: {
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    navButtonActive: {
      background: '#6c47ff',
      color: 'white'
    },
    navButtonInactive: {
      color: '#a1a1aa',
      background: 'transparent'
    },
    userActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    adminInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    adminLabel: {
      fontSize: '14px',
      color: '#6c47ff',
      fontWeight: '500'
    },
    ghostButton: {
      color: '#a1a1aa',
      background: 'transparent',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '14px'
    },
    mobileMenuButton: {
      display: 'none',
      padding: '0.5rem',
      color: '#a1a1aa',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer'
    },
    dropdownContainer: {
      position: 'relative'
    },
    expandButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    dropdownMenu: {
      position: 'absolute',
      top: '100%',
      left: '0',
      marginTop: '0.5rem',
      background: 'rgba(26, 26, 26, 0.95)',
      backdropFilter: 'blur(12px)',
      border: '1px solid #404040',
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      minWidth: '200px',
      zIndex: 60,
      overflow: 'hidden'
    },
    dropdownItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      background: 'transparent',
      border: 'none',
      color: '#a1a1aa',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      width: '100%',
      textAlign: 'left',
      fontSize: '14px',
      fontWeight: '500'
    },
    dropdownItemHover: {
      background: '#2a2a2a',
      color: '#ffffff'
    }
  };

  // Mobile responsive
  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    styles.nav.display = 'none';
    styles.mobileMenuButton.display = 'block';
  }

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Logo y título */}
        <button 
          onClick={onNavigateToLanding}
          style={styles.logoButton}
          onMouseEnter={(e) => {
            e.target.style.opacity = '0.8';
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = '1';
          }}
        >
          <div style={styles.logoIcon}>
            <span>FM</span>
          </div>
          <h1 style={styles.logoText}>Familia Meana</h1>
        </button>

        {/* Navegación principal */}
        <nav style={styles.nav}>
          <button 
            onClick={onNavigateToTree}
            style={{
              ...styles.navButton,
              ...(currentView === 'tree' ? styles.navButtonActive : styles.navButtonInactive)
            }}
            onMouseEnter={(e) => {
              if (currentView !== 'tree') {
                e.target.style.color = '#ffffff';
                e.target.style.background = '#2a2a2a';
              }
            }}
            onMouseLeave={(e) => {
              if (currentView !== 'tree') {
                e.target.style.color = '#a1a1aa';
                e.target.style.background = 'transparent';
              }
            }}
          >
            Árbol Familiar
          </button>
          
          {/* Menú desplegable de Expandir Árbol */}
          <div style={styles.dropdownContainer} className="dropdown-container">
            <button 
              onClick={() => {
                onNavigateToExpandTree();
                setShowExpandDropdown(!showExpandDropdown);
              }}
              style={{
                ...styles.expandButton,
                ...(currentView === 'expand' ? styles.navButtonActive : styles.navButtonInactive)
              }}
              onMouseEnter={(e) => {
                if (currentView !== 'expand') {
                  e.target.style.color = '#ffffff';
                  e.target.style.background = '#2a2a2a';
                }
              }}
              onMouseLeave={(e) => {
                if (currentView !== 'expand') {
                  e.target.style.color = '#a1a1aa';
                  e.target.style.background = 'transparent';
                }
              }}
            >
              Expandir Árbol
              <svg 
                style={{
                  width: '16px', 
                  height: '16px',
                  transform: showExpandDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showExpandDropdown && currentView === 'expand' && (
              <div style={styles.dropdownMenu}>
                <button 
                  style={styles.dropdownItem}
                  onClick={() => {
                    onExpandTabChange && onExpandTabChange('add');
                    setShowExpandDropdown(false);
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#2a2a2a';
                    e.target.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#a1a1aa';
                  }}
                >
                  <span>➕</span>
                  Agregar Persona
                </button>
                <button 
                  style={styles.dropdownItem}
                  onClick={() => {
                    onExpandTabChange && onExpandTabChange('list');
                    setShowExpandDropdown(false);
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#2a2a2a';
                    e.target.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#a1a1aa';
                  }}
                >
                  <span>📋</span>
                  Lista de Personas
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Acciones del usuario */}
        <div style={styles.userActions}>
          {isAdminMode ? (
            <div style={styles.adminInfo}>
              <span style={styles.adminLabel}>
                Modo Organizador
              </span>
              <button 
                onClick={logout}
                style={styles.ghostButton}
                onMouseEnter={(e) => {
                  e.target.style.color = '#ffffff';
                  e.target.style.background = '#2a2a2a';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#a1a1aa';
                  e.target.style.background = 'transparent';
                }}
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <button 
              onClick={onShowAdminLogin}
              style={styles.ghostButton}
              onMouseEnter={(e) => {
                e.target.style.color = '#ffffff';
                e.target.style.background = '#2a2a2a';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#a1a1aa';
                e.target.style.background = 'transparent';
              }}
            >
              Admin Evento
            </button>
          )}
          
          {/* Mobile menu button */}
          <button style={styles.mobileMenuButton}>
            <svg style={{width: '20px', height: '20px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default ModernHeaderStyled;
