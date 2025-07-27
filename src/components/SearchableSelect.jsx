import React, { useState, useRef, useEffect } from 'react';
import './SearchableSelect.css';

const SearchableSelect = ({ 
  value, 
  onChange, 
  options, 
  placeholder = "Buscar y seleccionar...", 
  name,
  id,
  required = false,
  title = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayValue, setDisplayValue] = useState('');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Filtrar opciones basado en el término de búsqueda
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Actualizar el valor mostrado cuando cambia el value desde afuera
  useEffect(() => {
    if (value && options && options.length > 0) {
      const selectedOption = options.find(opt => opt.value === value);
      if (selectedOption) {
        setDisplayValue(selectedOption.label);
        setSearchTerm('');
      }
    } else {
      setDisplayValue('');
      setSearchTerm('');
    }
  }, [value]); // Remover options de las dependencias para evitar loops

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputClick = () => {
    setIsOpen(true);
    // Solo limpiar si no hay nada seleccionado
    if (!value) {
      setSearchTerm('');
    } else {
      // Si hay algo seleccionado, usar el display value como búsqueda inicial
      setSearchTerm(displayValue);
    }
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleOptionSelect = (option) => {
    // Prevenir que se cierre inmediatamente por el evento blur
    setTimeout(() => {
      setDisplayValue(option.label);
      setSearchTerm('');
      setIsOpen(false);
      
      // Asegurar que el onChange se llame correctamente
      if (onChange) {
        onChange({ target: { name, value: option.value } });
      }
    }, 0);
  };

  const handleClear = () => {
    setDisplayValue('');
    setSearchTerm('');
    setIsOpen(false);
    onChange({ target: { name, value: '' } });
  };

  const handleInputBlur = () => {
    // Pequeño delay para permitir que el clic en opciones funcione
    setTimeout(() => {
      if (!dropdownRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
        // Restaurar el display value si hay una selección válida
        if (value) {
          const selectedOption = options.find(opt => opt.value === value);
          if (selectedOption) {
            setDisplayValue(selectedOption.label);
          }
        }
        setSearchTerm('');
      }
    }, 150);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      // Restaurar el valor seleccionado al presionar Escape
      if (value) {
        const selectedOption = options.find(opt => opt.value === value);
        if (selectedOption) {
          setDisplayValue(selectedOption.label);
        }
      }
      setSearchTerm('');
      inputRef.current?.blur();
    }
  };

  return (
    <div className="searchable-select" ref={dropdownRef}>
      <div className="searchable-select-input-container">
        <input
          ref={inputRef}
          type="text"
          id={id}
          name={name}
          value={isOpen ? searchTerm : displayValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="searchable-select-input"
          autoComplete="off"
          required={required && !value}
          readOnly={false}
          title={title}
        />
        
        {value && (
          <button
            type="button"
            className="searchable-select-clear"
            onClick={handleClear}
            aria-label="Limpiar selección"
          >
            ✕
          </button>
        )}
        
        <button
          type="button"
          className={`searchable-select-arrow ${isOpen ? 'open' : ''}`}
          onClick={handleInputClick}
          aria-label="Abrir opciones"
        >
          ▼
        </button>
      </div>

      {isOpen && (
        <div className="searchable-select-dropdown">
          {filteredOptions.length > 0 ? (
            <ul className="searchable-select-options">
              {filteredOptions.map(option => (
                <li
                  key={option.value}
                  className={`searchable-select-option ${option.value === value ? 'selected' : ''}`}
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevenir que el input pierda el foco
                    handleOptionSelect(option);
                  }}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          ) : (
            <div className="searchable-select-no-results">
              No se encontraron resultados para "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
