import { formStyles, inputHandlers } from './NodeFormStyles';
import SearchableSelect from './SearchableSelect';

const NodeFormRelationships = ({ 
  editNode, 
  formData, 
  handleRelationshipChange, 
  handleRelatedNodeChange, 
  availableNodes,
  nodes 
}) => {
  // Solo mostrar información de relaciones en modo edición, sin permitir editar
  if (editNode) {
    return (
      <div style={formStyles.readonlySection}>
        <h4 style={formStyles.readonlyTitle}>
          Información de Relaciones
        </h4>
        <div style={formStyles.readonlyGrid}>
          {editNode.fid && (
            <div style={formStyles.readonlyField}>
              <strong style={formStyles.readonlyStrong}>Padre:</strong> {nodes.find(n => n.id === editNode.fid)?.nombre || editNode.fid}
            </div>
          )}
          {editNode.mid && (
            <div style={formStyles.readonlyField}>
              <strong style={formStyles.readonlyStrong}>Madre:</strong> {nodes.find(n => n.id === editNode.mid)?.nombre || editNode.mid}
            </div>
          )}
          {editNode.pids && editNode.pids.length > 0 && (
            <div style={formStyles.readonlyField}>
              <strong style={formStyles.readonlyStrong}>Pareja(s):</strong> {editNode.pids.map(pid => 
                nodes.find(n => n.id === pid)?.nombre || pid
              ).join(", ")}
            </div>
          )}
          {editNode.Descendientes && (
            <div style={formStyles.readonlyField}>
              <strong style={formStyles.readonlyStrong}>Descendientes:</strong> {editNode.Descendientes}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Opciones de tipo de relación para nueva persona
  const RelationshipOptions = () => (
    <div style={formStyles.fieldGroup}>
      <label htmlFor="relationshipType" style={formStyles.label}>
        Tipo de Relación: <span style={formStyles.required}>*</span>
      </label>
      <select
        id="relationshipType"
        name="relationshipType"
        value={formData.relationshipType}
        onChange={handleRelationshipChange}
        required
        title="Por favor seleccione el tipo de relación"
        style={formStyles.select}
        onFocus={inputHandlers.onFocus}
        onBlur={inputHandlers.onBlur}
      >
        <option value="child">Hijo/a de...</option>
        <option value="spouse">Esposo/a de...</option>
        <option value="parent">Padre/Madre de...</option>
      </select>
    </div>
  );

  // Opciones del nodo relacionado
  const RelatedNodeOptions = () => {
    let filteredNodes = availableNodes;
    let labelText = "";

    switch (formData.relationshipType) {
      case "child":
        labelText = "Seleccionar Padre/Madre: *";
        break;
      case "spouse":
        labelText = "Seleccionar Pareja: *";
        filteredNodes = availableNodes.filter(node => node.gender !== formData.gender);
        break;
      case "parent":
        labelText = "Seleccionar Hijo/a: *";
        break;
      default:
        return null;
    }

    // Crear opciones para el SearchableSelect
    const selectOptions = filteredNodes.map(node => ({
      value: node.id,
      label: `${node.nombre} (${node.gender === "male" ? "Hombre" : "Mujer"})`
    }));

    return (
      <div style={formStyles.fieldGroup}>
        <label htmlFor="relatedNodeId" style={formStyles.label}>
          {labelText}
        </label>
        <SearchableSelect
          id="relatedNodeId"
          name="relatedNodeId"
          value={formData.relatedNodeId}
          onChange={handleRelatedNodeChange}
          options={selectOptions}
          placeholder={`Buscar ${labelText.toLowerCase()}...`}
          required
          title="Por favor seleccione una persona relacionada"
        />
      </div>
    );
  };

  return (
    <>
      <RelationshipOptions />
      <RelatedNodeOptions />
    </>
  );
};

export default NodeFormRelationships;
