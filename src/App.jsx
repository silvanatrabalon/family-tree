import { useState } from 'react';
import './App.css'
import FamilyTreeView from "./components/FamilyTreeView";
import AdminPanel from "./components/AdminPanel";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import AdminLogin from "./components/AdminLogin";
import { AdminProvider } from "./context/AdminContext";

function App() {
  const [currentView, setCurrentView] = useState('tree'); // 'tree' or 'admin'
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const navigateToTree = () => setCurrentView('tree');
  const navigateToAdmin = () => setCurrentView('admin');
  const handleShowAdminLogin = () => setShowAdminLogin(true);
  const handleCloseAdminLogin = () => setShowAdminLogin(false);

  return (
    <AdminProvider>
      <div className="App">
        <Header 
          currentView={currentView}
          onNavigateToTree={navigateToTree}
          onNavigateToAdmin={navigateToAdmin}
          onShowAdminLogin={handleShowAdminLogin}
        />
        
        <main className="main-content">
          {currentView === 'tree' && (
            <>
              <Welcome />
              <FamilyTreeView />
            </>
          )}
          {currentView === 'admin' && <AdminPanel />}
        </main>
        
        <AdminLogin 
          isOpen={showAdminLogin}
          onClose={handleCloseAdminLogin}
        />
      </div>
    </AdminProvider>
  );
}

export default App
