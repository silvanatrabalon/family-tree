import { useState } from "react";
import { deleteNodeFromAdmin } from "./events/api/deleteNode";
import NodeDetailsModal from './NodeDetailsModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import "./NodeList.css";

const NodeList = ({ nodes, onEditNode, onDeleteNode, onRefresh, isAdminMode = false, loading: externalLoading = false }) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNode, setSelectedNode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmNode, setDeleteConfirmNode] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [invitationFilter, setInvitationFilter] = useState("all"); // all, invited, confirmed, not-invited
  const [confirmationFilter, setConfirmationFilter] = useState("all"); // all, confirmed, not-confirmed
  const [paymentFilter, setPaymentFilter] = useState("all"); // all, paid, not-paid

  // Usar loading externo o interno
  const isLoading = externalLoading || loading;

  const handleViewNode = (node) => {
    setSelectedNode(node);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNode(null);
  };

  const handleDeleteClick = (node) => {
    setDeleteConfirmNode(node);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDeleteConfirmNode(null);
  };

    const handleDeleteConfirm = async () => {
    if (!deleteConfirmNode) return;
    
    setLoading(true);
    try {
      await deleteNodeFromAdmin(deleteConfirmNode, nodes);
      onDeleteNode();
      setIsDeleteModalOpen(false);
      setDeleteConfirmNode(null);
    } catch (error) {
      console.error("Error deleting node:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    
    // Configurar el documento
    doc.setFontSize(16);
    doc.text('Lista de Personas del Árbol Genealógico', 14, 22);
    
    // Agregar información adicional
    doc.setFontSize(10);
    doc.text(`Total de personas: ${filteredNodes.length}`, 14, 32);
    doc.text(`Fecha de exportación: ${new Date().toLocaleDateString('es-ES')}`, 14, 38);
    
    // Preparar los datos para la tabla
    const tableColumns = isAdminMode 
      ? ['Nombre', 'Nacimiento', 'Descendiente de', 'Contacto', 'WhatsApp', 'Invitado', 'Confirmó', 'Pagó']
      : ['Nombre', 'Nacimiento', 'Descendiente de', 'Contacto'];
    
    const tableRows = filteredNodes.map(node => {
      const basicRow = [
        node.nombre || '',
        node.nacimiento || '',
        node.Descendientes || '',
        node.contacto || ''
      ];
      
      if (isAdminMode) {
        return [
          ...basicRow,
          node.whatsapp ? 'Sí' : 'No',
          node.ha_sido_invitado ? 'Sí' : 'No',
          node.confirmo_asistencia ? 'Sí' : 'No',
          node.realizo_pago ? 'Sí' : 'No'
        ];
      }
      
      return basicRow;
    });
    
    // Generar la tabla usando autoTable importado
    autoTable(doc, {
      head: [tableColumns],
      body: tableRows,
      startY: 45,
      styles: {
        fontSize: 8,
        cellPadding: 2
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      margin: { top: 45, left: 14, right: 14 }
    });
    
    // Guardar el PDF
    const fileName = `lista-personas-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  // Filtrar nodos por búsqueda, invitación y confirmación
  const filteredNodes = nodes.filter(node => {
    // Verificar que el nodo y sus propiedades existan
    if (!node || !node.nombre) {
      return false;
    }
    
    // Log temporal para ver los valores booleanos
    if (node.nombre && node.nombre.includes('test')) { // Solo para nodos de prueba
      console.log(`Nodo ${node.nombre} - booleanos:`, {
        whatsapp: node.whatsapp,
        ha_sido_invitado: node.ha_sido_invitado,
        confirmo_asistencia: node.confirmo_asistencia,
        realizo_pago: node.realizo_pago
      });
    }
    
    const matchesSearch = searchTerm.trim() === '' || 
      node.nombre.toLowerCase().includes(searchTerm.toLowerCase().trim());
    
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
  }).sort((a, b) => {
    // Ordenar alfabéticamente por nombre
    return a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase());
  });

  return (
    <div className="node-list">
            <div className="list-header">
        <h3>Lista de Personas ({filteredNodes.length})</h3>
        <div className="header-actions">
          <button
            onClick={handleExportToPDF}
            className="export-pdf-button"
            disabled={filteredNodes.length === 0}
            title="Exportar lista como PDF"
          >
            📄 Exportar PDF
          </button>
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="refresh-button"
          >
            {isLoading ? "Actualizando..." : "🔄 Actualizar"}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <p>Cargando personas...</p>
        </div>
      ) : (
        <>
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
                          {node.whatsapp ? '✓' : '✗'}
                        </span>
                      </td>
                      <td className="boolean-cell">
                        <span className={`status-badge ${node.ha_sido_invitado ? 'yes' : 'no'}`}>
                          {node.ha_sido_invitado ? '✓' : '✗'}
                        </span>
                      </td>
                      <td className="boolean-cell">
                        <span className={`status-badge ${node.confirmo_asistencia ? 'yes' : 'no'}`}>
                          {node.confirmo_asistencia ? '✓' : '✗'}
                        </span>
                      </td>
                      <td className="boolean-cell">
                        <span className={`status-badge ${node.realizo_pago ? 'yes' : 'no'}`}>
                          {node.realizo_pago ? '✓' : '✗'}
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
                      👁
                    </button>
                    <button 
                      onClick={() => onEditNode(node)}
                      className="edit-button"
                      title="Editar información"
                    >
                      ✏
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(node)}
                      className="delete-button"
                      disabled={loading}
                      title="Eliminar persona"
                    >
                      🗑
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
        </>
      )}

      <NodeDetailsModal 
        node={selectedNode}
        nodes={nodes}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isAdminMode={isAdminMode}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        personName={deleteConfirmNode?.nombre || ''}
        isLoading={loading}
      />
    </div>
  );
};

export default NodeList;
