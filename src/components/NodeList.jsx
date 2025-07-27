import { useState } from "react";
import { deleteNodeFromAdmin } from "./events/api/deleteNode";
import NodeDetailsModal from './NodeDetailsModal';
import "./NodeList.css";

const NodeList = ({ nodes, onEditNode, onDeleteNode, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNode, setSelectedNode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewNode = (node) => {
    setSelectedNode(node);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNode(null);
  };

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

      <div className="table-container">
        <table className="nodes-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Nacimiento</th>
              <th>Descendiente de</th>
              <th>Contacto</th>
              <th>WhatsApp</th>
              <th>Invitado</th>
              <th>Confirmó</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredNodes.map(node => {
              return (
                <tr key={node.id}>
                  <td className="name-cell">
                    <div className="name-with-gender">
                      <span className="name">{node.nombre}</span>
                      <span className={`gender-icon ${node.gender}`}>
                        {node.gender === "male" ? "♂" : "♀"}
                      </span>
                    </div>
                  </td>
                  <td>{node.nacimiento || "-"}</td>
                  <td>{node.Descendientes || "-"}</td>
                  <td>{node.contacto || "-"}</td>
                  <td className="boolean-cell">
                    <span className={`status-badge ${node.whatsapp ? 'yes' : 'no'}`}>
                      {node.whatsapp ? '✅' : '❌'}
                    </span>
                  </td>
                  <td className="boolean-cell">
                    <span className={`status-badge ${node.ha_sido_invitado ? 'yes' : 'no'}`}>
                      {node.ha_sido_invitado ? '✅' : '❌'}
                    </span>
                  </td>
                  <td className="boolean-cell">
                    <span className={`status-badge ${node.confirmo_asistencia ? 'yes' : 'no'}`}>
                      {node.confirmo_asistencia ? '✅' : '❌'}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button 
                      onClick={() => handleViewNode(node)}
                      className="view-button"
                      title="Ver más"
                    >
                      👁️
                    </button>
                    <button 
                      onClick={() => onEditNode(node)}
                      className="edit-button"
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => handleDelete(node)}
                      className="delete-button"
                      disabled={loading}
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredNodes.length === 0 && (
        <div className="empty-state">
          <p>No se encontraron personas.</p>
        </div>
      )}

      <NodeDetailsModal 
        node={selectedNode}
        nodes={nodes}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default NodeList;
