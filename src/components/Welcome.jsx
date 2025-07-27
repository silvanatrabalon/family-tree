import React from 'react';
import './Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-section">
      <div className="welcome-content">
        <h2>Bienvenido al Árbol Genealógico Familiar</h2>
        <p>
          Explora y descubre las conexiones familiares de nuestra familia. 
          Navega por las generaciones y conoce más sobre cada miembro de nuestra historia.
        </p>
        <div className="welcome-features">
          <div className="feature">
            <span className="feature-icon">👨‍👩‍👧‍👦</span>
            <span>Relaciones familiares</span>
          </div>
          <div className="feature">
            <span className="feature-icon">📅</span>
            <span>Fechas importantes</span>
          </div>
          <div className="feature">
            <span className="feature-icon">📍</span>
            <span>Información de contacto</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
