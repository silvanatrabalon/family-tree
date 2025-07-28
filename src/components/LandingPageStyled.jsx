import React, { useState } from 'react';

const LandingPageStyled = ({ onNavigateToApp, onNavigateToAddPerson, onNavigateToPersonList }) => {
  const [showExpandDropdown, setShowExpandDropdown] = useState(false);  // Cerrado por defecto
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, Inter, "Segoe UI", sans-serif'
    },
    nav: {
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 50,
      backgroundColor: 'rgba(26, 26, 26, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #404040'
    },
    navContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '1rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    logoIcon: {
      width: '32px',
      height: '32px',
      background: 'linear-gradient(135deg, #6c47ff 0%, #a155f9 100%)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '14px'
    },
    logoText: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#ffffff'
    },
    navButtons: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem'
    },
    btnGhost: {
      color: '#a1a1aa',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontWeight: '500',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    btnPrimary: {
      background: 'linear-gradient(135deg, #6c47ff 0%, #a155f9 100%)',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      transform: 'translateY(0)',
      boxShadow: '0 4px 14px 0 rgba(108, 71, 255, 0.25)'
    },
    dropdownContainer: {
      position: 'relative'
    },
    expandButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#a1a1aa',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontWeight: '500',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    dropdownMenu: {
      position: 'absolute',
      top: '100%',
      left: '0',
      marginTop: '0.5rem',
      background: 'rgba(26, 26, 26, 0.95)',
      backdropFilter: 'blur(12px)',
      border: '1px solid #404040',
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      minWidth: '200px',
      zIndex: 60,
      overflow: 'hidden'
    },
    dropdownItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      background: 'transparent',
      border: 'none',
      color: '#a1a1aa',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      width: '100%',
      textAlign: 'left',
      fontSize: '14px',
      fontWeight: '500'
    },
    heroSection: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '80px'
    },
    heroContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1.5rem',
      textAlign: 'center'
    },
    heroContent: {
      maxWidth: '1024px',
      margin: '0 auto'
    },
    heroTitle: {
      fontSize: 'clamp(3rem, 8vw, 7rem)',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      lineHeight: '1.1'
    },
    gradientText: {
      background: 'linear-gradient(135deg, #6c47ff 0%, #a155f9 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      display: 'block'
    },
    heroSubtitle: {
      fontSize: 'clamp(1.25rem, 4vw, 2rem)',
      color: '#a1a1aa',
      marginBottom: '2rem',
      maxWidth: '512px',
      margin: '0 auto 2rem auto'
    },
    heroButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      justifyContent: 'center',
      alignItems: 'center'
    },
    btnLarge: {
      fontSize: '18px',
      padding: '1rem 2rem'
    },
    btnSecondary: {
      background: '#2a2a2a',
      border: '1px solid #404040',
      color: '#ffffff',
      padding: '1rem 2rem',
      borderRadius: '8px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '18px'
    },
    backgroundBlur1: {
      position: 'absolute',
      top: '25%',
      left: '25%',
      width: '288px',
      height: '288px',
      background: 'rgba(108, 71, 255, 0.1)',
      borderRadius: '50%',
      filter: 'blur(48px)',
      zIndex: -1
    },
    backgroundBlur2: {
      position: 'absolute',
      bottom: '25%',
      right: '25%',
      width: '384px',
      height: '384px',
      background: 'rgba(161, 85, 249, 0.1)',
      borderRadius: '50%',
      filter: 'blur(48px)',
      zIndex: -1
    },
    featuresSection: {
      padding: '5rem 0',
      background: 'rgba(42, 42, 42, 0.5)'
    },
    sectionContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1.5rem'
    },
    sectionHeader: {
      textAlign: 'center',
      marginBottom: '4rem'
    },
    sectionTitle: {
      fontSize: 'clamp(2.5rem, 6vw, 5rem)',
      fontWeight: 'bold',
      marginBottom: '1rem'
    },
    sectionSubtitle: {
      fontSize: '20px',
      color: '#a1a1aa',
      maxWidth: '512px',
      margin: '0 auto'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem'
    },
    featureCard: {
      background: '#2a2a2a',
      border: '1px solid #404040',
      borderRadius: '12px',
      padding: '1.5rem',
      transition: 'all 0.3s ease'
    },
    featureIcon: {
      width: '48px',
      height: '48px',
      background: 'linear-gradient(135deg, #6c47ff 0%, #a155f9 100%)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1rem',
      fontSize: '24px'
    },
    featureTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '0.75rem'
    },
    featureDescription: {
      color: '#a1a1aa'
    },
    ctaSection: {
      padding: '5rem 0',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #6c47ff 50%, #a155f9 100%)',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    ctaTitle: {
      fontSize: 'clamp(2.5rem, 6vw, 5rem)',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '1.5rem'
    },
    ctaSubtitle: {
      fontSize: '20px',
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: '2rem',
      maxWidth: '512px',
      margin: '0 auto 2rem auto'
    },
    ctaButton: {
      background: 'white',
      color: '#6c47ff',
      padding: '1rem 2rem',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '18px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    footer: {
      padding: '3rem 0',
      background: '#2a2a2a',
      borderTop: '1px solid #404040'
    },
    footerContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem'
    },
    footerText: {
      color: '#a1a1aa',
      fontSize: '14px'
    }
  };

  // Media queries for responsive design
  const isMobile = window.innerWidth < 640;
  
  if (isMobile) {
    styles.heroButtons.flexDirection = 'column';
    styles.navButtons.gap = '1rem';
    styles.footerContent.flexDirection = 'column';
  } else {
    styles.heroButtons.flexDirection = 'row';
    styles.footerContent.flexDirection = 'row';
  }

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navContainer}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>
              <span>FM</span>
            </div>
            <span style={styles.logoText}>Familia Meana</span>
          </div>
          <div style={styles.navButtons}>
            <button 
              onClick={() => onNavigateToApp()}
                            style={styles.btnPrimary}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px 0 rgba(108, 71, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 14px 0 rgba(108, 71, 255, 0.25)';
              }}

            >
              Árbol Familiar
            </button>
            {/* Menú desplegable de Expandir Árbol */}
            <div style={styles.dropdownContainer}>
              <button 
                onClick={() => setShowExpandDropdown(!showExpandDropdown)}
                style={styles.expandButton}
                onMouseEnter={(e) => {
                  e.target.style.color = '#ffffff';
                  e.target.style.background = '#2a2a2a';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#a1a1aa';
                  e.target.style.background = 'transparent';
                }}
              >
                Expandir
                <svg 
                  style={{
                    width: '16px', 
                    height: '16px',
                    transform: showExpandDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showExpandDropdown && (
                <div style={styles.dropdownMenu}>
                  <button 
                    style={styles.dropdownItem}
                    onClick={() => {
                      onNavigateToAddPerson();
                      setShowExpandDropdown(false);
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#2a2a2a';
                      e.target.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#a1a1aa';
                    }}
                  >
                    <span>➕</span>
                    Agregar Persona
                  </button>
                  <button 
                    style={styles.dropdownItem}
                    onClick={() => {
                      onNavigateToPersonList();
                      setShowExpandDropdown(false);
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#2a2a2a';
                      e.target.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#a1a1aa';
                    }}
                  >
                    <span>📋</span>
                    Lista de Personas
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContainer}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              Descubre la
              <span style={styles.gradientText}>Familia Meana</span>
            </h1>
            <p style={styles.heroSubtitle}>
              Explora, conecta y preserva las historias de la familia Meana.
            </p>
            <div style={styles.heroButtons}>
              <button 
                onClick={() => onNavigateToApp()}
                style={{...styles.btnPrimary, ...styles.btnLarge}}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px 0 rgba(108, 71, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 14px 0 rgba(108, 71, 255, 0.25)';
                }}
              >
                Explorar Árbol Familiar
              </button>
              {/* <button 
                style={styles.btnSecondary}
                onMouseEnter={(e) => {
                  e.target.style.background = '#3a3a3a';
                  e.target.style.borderColor = '#525252';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#2a2a2a';
                  e.target.style.borderColor = '#404040';
                }}
              >
                Conoce Más
              </button> */}
            </div>
          </div>
        </div>
        
        {/* Background elements */}
        <div style={styles.backgroundBlur1}></div>
        <div style={styles.backgroundBlur2}></div>
      </section>

      {/* Event Invitation Section */}
      <section style={styles.featuresSection}>
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={{...styles.sectionTitle, background: 'linear-gradient(135deg, #6c47ff 0%, #a155f9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              Juntada Familiar Asado a la Estaca
            </h2>
            <div style={{...styles.sectionSubtitle, fontSize: '20px', fontWeight: '600', marginBottom: '2rem'}}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '0.5rem'}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6c47ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>Domingo 14 de Septiembre, de 10hs a 18hs</span>
              </div>
              <div style={{display: 'flex', paddingRight: '1rem'}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6c47ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Campo Amudoch - Ruta 11 KM 1001, Resistencia, Chaco</span>
              </div>
            </div>
          </div>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem'}}>
            {/* Qué debe llevar cada familia */}
            <div style={styles.featureCard}>
              <div style={{...styles.featureIcon, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}>
                <span>�</span>
              </div>
              <h3 style={styles.featureTitle}>¿Qué debe llevar cada familia?</h3>
              <ul style={{...styles.featureDescription, textAlign: 'left', paddingLeft: '1rem', lineHeight: '1.8'}}>
                <li>Cubiertos (platos y vasos)</li>
                <li>Ensaladas</li>
                <li>Bebidas</li>
                <li>Postre para compartir</li>
                <li>1 mantel blanco</li>
              </ul>
            </div>
            
            {/* Qué provee la organización */}
            <div style={styles.featureCard}>
              <div style={{...styles.featureIcon, background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'}}>
                <span>🏢</span>
              </div>
              <h3 style={styles.featureTitle}>¿Qué provee la organización?</h3>
              <ul style={{...styles.featureDescription, textAlign: 'left', paddingLeft: '1rem', lineHeight: '1.8'}}>
                <li>Mesas y sillas</li>
                <li>Asado</li>
                <li>Pan</li>
                <li>Hielo</li>
              </ul>
            </div>
          </div>

          {/* Costos */}
          <div style={{background: 'linear-gradient(to bottom, #0f0f0f 0%, #1a1a1a 100%)', border: '1px solid #2a2a2a', borderRadius: '16px', padding: '2rem', marginBottom: '2rem'}}>
            <h3 style={{...styles.featureTitle, textAlign: 'center', marginBottom: '1.5rem', color: '#ffffff'}}>
              <span style={{color: '#6c47ff'}}>💳</span> Costo por Tarjeta
            </h3>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
              <div style={{textAlign: 'center', padding: '1rem', background: 'rgba(108, 71, 255, 0.1)', borderRadius: '12px', border: '1px solid rgba(108, 71, 255, 0.2)'}}>
                <div style={{fontSize: '24px', fontWeight: 'bold', color: '#6c47ff', marginBottom: '0.5rem'}}>$15.000</div>
                <div style={{color: '#a1a1aa'}}>Individual</div>
              </div>
              <div style={{textAlign: 'center', padding: '1rem', background: 'rgba(108, 71, 255, 0.1)', borderRadius: '12px', border: '1px solid rgba(108, 71, 255, 0.2)'}}>
                <div style={{fontSize: '24px', fontWeight: 'bold', color: '#6c47ff', marginBottom: '0.5rem'}}>$10.000 c/u</div>
                <div style={{color: '#a1a1aa'}}>Familias de 3 y 4 personas</div>
              </div>
              <div style={{textAlign: 'center', padding: '1rem', background: 'rgba(108, 71, 255, 0.1)', borderRadius: '12px', border: '1px solid rgba(108, 71, 255, 0.2)'}}>
                <div style={{fontSize: '24px', fontWeight: 'bold', color: '#6c47ff', marginBottom: '0.5rem'}}>$8.000 c/u</div>
                <div style={{color: '#a1a1aa'}}>Familias de 5 o más</div>
              </div>
            </div>
          </div>

          {/* Alias para transferencia */}
          <div style={{textAlign: 'center', background: 'linear-gradient(135deg, #6c47ff 0%, #a155f9 100%)', padding: '1.5rem', borderRadius: '12px', color: 'white'}}>
            <div style={{fontSize: '18px', fontWeight: '600', marginBottom: '0.5rem'}}>
              💰 Alias para realizar transferencia:
            </div>
            <div style={{fontSize: '24px', fontWeight: 'bold', letterSpacing: '0.05em'}}>
              encuentrofliar14.09
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        {/* Efectos de fondo adicionales */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(108, 71, 255, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(161, 85, 249, 0.3) 0%, transparent 50%)',
          zIndex: 1
        }}></div>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, transparent 30%, rgba(108, 71, 255, 0.1) 50%, transparent 70%)',
          zIndex: 2
        }}></div>
        
        <div style={{...styles.sectionContainer, position: 'relative', zIndex: 3}}>
          <h2 style={styles.ctaTitle}>
            Comienza tu Viaje Genealógico
          </h2>
          <p style={styles.ctaSubtitle}>
            Únete a familiares que ya han comenzado a preservar su legado
          </p>
          <button 
            onClick={() => onNavigateToApp()}
            style={styles.ctaButton}
            onMouseEnter={(e) => {
              e.target.style.background = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'white';
            }}
          >
            Comenzar Ahora
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.sectionContainer}>
          <div style={styles.footerContent}>
            <div style={styles.logo}>
              <div style={styles.logoIcon}>
                <span>FM</span>
              </div>
              <span style={styles.logoText}>Familia Meana</span>
            </div>
            <p style={styles.footerText}>
              ©2025 Software Queen. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageStyled;
