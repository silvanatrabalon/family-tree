import { useState } from 'react';
import FamilyTreeView from "./components/FamilyTreeView";
import AdminPanel from "./components/AdminPanel";
import ModernHeaderStyled from "./components/ModernHeaderStyled";
import LandingPageStyled from "./components/LandingPageStyled";
import TestPage from "./components/TestPage";
import Welcome from "./components/Welcome";
import AdminLogin from "./components/AdminLogin";
import { AdminProvider } from "./context/AdminContext";

function App() {
  const [currentView, setCurrentView] = useState('landing'); // Cambiado de vuelta a 'landing'
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const navigateToLanding = () => setCurrentView('landing');
  const navigateToTree = () => setCurrentView('tree');
  const navigateToAdmin = () => setCurrentView('admin');
  const navigateToApp = () => setCurrentView('tree');
  const handleShowAdminLogin = () => setShowAdminLogin(true);
  const handleCloseAdminLogin = () => setShowAdminLogin(false);

  return (
    <AdminProvider>
      <div style={{ minHeight: '100vh', backgroundColor: '#1a1a1a', color: '#ffffff' }}>
        {currentView === 'test' ? (
          <TestPage />
        ) : currentView === 'landing' ? (
          <LandingPageStyled onNavigateToApp={navigateToApp} />
        ) : (
          <>
            <ModernHeaderStyled 
              currentView={currentView}
              onNavigateToTree={navigateToTree}
              onNavigateToAdmin={navigateToAdmin}
              onNavigateToLanding={navigateToLanding}
              onShowAdminLogin={handleShowAdminLogin}
            />
            
            <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
              {currentView === 'tree' && (
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
                  <Welcome />
                  <FamilyTreeView />
                </div>
              )}
              {currentView === 'admin' && (
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
                  <AdminPanel />
                </div>
              )}
            </main>
          </>
        )}
        
        <AdminLogin 
          isOpen={showAdminLogin}
          onClose={handleCloseAdminLogin}
        />
      </div>
    </AdminProvider>
  );
}

export default App
