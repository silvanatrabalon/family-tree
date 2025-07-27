import React from 'react';
import { useAdmin } from '../context/AdminContext';
import './Header.css';

const Header = ({ currentView, onNavigateToTree, onNavigateToAdmin, onShowAdminLogin }) => {
  const { isAdminMode, logout } = useAdmin();

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Logo y título */}
        <div className="header-brand">
          <h1 className="app-title">Familia Meana</h1>
        </div>

        {/* Navegación principal */}
        <nav className="main-nav">
          <button 
            className={`nav-item ${currentView === 'tree' ? 'active' : ''}`}
            onClick={onNavigateToTree}
          >
            <span className="nav-icon">🌲</span>
            <span className="nav-text">Árbol Familiar</span>
          </button>
          
          <button 
            className={`nav-item ${currentView === 'admin' ? 'active' : ''}`}
            onClick={onNavigateToAdmin}
          >
            <span className="nav-icon">⚙️</span>
            <span className="nav-text">Modificar</span>
          </button>
        </nav>

        {/* Sección de admin */}
        <div className="admin-section">
          {isAdminMode ? (
            <div className="admin-status">
              <span className="admin-badge">
                <span>Admin</span>
              </span>
              <button 
                className="logout-btn"
                onClick={logout}
                title="Salir de modo admin"
              >
                <span className="logout-icon">✕</span>
              </button>
            </div>
          ) : (
            <button 
              className="admin-login-btn"
              onClick={onShowAdminLogin}
              title="Acceder al modo administrador"
            >
              <span className="key-icon">🔑</span>
              <span>Modo Admin</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
