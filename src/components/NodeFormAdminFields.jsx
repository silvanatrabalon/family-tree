import { formStyles } from './NodeFormStyles';

const NodeFormAdminFields = ({ formData, handleInputChange }) => {
  const adminFields = [
    {
      id: 'whatsapp',
      name: 'whatsapp',
      label: 'Incluido en grupo de WhatsApp'
    },
    {
      id: 'ha_sido_invitado',
      name: 'ha_sido_invitado',
      label: 'Ha sido invitado a la reunión familiar'
    },
    {
      id: 'confirmo_asistencia',
      name: 'confirmo_asistencia',
      label: 'Confirmó asistencia a la reunión'
    },
    {
      id: 'realizo_pago',
      name: 'realizo_pago',
      label: 'Realizó el pago'
    }
  ];

  return (
    <div style={formStyles.adminSection}>
      <h4 style={formStyles.adminTitle}>
        Información Administrativa
      </h4>
      <div style={formStyles.checkboxGrid}>
        {adminFields.map((field) => (
          <label 
            key={field.id}
            htmlFor={field.id} 
            style={formStyles.checkboxLabel}
          >
            <input
              type="checkbox"
              id={field.id}
              name={field.name}
              checked={formData[field.name]}
              onChange={handleInputChange}
              style={formStyles.checkbox}
            />
            <span>{field.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default NodeFormAdminFields;
