import { formStyles, inputHandlers } from './NodeFormStyles';

const NodeFormFields = ({ formData, handleInputChange }) => {
  return (
    <>
      <div style={formStyles.fieldGroup}>
        <label htmlFor="nombre" style={formStyles.label}>
          Nombre Completo: <span style={formStyles.required}>*</span>
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          required
          title="Por favor ingrese el nombre completo"
          placeholder="Ingrese el nombre completo de la persona"
          style={formStyles.input}
          onFocus={inputHandlers.onFocus}
          onBlur={inputHandlers.onBlur}
        />
      </div>

      <div style={formStyles.fieldGroup}>
        <label htmlFor="gender" style={formStyles.label}>
          Género: <span style={formStyles.required}>*</span>
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          required
          title="Por favor seleccione el género"
          style={formStyles.select}
          onFocus={inputHandlers.onFocus}
          onBlur={inputHandlers.onBlur}
        >
          <option value="">Seleccionar género...</option>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
        </select>
      </div>

      <div style={formStyles.fieldGroup}>
        <label htmlFor="nacimiento" style={formStyles.label}>
          Fecha de Nacimiento:
        </label>
        <input
          type="text"
          id="nacimiento"
          name="nacimiento"
          value={formData.nacimiento}
          onChange={handleInputChange}
          placeholder="Ej: 1980, 15/03/1980, etc."
          style={formStyles.input}
          onFocus={inputHandlers.onFocus}
          onBlur={inputHandlers.onBlur}
        />
      </div>

      <div style={formStyles.fieldGroup}>
        <label htmlFor="contacto" style={formStyles.label}>
          Contacto:
        </label>
        <input
          type="text"
          id="contacto"
          name="contacto"
          value={formData.contacto}
          onChange={handleInputChange}
          placeholder="Ej: +1234567890, nombre@email.com"
          style={formStyles.input}
          onFocus={inputHandlers.onFocus}
          onBlur={inputHandlers.onBlur}
        />
      </div>

      <div style={formStyles.fieldGroup}>
        <label htmlFor="detalles" style={formStyles.label}>
          Detalles adicionales:
        </label>
        <textarea
          id="detalles"
          name="detalles"
          value={formData.detalles}
          onChange={handleInputChange}
          placeholder="Información adicional sobre la persona (profesión, hobbies, etc.)"
          rows="3"
          style={formStyles.textarea}
          onFocus={inputHandlers.onFocus}
          onBlur={inputHandlers.onBlur}
        />
      </div>
    </>
  );
};

export default NodeFormFields;
