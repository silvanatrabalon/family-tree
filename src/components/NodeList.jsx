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
              <th>Género</th>
              <th>Nacimiento</th>
              <th>Padre</th>
              <th>Madre</th>
              <th>Pareja(s)</th>
              <th>Descendiente de</th>
              <th>Contacto</th>
              <th>Detalles</th>
              <th>WhatsApp</th>
              <th>Invitado</th>
              <th>Confirmó</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredNodes.map(node => {
              const father = node.fid ? nodes.find(n => n.id === node.fid) : null;
              const mother = node.mid ? nodes.find(n => n.id === node.mid) : null;
              const partners = node.pids ? node.pids.map(pid => 
                nodes.find(n => n.id === pid)?.nombre || pid
              ).join(", ") : "";

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
                  <td>{node.gender === "male" ? "Masculino" : "Femenino"}</td>
                  <td>{node.nacimiento || "-"}</td>
                  <td>{father ? father.nombre : "-"}</td>
                  <td>{mother ? mother.nombre : "-"}</td>
                  <td>{partners || "-"}</td>
                  <td>{node.Descendientes || "-"}</td>
                  <td>{node.contacto || "-"}</td>
                  <td className="details-cell" title={node.detalles}>
                    {node.detalles ? (
                      node.detalles.length > 30 
                        ? node.detalles.substring(0, 30) + "..." 
                        : node.detalles
                    ) : "-"}
                  </td>
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
    </div>
  );
};

export default NodeList;
