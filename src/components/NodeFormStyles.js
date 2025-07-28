// Estilos modernos reutilizables para el formulario
export const formStyles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '32px',
    background: 'linear-gradient(to bottom, #0f0f0f 0%, #1a1a1a 100%)',
    borderRadius: '16px',
    border: '1px solid #2a2a2a',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
  },

  title: {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '32px',
    textAlign: 'center',
    letterSpacing: '-0.025em'
  },

  infoBox: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: '1px solid #7c3aed',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '32px',
    color: '#ffffff',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: '500'
  },

  fieldGroup: {
    marginBottom: '24px'
  },

  label: {
    display: 'block',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '8px',
    letterSpacing: '-0.025em'
  },

  required: {
    color: '#fbbf24',
    fontWeight: '600'
  },

  input: {
    width: '100%',
    padding: '12px 16px',
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box'
  },

  select: {
    width: '100%',
    padding: '12px 16px',
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
    cursor: 'pointer'
  },

  textarea: {
    width: '100%',
    padding: '12px 16px',
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
    resize: 'vertical',
    fontFamily: 'inherit'
  },

  adminSection: {
    background: '#0f0f0f',
    border: '1px solid #2a2a2a',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px'
  },

  adminTitle: {
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '16px',
    letterSpacing: '-0.025em'
  },

  checkboxGrid: {
    display: 'grid',
    gap: '16px'
  },

  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer'
  },

  checkbox: {
    width: '18px',
    height: '18px',
    accentColor: '#6c47ff',
    cursor: 'pointer'
  },

  readonlySection: {
    background: '#0f0f0f',
    border: '1px solid #2a2a2a',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px'
  },

  readonlyTitle: {
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '16px',
    letterSpacing: '-0.025em'
  },

  readonlyGrid: {
    display: 'grid',
    gap: '12px'
  },

  readonlyField: {
    color: '#e5e7eb',
    fontSize: '14px',
    padding: '8px 12px',
    background: '#1a1a1a',
    borderRadius: '8px'
  },

  readonlyStrong: {
    color: '#ffffff'
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '32px'
  },

  submitButton: {
    background: 'linear-gradient(135deg, #6c47ff 0%, #764ba2 100%)',
    color: '#ffffff',
    border: 'none',
    padding: '14px 32px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    letterSpacing: '-0.025em',
    minWidth: '140px'
  },

  submitButtonDisabled: {
    background: '#4b5563',
    cursor: 'not-allowed'
  }
};

// Handlers para efectos de hover y focus
export const inputHandlers = {
  onFocus: (e) => {
    e.target.style.borderColor = '#6c47ff';
  },
  onBlur: (e) => {
    e.target.style.borderColor = '#2a2a2a';
  }
};

export const buttonHandlers = {
  onMouseEnter: (e, loading = false) => {
    if (!loading) {
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = '0 8px 25px rgba(108, 71, 255, 0.3)';
    }
  },
  onMouseLeave: (e, loading = false) => {
    if (!loading) {
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = 'none';
    }
  }
};
