import React from 'react';

const TestPage = () => {
  return (
    <div style={{ backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(135deg, #6c47ff 0%, #a155f9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Test de Estilos
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#a1a1aa', marginBottom: '2rem' }}>
        Esta es una página de prueba para verificar que los estilos se aplican correctamente.
      </p>
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        flexWrap: 'wrap' 
      }}>
        <button style={{
          background: 'linear-gradient(135deg, #6c47ff 0%, #a155f9 100%)',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          border: 'none',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}>
          Botón Primario
        </button>
        <button style={{
          background: '#2a2a2a',
          border: '1px solid #404040',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}>
          Botón Secundario
        </button>
      </div>
      
      <div style={{ 
        marginTop: '2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        <div style={{
          background: '#2a2a2a',
          border: '1px solid #404040',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          transition: 'all 0.3s ease'
        }}>
          <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>Tarjeta 1</h3>
          <p style={{ color: '#a1a1aa' }}>
            Contenido de la primera tarjeta con el nuevo diseño aplicado.
          </p>
        </div>
        
        <div style={{
          background: '#2a2a2a',
          border: '1px solid #404040',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          transition: 'all 0.3s ease'
        }}>
          <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>Tarjeta 2</h3>
          <p style={{ color: '#a1a1aa' }}>
            Contenido de la segunda tarjeta con estilo Linear.app aplicado.
          </p>
        </div>
        
        <div style={{
          background: '#2a2a2a',
          border: '1px solid #404040',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          transition: 'all 0.3s ease'
        }}>
          <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>Tarjeta 3</h3>
          <p style={{ color: '#a1a1aa' }}>
            Contenido de la tercera tarjeta mostrando el tema oscuro.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
