import { useState } from 'react';
import FamilyTreeView from "./components/FamilyTreeView";
import AdminPanel from "./components/AdminPanel";
import ModernHeaderStyled from "./components/ModernHeaderStyled";
import LandingPageStyled from "./components/LandingPageStyled";
import TestPage from "./components/TestPage";
import Welcome from "./components/Welcome";
import AdminLoginStyled from "./components/AdminLoginStyled";
import { AdminProvider } from "./context/AdminContext";

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'tree', 'expand'
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [expandActiveTab, setExpandActiveTab] = useState('add'); // Para controlar el tab activo en AdminPanel

  const navigateToLanding = () => setCurrentView('landing');
  const navigateToTree = () => setCurrentView('tree');
  const navigateToExpandTree = () => setCurrentView('expand');
  const navigateToApp = () => setCurrentView('tree');
  const navigateToAddPerson = () => {
    setCurrentView('expand');
    setExpandActiveTab('add');
  };
  const navigateToPersonList = () => {
    setCurrentView('expand');
    setExpandActiveTab('list');
  };
  const handleShowAdminLogin = () => setShowAdminLogin(true);
  const handleCloseAdminLogin = () => setShowAdminLogin(false);
  const handleExpandTabChange = (tab) => {
    setExpandActiveTab(tab);
    // Si cambiamos a "add", aseguramos que no haya un nodo en edición
    if (tab === 'add') {
      // El AdminPanel manejará esto internamente
    }
  };

  return (
    <AdminProvider>
      <div style={{ minHeight: '100vh', backgroundColor: '#1a1a1a', color: '#ffffff' }}>
        {currentView === 'test' ? (
          <TestPage />
        ) : currentView === 'landing' ? (
          <LandingPageStyled 
            onNavigateToApp={navigateToApp}
            onNavigateToAddPerson={navigateToAddPerson}
            onNavigateToPersonList={navigateToPersonList}
          />
        ) : (
          <>
            <ModernHeaderStyled 
              currentView={currentView}
              onNavigateToTree={navigateToTree}
              onNavigateToExpandTree={navigateToExpandTree}
              onNavigateToAddPerson={navigateToAddPerson}
              onNavigateToPersonList={navigateToPersonList}
              onNavigateToLanding={navigateToLanding}
              onShowAdminLogin={handleShowAdminLogin}
              onExpandTabChange={handleExpandTabChange}
            />
            
            <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
              {currentView === 'tree' && (
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
                  <Welcome />
                  <FamilyTreeView />
                </div>
              )}
              {currentView === 'expand' && (
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
                  <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <h2 style={{ 
                      fontSize: 'clamp(1.875rem, 5vw, 3rem)', 
                      fontWeight: 'bold', 
                      marginBottom: '1rem',
                      background: 'linear-gradient(135deg, #6c47ff 0%, #a155f9 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      Expandir Árbol Familiar
                    </h2>
                    <p style={{ fontSize: '18px', color: '#a1a1aa' }}>
                      Agrega nuevos miembros y edita información del árbol genealógico
                    </p>
                  </div>
                  <AdminPanel activeTab={expandActiveTab} onTabChange={setExpandActiveTab} />
                </div>
              )}
            </main>
          </>
        )}
        
        <AdminLoginStyled 
          isOpen={showAdminLogin}
          onClose={handleCloseAdminLogin}
        />
      </div>
    </AdminProvider>
  );
}

export default App
