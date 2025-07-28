import React from 'react';

const Welcome = () => {
  const styles = {
    container: {
      marginBottom: '2rem'
    },
    content: {
      textAlign: 'center',
      maxWidth: '1024px',
      margin: '0 auto'
    },
    title: {
      fontSize: 'clamp(1.875rem, 5vw, 4rem)',
      fontWeight: 'bold',
      marginBottom: '1rem',
      background: 'linear-gradient(135deg, #6c47ff 0%, #a155f9 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    description: {
      fontSize: '18px',
      color: '#a1a1aa',
      lineHeight: '1.6'
    },
    statusCard: {
      marginTop: '1.5rem',
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem'
    },
    status: {
      background: '#2a2a2a',
      border: '1px solid #404040',
      borderRadius: '12px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem'
    },
    statusDot: {
      width: '12px',
      height: '12px',
      background: '#6c47ff',
      borderRadius: '50%',
      animation: 'pulse 2s ease-in-out infinite'
    },
    statusText: {
      fontSize: '14px',
      color: '#a1a1aa'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.title}>
          Árbol Genealógico Meana
        </h2>
        <p style={styles.description}>
          Explora y descubre las conexiones familiares de nuestra familia. 
          Navega por las generaciones y conoce más sobre cada miembro de nuestra historia.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
