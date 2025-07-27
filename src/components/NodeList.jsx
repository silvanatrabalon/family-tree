import { useState } from "react";
import { deleteNodeFromAdmin } from "./events/api/deleteNode";
import "./NodeList.css";

const NodeList = ({ nodes, onEditNode, onDeleteNode, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (node) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${node.nombre}?`)) {
      setLoading(true);
      try {
        await deleteNodeFromAdmin(node, nodes);
        onDeleteNode();
      } catch (error) {
        console.error("Error deleting node:", error);
        alert("Error al eliminar la persona. Por favor intenta de nuevo.");
      }
      setLoading(false);
    }
  };

  const filteredNodes = nodes.filter(node =>
    node.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRelationshipInfo = (node) => {
    const relations = [];
    
    if (node.fid) {
      const father = nodes.find(n => n.id === node.fid);
      if (father) relations.push(`Padre: ${father.nombre}`);
    }
    
    if (node.mid) {
      const mother = nodes.find(n => n.id === node.mid);
      if (mother) relations.push(`Madre: ${mother.nombre}`);
    }
    
    if (node.pids && node.pids.length > 0) {
      node.pids.forEach(pid => {
        const partner = nodes.find(n => n.id === pid);
        if (partner) {
          relations.push(`Pareja: ${partner.nombre}`);
        }
      });
    }
    
    return relations.length > 0 ? relations.join(", ") : "Sin relaciones";
  };

  return (
    <div className="node-list">
      <div className="list-header">
        <h3>Lista de Personas ({filteredNodes.length})</h3>
        <button 
          onClick={onRefresh}
          className="refresh-button"
          disabled={loading}
        >
          {loading ? "Actualizando..." : "Actualizar"}
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="nodes-grid">
        {filteredNodes.map(node => (
          <div key={node.id} className="node-card">
            <div className="node-header">
              <h4>{node.nombre}</h4>
              <span className={`gender-badge ${node.gender}`}>
                {node.gender === "male" ? "♂" : "♀"}
              </span>
            </div>
            
            <div className="node-details">
              <p><strong>ID:</strong> {node.id}</p>
              <p><strong>Género:</strong> {node.gender === "male" ? "Masculino" : "Femenino"}</p>
              {node.nacimiento && (
                <p><strong>Nacimiento:</strong> {node.nacimiento}</p>
              )}
              {node.Descendientes && (
                <p><strong>Descendientes:</strong> {node.Descendientes}</p>
              )}
              <p><strong>Tags:</strong> {node.tags ? node.tags.join(", ") : "Sin tags"}</p>
              <p><strong>Relaciones:</strong> {getRelationshipInfo(node)}</p>
            </div>

            <div className="node-actions">
              <button 
                onClick={() => onEditNode(node)}
                className="edit-button"
              >
                Editar
              </button>
              <button 
                onClick={() => handleDelete(node)}
                className="delete-button"
                disabled={loading}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredNodes.length === 0 && (
        <div className="empty-state">
          <p>No se encontraron personas.</p>
        </div>
      )}
    </div>
  );
};

export default NodeList;
