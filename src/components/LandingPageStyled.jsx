import React from 'react';

const LandingPageStyled = ({ onNavigateToApp }) => {
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
      background: 'linear-gradient(135deg, #6c47ff 0%, #a155f9 100%)',
      textAlign: 'center'
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
              Ver Árbol
            </button>
            <button 
              onClick={() => onNavigateToApp()}
              style={styles.btnGhost}
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
            </button>
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

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              Características
            </h2>
            <p style={styles.sectionSubtitle}>
              Herramientas modernas para preservar y explorar tu legado familiar
            </p>
          </div>
          
          <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>
                <span>🌳</span>
              </div>
              <h3 style={styles.featureTitle}>Árbol Interactivo</h3>
              <p style={styles.featureDescription}>
                Visualiza tu árbol genealógico de forma interactiva con navegación fluida y diseño moderno
              </p>
            </div>
            
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>
                <span>📱</span>
              </div>
              <h3 style={styles.featureTitle}>Responsive</h3>
              <p style={styles.featureDescription}>
                Accede desde cualquier dispositivo con una experiencia optimizada para móvil y desktop
              </p>
            </div>
            
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>
                <span>⚡</span>
              </div>
              <h3 style={styles.featureTitle}>Rápido y Moderno</h3>
              <p style={styles.featureDescription}>
                Tecnología de vanguardia para una experiencia rápida y sin interrupciones
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.sectionContainer}>
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
