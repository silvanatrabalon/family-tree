import React from 'react';
import { useAdmin } from '../context/AdminContext';

const ModernHeader = ({ currentView, onNavigateToTree, onNavigateToAdmin, onNavigateToLanding, onShowAdminLogin }) => {
  const { isAdminMode, logout } = useAdmin();

  return (
    <header className="fixed top-0 w-full z-50 bg-dark-primary/80 backdrop-blur-md border-b border-border-primary">
      <div className="section-container py-4">
        <div className="flex items-center justify-between">
          {/* Logo y título */}
          <button 
            onClick={onNavigateToLanding}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">FM</span>
            </div>
            <h1 className="text-xl font-bold text-text-primary">Familia Meana</h1>
          </button>

          {/* Navegación principal */}
          <nav className="hidden md:flex items-center space-x-1">
            <button 
              onClick={onNavigateToTree}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentView === 'tree' 
                  ? 'bg-accent-primary text-white' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-dark-secondary'
              }`}
            >
              Árbol Familiar
            </button>
            
            {isAdminMode && (
              <button 
                onClick={onNavigateToAdmin}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  currentView === 'admin' 
                    ? 'bg-accent-primary text-white' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-dark-secondary'
                }`}
              >
                Administrar
              </button>
            )}
          </nav>

          {/* Acciones del usuario */}
          <div className="flex items-center space-x-3">
            {isAdminMode ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-accent-primary font-medium">
                  Modo Admin
                </span>
                <button 
                  onClick={logout}
                  className="btn-ghost text-sm"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <button 
                onClick={onShowAdminLogin}
                className="btn-ghost text-sm"
              >
                Admin
              </button>
            )}
            
            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-text-secondary hover:text-text-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ModernHeader;
