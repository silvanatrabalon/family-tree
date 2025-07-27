import { useState } from 'react';
import './App.css'
import FamilyTreeView from "./components/FamilyTreeView";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [currentView, setCurrentView] = useState('tree'); // 'tree' or 'admin'

  const navigateToTree = () => setCurrentView('tree');
  const navigateToAdmin = () => setCurrentView('admin');

  return (
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
  );
}

export default App
