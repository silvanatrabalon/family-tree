import { useState, useEffect } from "react";
import { addNode } from "./events/api/addNode";
import { addNodeWithRelationships } from "./events/api/addNodeWithRelationships";
import { updateNode } from "./events/api/updateNode";
import { getTagFromNodeData } from "../constant/getTag";
import "./NodeForm.css";

const NodeForm = ({ nodes, editNode, onNodeCreated, onNodeUpdated }) => {
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    gender: "male",
    nacimiento: "",
    fid: "",
    mid: "",
    pids: [],
    relationshipType: "child", // "child", "spouse", "parent"
    relatedNodeId: "",
  });

  const [availableNodes, setAvailableNodes] = useState([]);
  const [loading, setLoading] = useState(false);

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
      });
    }
  }, [editNode]);

  useEffect(() => {
    setAvailableNodes(nodes.filter(node => node.id !== formData.id));
  }, [nodes, formData.id]);

  const generateId = () => {
    return "_" + Math.random().toString(36).substr(2, 4);
  };

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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    const newFormData = { ...formData, relatedNodeId: value };

    // Configurar relaciones según el tipo
    if (formData.relationshipType === "child") {
      const relatedNode = nodes.find(node => node.id === value);
      if (relatedNode) {
        if (relatedNode.gender === "male") {
          newFormData.fid = value;
          newFormData.mid = "";
        } else {
          newFormData.mid = value;
          newFormData.fid = "";
        }
      }
    } else if (formData.relationshipType === "spouse") {
      newFormData.pids = [value];
    } else if (formData.relationshipType === "parent") {
      // Encontrar el nodo hijo y actualizar sus padres
      const childNode = nodes.find(node => node.id === value);
      if (childNode) {
        if (formData.gender === "male") {
          newFormData.relatedNodeId = value;
        } else {
          newFormData.relatedNodeId = value;
        }
      }
    }

    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const nodeData = {
        id: editNode ? formData.id : generateId(),
        nombre: formData.nombre,
        gender: formData.gender,
        nacimiento: formData.nacimiento,
        fid: formData.fid,
        mid: formData.mid,
        pids: formData.pids,
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
        setFormData({
          id: "",
          nombre: "",
          gender: "male",
          nacimiento: "",
          fid: "",
          mid: "",
          pids: [],
          relationshipType: "child",
          relatedNodeId: "",
        });
      }

    } catch (error) {
      console.error("Error saving node:", error);
      alert("Error al guardar la persona. Por favor intenta de nuevo.");
    }

    setLoading(false);
  };

  const getRelationshipOptions = () => {
    if (editNode) return []; // No mostrar opciones de relación en modo edición
    
    return (
      <div className="form-group">
        <label htmlFor="relationshipType">Tipo de Relación:</label>
        <select
          id="relationshipType"
          name="relationshipType"
          value={formData.relationshipType}
          onChange={handleRelationshipChange}
          required
        >
          <option value="child">Hijo/a de...</option>
          <option value="spouse">Esposo/a de...</option>
          <option value="parent">Padre/Madre de...</option>
        </select>
      </div>
    );
  };

  const getRelatedNodeOptions = () => {
    if (editNode) return null; // No mostrar en modo edición

    let filteredNodes = availableNodes;
    let labelText = "";

    switch (formData.relationshipType) {
      case "child":
        labelText = "Seleccionar Padre/Madre:";
        break;
      case "spouse":
        labelText = "Seleccionar Pareja:";
        filteredNodes = availableNodes.filter(node => node.gender !== formData.gender);
        break;
      case "parent":
        labelText = "Seleccionar Hijo/a:";
        break;
      default:
        return null;
    }

    return (
      <div className="form-group">
        <label htmlFor="relatedNodeId">{labelText}</label>
        <select
          id="relatedNodeId"
          name="relatedNodeId"
          value={formData.relatedNodeId}
          onChange={handleRelatedNodeChange}
          required
        >
          <option value="">Seleccionar...</option>
          {filteredNodes.map(node => (
            <option key={node.id} value={node.id}>
              {node.nombre} ({node.gender === "male" ? "Hombre" : "Mujer"})
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className="node-form">
      <h3>{editNode ? "Editar Persona" : "Agregar Nueva Persona"}</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre Completo:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Género:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="nacimiento">Fecha de Nacimiento:</label>
          <input
            type="text"
            id="nacimiento"
            name="nacimiento"
            value={formData.nacimiento}
            onChange={handleInputChange}
            placeholder="Ej: 1980, 15/03/1980, etc."
          />
        </div>

        {getRelationshipOptions()}
        {getRelatedNodeOptions()}

        <div className="form-actions">
          <button 
            type="submit" 
            disabled={loading}
            className="submit-button"
          >
            {loading ? "Guardando..." : (editNode ? "Actualizar" : "Agregar")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NodeForm;
