import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

const AdminLogin = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="card max-w-md w-full mx-4 p-0 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border-primary">
          <h3 className="text-lg font-semibold text-text-primary">Acceso Administrador</h3>
          <button 
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-dark-tertiary transition-colors text-text-secondary hover:text-text-primary"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Contraseña de administrador:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese la contraseña"
              required
              autoFocus
              className="w-full px-4 py-3 bg-dark-tertiary border border-border-primary rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary transition-colors"
            />
          </div>
          
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <div className="flex space-x-3 pt-4">
            <button 
              type="button" 
              onClick={handleClose}
              className="btn-secondary flex-1"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="btn-primary flex-1"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
