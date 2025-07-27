import { useState } from "react";
import { deleteNodeFromAdmin } from "./events/api/deleteNode";
import NodeDetailsModal from './NodeDetailsModal';
import "./NodeList.css";

const NodeList = ({ nodes, onEditNode, onDeleteNode, onRefresh, isAdminMode = false }) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNode, setSelectedNode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invitationFilter, setInvitationFilter] = useState("all"); // all, invited, confirmed, not-invited
  const [confirmationFilter, setConfirmationFilter] = useState("all"); // all, confirmed, not-confirmed
  const [paymentFilter, setPaymentFilter] = useState("all"); // all, paid, not-paid

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

  // Filtrar nodos por búsqueda, invitación y confirmación
  const filteredNodes = nodes.filter(node => {
    // Verificar que el nodo y sus propiedades existan
    if (!node || !node.nombre) {
      return false;
    }
    
    const matchesSearch = node.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesInvitation = true;
    if (invitationFilter === "invited") {
      matchesInvitation = node.ha_sido_invitado === true;
    } else if (invitationFilter === "not-invited") {
      matchesInvitation = node.ha_sido_invitado === false;
    }
    
    let matchesConfirmation = true;
    if (confirmationFilter === "confirmed") {
      matchesConfirmation = node.confirmo_asistencia === true;
    } else if (confirmationFilter === "not-confirmed") {
      matchesConfirmation = node.confirmo_asistencia === false;
    }
    
    let matchesPayment = true;
    if (paymentFilter === "paid") {
      matchesPayment = node.realizo_pago === true;
    } else if (paymentFilter === "not-paid") {
      matchesPayment = node.realizo_pago === false;
    }
    
    return matchesSearch && matchesInvitation && matchesConfirmation && matchesPayment;
  });

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

      {isAdminMode && (
        <div className="filters-section">
          <div className="filter-group">
            <label htmlFor="invitation-filter">Estado de invitación:</label>
            <select
              id="invitation-filter"
              value={invitationFilter}
              onChange={(e) => setInvitationFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">Todos</option>
              <option value="invited">Invitados</option>
              <option value="not-invited">No invitados</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="confirmation-filter">Estado de confirmación:</label>
            <select
              id="confirmation-filter"
              value={confirmationFilter}
              onChange={(e) => setConfirmationFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">Todos</option>
              <option value="confirmed">Confirmados</option>
              <option value="not-confirmed">No confirmados</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="payment-filter">Estado de pago:</label>
            <select
              id="payment-filter"
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">Todos</option>
              <option value="paid">Pagaron</option>
              <option value="not-paid">No pagaron</option>
            </select>
          </div>

          <div className="filter-summary">
            <span className="results-count">
              Mostrando {filteredNodes.length} de {nodes.length} personas
            </span>
          </div>
        </div>
      )}

      {!isAdminMode && (
        <div className="filter-summary">
          <span className="results-count">
            Mostrando {filteredNodes.length} de {nodes.length} personas
          </span>
        </div>
      )}

      <div className="table-container">
        <table className="nodes-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Nacimiento</th>
              <th>Descendiente de</th>
              <th>Contacto</th>
              {isAdminMode && (
                <>
                  <th>En grupo de WhatsApp</th>
                  <th>Invitado</th>
                  <th>Confirmó</th>
                  <th>Pagó</th>
                </>
              )}
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
                  {isAdminMode && (
                    <>
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
                      <td className="boolean-cell">
                        <span className={`status-badge ${node.realizo_pago ? 'yes' : 'no'}`}>
                          {node.realizo_pago ? '✅' : '❌'}
                        </span>
                      </td>
                    </>
                  )}
                  <td className="actions-cell">
                    <button 
                      onClick={() => handleViewNode(node)}
                      className="view-button"
                      title="Ver más información"
                    >
                      Ver más
                    </button>
                    <button 
                      onClick={() => onEditNode(node)}
                      className="edit-button"
                      title="Editar información"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(node)}
                      className="delete-button"
                      disabled={loading}
                      title="Eliminar persona"
                    >
                      Eliminar
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
        isAdminMode={isAdminMode}
      />
    </div>
  );
};

export default NodeList;
