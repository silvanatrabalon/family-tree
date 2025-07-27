import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import './AdminLogin.css';

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
    <div className="admin-modal-overlay">
      <div className="admin-modal">
        <div className="admin-modal-header">
          <h3>Acceso Administrador</h3>
          <button 
            className="admin-modal-close" 
            onClick={handleClose}
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-form-group">
            <label>Contraseña de administrador:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese la contraseña"
              required
              autoFocus
            />
          </div>
          
          {error && <div className="admin-error">{error}</div>}
          
          <div className="admin-form-actions">
            <button type="button" onClick={handleClose}>
              Cancelar
            </button>
            <button type="submit">
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
