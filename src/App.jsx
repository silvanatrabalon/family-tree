import { useState } from 'react';
import './App.css'
import FamilyTreeView from "./components/FamilyTreeView";
import AdminPanel from "./components/AdminPanel";
import { AdminProvider } from "./context/AdminContext";

function App() {
  const [currentView, setCurrentView] = useState('tree'); // 'tree' or 'admin'

  const navigateToTree = () => setCurrentView('tree');
  const navigateToAdmin = () => setCurrentView('admin');

  return (
    <AdminProvider>
      <div className="App">
        <h1>Árbol Genealógico</h1>
        
        {currentView === 'tree' && (
          <div>
            <div className="nav-controls">
              <button 
                className="admin-button" 
                onClick={navigateToAdmin}
              >
                Panel de Administración
              </button>
            </div>
            <FamilyTreeView />
          </div>
        )}
        
        {currentView === 'admin' && (
          <AdminPanel onNavigateToTree={navigateToTree} />
        )}
      </div>
    </AdminProvider>
  );
}

export default App
