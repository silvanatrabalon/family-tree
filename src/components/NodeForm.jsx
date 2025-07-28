import { useState, useEffect } from "react";
import { addNode } from "./events/api/addNode";
import { addNodeWithRelationships } from "./events/api/addNodeWithRelationships";
import { updateNode } from "./events/api/updateNode";
import { getTagFromNodeData } from "../constant/getTag";
import NodeFormFields from './NodeFormFields';
import NodeFormAdminFields from './NodeFormAdminFields';
import NodeFormRelationships from './NodeFormRelationships';
import { formStyles, buttonHandlers } from './NodeFormStyles';
import { validateFormData, setupCustomValidityMessages } from './NodeFormValidation';
import { generateNodeId, createResetFormData, handleRelationshipConfiguration } from './NodeFormUtils';

const NodeForm = ({ nodes, editNode, onNodeCreated, onNodeUpdated, isAdminMode = false }) => {
  const [formData, setFormData] = useState(createResetFormData());
  const [availableNodes, setAvailableNodes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Configurar mensajes de validación HTML5 personalizados
  useEffect(() => {
    return setupCustomValidityMessages(editNode);
  }, [editNode]);

  useEffect(() => {
    if (editNode) {
      setFormData({
        id: editNode.id || "",
        nombre: editNode.nombre || "",
        gender: editNode.gender || "male",
        nacimiento: editNode.nacimiento || "",
        fid: editNode.fid || "",
        mid: editNode.mid || "",
        pids: editNode.pids || [],
        relationshipType: "child",
        relatedNodeId: "",
        contacto: editNode.contacto || "",
        detalles: editNode.detalles || "",
        whatsapp: editNode.whatsapp || false,
        ha_sido_invitado: editNode.ha_sido_invitado || false,
        confirmo_asistencia: editNode.confirmo_asistencia || false,
        realizo_pago: editNode.realizo_pago || false,
      });
    }
  }, [editNode]);

  useEffect(() => {
    setAvailableNodes(nodes.filter(node => node.id !== formData.id));
  }, [nodes, formData.id]);

  const getTagFromRelatedNode = (relatedNodeId) => {
    return getTagFromNodeData(relatedNodeId, nodes).toString();
  };

  const getDescendientesFromRelatedNode = (relatedNodeId) => {
    const relatedNode = nodes.find(node => node.id === relatedNodeId);
    if (relatedNode && relatedNode.Descendientes) {
      return relatedNode.Descendientes;
    }
    return formData.nombre; // Default al nombre del nodo actual
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRelationshipChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      relationshipType: value,
      relatedNodeId: "",
      fid: "",
      mid: "",
      pids: []
    }));
  };

  const handleRelatedNodeChange = (e) => {
    const { value } = e.target;
    setFormData(handleRelationshipConfiguration(formData, nodes, value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación personalizada en español
    const errors = validateFormData(formData, editNode);
    
    if (errors.length > 0) {
      alert("Por favor complete los siguientes campos:\n\n• " + errors.join("\n• "));
      return;
    }
    
    setLoading(true);

    try {
      const nodeData = {
        id: editNode ? formData.id : generateNodeId(nodes),
        nombre: formData.nombre,
        gender: formData.gender,
        nacimiento: formData.nacimiento,
        fid: formData.fid,
        mid: formData.mid,
        pids: formData.pids,
        contacto: formData.contacto,
        detalles: formData.detalles,
        whatsapp: formData.whatsapp,
        ha_sido_invitado: formData.ha_sido_invitado,
        confirmo_asistencia: formData.confirmo_asistencia,
        realizo_pago: formData.realizo_pago,
      };

      // Asignar tags y Descendientes basado en el nodo relacionado
      if (formData.relatedNodeId && formData.relationshipType !== "parent") {
        const tagNumber = getTagFromRelatedNode(formData.relatedNodeId);
        const descendientes = getDescendientesFromRelatedNode(formData.relatedNodeId);
        
        nodeData.tags = ["Descendientes", tagNumber];
        nodeData.Descendientes = descendientes;
      } else {
        nodeData.tags = ["Descendientes", "0"];
        nodeData.Descendientes = formData.nombre; // Si no hay relación, usa el nombre del nodo
      }

      if (editNode) {
        await updateNode(nodeData, nodes);
        onNodeUpdated && onNodeUpdated();
      } else {
        // Usar la función que maneja relaciones bidireccionales
        await addNodeWithRelationships(
          nodeData, 
          formData.relatedNodeId, 
          formData.relationshipType, 
          nodes
        );
        
        onNodeCreated && onNodeCreated();
      }

      // Reset form si es agregar
      if (!editNode) {
        setFormData(createResetFormData());
      }

    } catch (error) {
      console.error("Error saving node:", error);
      alert("Error al guardar la persona. Por favor intenta de nuevo.");
    }

    setLoading(false);
  };

  return (
    <div style={formStyles.container}>
      <h3 style={formStyles.title}>
        {editNode ? "Editar Persona" : "Agregar Nueva Persona"}
      </h3>
      
      <form onSubmit={handleSubmit}>
        <NodeFormFields 
          formData={formData} 
          handleInputChange={handleInputChange} 
        />

        {/* Campos de administrador - Solo visibles en modo admin */}
        {isAdminMode && (
          <NodeFormAdminFields 
            formData={formData} 
            handleInputChange={handleInputChange} 
          />
        )}

        <NodeFormRelationships
          editNode={editNode}
          formData={formData}
          handleRelationshipChange={handleRelationshipChange}
          handleRelatedNodeChange={handleRelatedNodeChange}
          availableNodes={availableNodes}
          nodes={nodes}
        />

        <div style={formStyles.buttonContainer}>
          <button 
            type="submit" 
            disabled={loading}
            style={{
              ...formStyles.submitButton,
              ...(loading ? formStyles.submitButtonDisabled : {})
            }}
            onMouseEnter={(e) => buttonHandlers.onMouseEnter(e, loading)}
            onMouseLeave={(e) => buttonHandlers.onMouseLeave(e, loading)}
          >
            {loading ? "Guardando..." : (editNode ? "Actualizar" : "Agregar")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NodeForm;
