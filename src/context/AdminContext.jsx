import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);

  const login = (password) => {
    const correctPassword = 'alejandrameana';
    if (password === correctPassword) {
      setIsAdminMode(true);
      // Guardar en localStorage para persistir la sesión
      localStorage.setItem('adminSession', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminMode(false);
    localStorage.removeItem('adminSession');
  };

  // Verificar si hay una sesión guardada al cargar
  React.useEffect(() => {
    const savedSession = localStorage.getItem('adminSession');
    if (savedSession === 'true') {
      setIsAdminMode(true);
    }
  }, []);

  const value = {
    isAdminMode,
    login,
    logout
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
