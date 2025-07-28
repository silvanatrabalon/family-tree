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
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'tree', 'expand', 'admin'
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const navigateToLanding = () => setCurrentView('landing');
  const navigateToTree = () => setCurrentView('tree');
  const navigateToExpandTree = () => setCurrentView('expand');
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
              onNavigateToExpandTree={navigateToExpandTree}
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
                  <AdminPanel />
                </div>
              )}
              {currentView === 'admin' && (
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
                      Gestión de Evento
                    </h2>
                    <p style={{ fontSize: '18px', color: '#a1a1aa' }}>
                      Administra invitaciones, asistencias y pagos del evento familiar
                    </p>
                  </div>
                  {/* Aquí irían los componentes específicos de gestión de evento */}
                  <div style={{ 
                    background: '#2a2a2a', 
                    border: '1px solid #404040', 
                    borderRadius: '12px', 
                    padding: '2rem',
                    textAlign: 'center'
                  }}>
                    <h3 style={{ marginBottom: '1rem', color: '#ffffff' }}>Panel de Gestión de Evento</h3>
                    <p style={{ color: '#a1a1aa', marginBottom: '1.5rem' }}>
                      Desde aquí podrás gestionar:
                    </p>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                      gap: '1rem',
                      textAlign: 'left'
                    }}>
                      <div style={{ background: '#3a3a3a', padding: '1rem', borderRadius: '8px' }}>
                        <h4 style={{ color: '#6c47ff', marginBottom: '0.5rem' }}>✅ Confirmaciones</h4>
                        <p style={{ color: '#a1a1aa', fontSize: '14px' }}>Gestionar quién ha confirmado asistencia</p>
                      </div>
                      <div style={{ background: '#3a3a3a', padding: '1rem', borderRadius: '8px' }}>
                        <h4 style={{ color: '#6c47ff', marginBottom: '0.5rem' }}>📧 Invitaciones</h4>
                        <p style={{ color: '#a1a1aa', fontSize: '14px' }}>Controlar el estado de las invitaciones</p>
                      </div>
                      <div style={{ background: '#3a3a3a', padding: '1rem', borderRadius: '8px' }}>
                        <h4 style={{ color: '#6c47ff', marginBottom: '0.5rem' }}>💰 Pagos</h4>
                        <p style={{ color: '#a1a1aa', fontSize: '14px' }}>Administrar el estado de los pagos</p>
                      </div>
                    </div>
                  </div>
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
