import React from 'react';

const LandingPage = ({ onNavigateToApp }) => {
  return (
    <div className="min-h-screen bg-dark-primary">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-dark-primary/80 backdrop-blur-md border-b border-border-primary">
        <div className="section-container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FM</span>
              </div>
              <span className="text-text-primary font-semibold text-xl">Familia Meana</span>
            </div>
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => onNavigateToApp()}
                className="btn-ghost"
              >
                Ver Árbol
              </button>
              <button 
                onClick={() => onNavigateToApp()}
                className="btn-primary"
              >
                Comenzar
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section pt-20">
        <div className="section-container text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Descubre tu
              <span className="gradient-text block">Historia Familiar</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Explora, conecta y preserva las historias de tu familia con nuestra plataforma interactiva
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => onNavigateToApp()}
                className="btn-primary text-lg px-8 py-4"
              >
                Explorar Árbol Familiar
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                Conoce Más
              </button>
            </div>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dark-secondary/50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Características
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Herramientas modernas para preservar y explorar tu legado familiar
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card">
              <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌳</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Árbol Interactivo</h3>
              <p className="text-text-secondary">
                Visualiza tu árbol genealógico de forma interactiva con navegación fluida y diseño moderno
              </p>
            </div>
            
            <div className="feature-card">
              <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Responsive</h3>
              <p className="text-text-secondary">
                Accede desde cualquier dispositivo con una experiencia optimizada para móvil y desktop
              </p>
            </div>
            
            <div className="feature-card">
              <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Rápido y Moderno</h3>
              <p className="text-text-secondary">
                Tecnología de vanguardia para una experiencia rápida y sin interrupciones
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Experimenta la 
              <span className="gradient-text"> Diferencia</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Una nueva forma de conectar con tu historia familiar
            </p>
          </div>
          
          <div className="card max-w-4xl mx-auto p-8 bg-gradient-dark">
            <div className="aspect-video bg-dark-tertiary rounded-lg flex items-center justify-center mb-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">▶️</span>
                </div>
                <p className="text-text-secondary">Demo Interactivo</p>
              </div>
            </div>
            <div className="text-center">
              <button 
                onClick={() => onNavigateToApp()}
                className="btn-primary text-lg px-8 py-4"
              >
                Ver Demo en Vivo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-accent">
        <div className="section-container text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Comienza tu Viaje Genealógico
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Únete a miles de familias que ya han comenzado a preservar su legado
          </p>
          <button 
            onClick={() => onNavigateToApp()}
            className="bg-white text-accent-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Comenzar Ahora
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-dark-secondary border-t border-border-primary">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FM</span>
              </div>
              <span className="text-text-primary font-semibold">Familia Meana</span>
            </div>
            <p className="text-text-secondary text-sm">
              © 2025 Familia Meana. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
