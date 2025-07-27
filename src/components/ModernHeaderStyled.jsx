import React from 'react';
import { useAdmin } from '../context/AdminContext';

const ModernHeaderStyled = ({ currentView, onNavigateToTree, onNavigateToExpandTree, onNavigateToLanding, onShowAdminLogin }) => {
  const { isAdminMode, logout } = useAdmin();

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
          
          <button 
            onClick={onNavigateToExpandTree}
            style={{
              ...styles.navButton,
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
          </button>
        </nav>

        {/* Acciones del usuario */}
        <div style={styles.userActions}>
          {isAdminMode ? (
            <div style={styles.adminInfo}>
              <span style={styles.adminLabel}>
                Organizador de Evento
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
