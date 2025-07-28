import { useState } from "react";
import { deleteNodeFromAdmin } from "./events/api/deleteNode";
import NodeDetailsModal from './NodeDetailsModal';

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
    <div style={{
      width: '100%',
      background: 'linear-gradient(to bottom, #0f0f0f 0%, #1a1a1a 100%)',
      borderRadius: '16px',
      border: '1px solid #2a2a2a',
      padding: '32px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px'
      }}>
        <h3 style={{
          color: '#ffffff',
          fontSize: '24px',
          fontWeight: '600',
          margin: '0',
          letterSpacing: '-0.025em'
        }}>
          Lista de Personas ({filteredNodes.length})
        </h3>
        <button 
          onClick={onRefresh}
          disabled={loading}
          style={{
            background: loading ? '#4b5563' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#ffffff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            letterSpacing: '-0.025em'
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }
          }}
        >
          {loading ? "Actualizando..." : "Actualizar"}
        </button>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '14px',
            outline: 'none',
            transition: 'all 0.2s ease',
            boxSizing: 'border-box'
          }}
          onFocus={(e) => e.target.style.borderColor = '#6c47ff'}
          onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
        />
      </div>

      {isAdminMode && (
        <div style={{
          background: '#0f0f0f',
          border: '1px solid #2a2a2a',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '16px'
          }}>
            <div>
              <label htmlFor="invitation-filter" style={{
                display: 'block',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '8px',
                letterSpacing: '-0.025em'
              }}>
                Estado de invitación:
              </label>
              <select
                id="invitation-filter"
                value={invitationFilter}
                onChange={(e) => setInvitationFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="all">Todos</option>
                <option value="invited">Invitados</option>
                <option value="not-invited">No invitados</option>
              </select>
            </div>

            <div>
              <label htmlFor="confirmation-filter" style={{
                display: 'block',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '8px',
                letterSpacing: '-0.025em'
              }}>
                Estado de confirmación:
              </label>
              <select
                id="confirmation-filter"
                value={confirmationFilter}
                onChange={(e) => setConfirmationFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="all">Todos</option>
                <option value="confirmed">Confirmados</option>
                <option value="not-confirmed">No confirmados</option>
              </select>
            </div>

            <div>
              <label htmlFor="payment-filter" style={{
                display: 'block',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '8px',
                letterSpacing: '-0.025em'
              }}>
                Estado de pago:
              </label>
              <select
                id="payment-filter"
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="all">Todos</option>
                <option value="paid">Pagaron</option>
                <option value="not-paid">No pagaron</option>
              </select>
            </div>
          </div>

          <div style={{
            textAlign: 'center',
            padding: '12px',
            background: '#1a1a1a',
            borderRadius: '8px',
            color: '#e5e7eb',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Mostrando {filteredNodes.length} de {nodes.length} personas
          </div>
        </div>
      )}

      {!isAdminMode && (
        <div style={{
          textAlign: 'center',
          padding: '12px',
          background: '#0f0f0f',
          border: '1px solid #2a2a2a',
          borderRadius: '8px',
          marginBottom: '24px',
          color: '#e5e7eb',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          Mostrando {filteredNodes.length} de {nodes.length} personas
        </div>
      )}

      <div style={{
        background: '#0f0f0f',
        border: '1px solid #2a2a2a',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px'
          }}>
            <thead>
              <tr style={{ background: '#1a1a1a' }}>
                <th style={{
                  color: '#ffffff',
                  fontWeight: '600',
                  padding: '16px 12px',
                  textAlign: 'left',
                  borderBottom: '1px solid #2a2a2a',
                  fontSize: '14px',
                  letterSpacing: '-0.025em'
                }}>
                  Nombre
                </th>
                <th style={{
                  color: '#ffffff',
                  fontWeight: '600',
                  padding: '16px 12px',
                  textAlign: 'left',
                  borderBottom: '1px solid #2a2a2a',
                  fontSize: '14px',
                  letterSpacing: '-0.025em'
                }}>
                  Nacimiento
                </th>
                <th style={{
                  color: '#ffffff',
                  fontWeight: '600',
                  padding: '16px 12px',
                  textAlign: 'left',
                  borderBottom: '1px solid #2a2a2a',
                  fontSize: '14px',
                  letterSpacing: '-0.025em'
                }}>
                  Descendiente de
                </th>
                <th style={{
                  color: '#ffffff',
                  fontWeight: '600',
                  padding: '16px 12px',
                  textAlign: 'left',
                  borderBottom: '1px solid #2a2a2a',
                  fontSize: '14px',
                  letterSpacing: '-0.025em'
                }}>
                  Contacto
                </th>
                {isAdminMode && (
                  <>
                    <th style={{
                      color: '#ffffff',
                      fontWeight: '600',
                      padding: '16px 12px',
                      textAlign: 'center',
                      borderBottom: '1px solid #2a2a2a',
                      fontSize: '14px',
                      letterSpacing: '-0.025em'
                    }}>
                      WhatsApp
                    </th>
                    <th style={{
                      color: '#ffffff',
                      fontWeight: '600',
                      padding: '16px 12px',
                      textAlign: 'center',
                      borderBottom: '1px solid #2a2a2a',
                      fontSize: '14px',
                      letterSpacing: '-0.025em'
                    }}>
                      Invitado
                    </th>
                    <th style={{
                      color: '#ffffff',
                      fontWeight: '600',
                      padding: '16px 12px',
                      textAlign: 'center',
                      borderBottom: '1px solid #2a2a2a',
                      fontSize: '14px',
                      letterSpacing: '-0.025em'
                    }}>
                      Confirmó
                    </th>
                    <th style={{
                      color: '#ffffff',
                      fontWeight: '600',
                      padding: '16px 12px',
                      textAlign: 'center',
                      borderBottom: '1px solid #2a2a2a',
                      fontSize: '14px',
                      letterSpacing: '-0.025em'
                    }}>
                      Pagó
                    </th>
                  </>
                )}
                <th style={{
                  color: '#ffffff',
                  fontWeight: '600',
                  padding: '16px 12px',
                  textAlign: 'center',
                  borderBottom: '1px solid #2a2a2a',
                  fontSize: '14px',
                  letterSpacing: '-0.025em'
                }}>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
            {filteredNodes.map((node, index) => {
              return (
                <tr key={node.id} style={{
                  borderBottom: index < filteredNodes.length - 1 ? '1px solid #2a2a2a' : 'none',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.closest('tr').style.background = '#1a1a1a'}
                onMouseLeave={(e) => e.target.closest('tr').style.background = 'transparent'}
                >
                  <td style={{
                    padding: '16px 12px',
                    color: '#ffffff',
                    verticalAlign: 'middle'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span style={{ fontWeight: '500' }}>{node.nombre}</span>
                      <span style={{
                        fontSize: '16px',
                        color: node.gender === "male" ? '#60a5fa' : '#f472b6'
                      }}>
                        {node.gender === "male" ? "♂" : "♀"}
                      </span>
                    </div>
                  </td>
                  <td style={{
                    padding: '16px 12px',
                    color: '#e5e7eb',
                    verticalAlign: 'middle'
                  }}>
                    {node.nacimiento || "-"}
                  </td>
                  <td style={{
                    padding: '16px 12px',
                    color: '#e5e7eb',
                    verticalAlign: 'middle'
                  }}>
                    {node.Descendientes || "-"}
                  </td>
                  <td style={{
                    padding: '16px 12px',
                    color: '#e5e7eb',
                    verticalAlign: 'middle'
                  }}>
                    {node.contacto || "-"}
                  </td>
                  {isAdminMode && (
                    <>
                      <td style={{
                        padding: '16px 12px',
                        textAlign: 'center',
                        verticalAlign: 'middle'
                      }}>
                        <span style={{
                          fontSize: '18px',
                          display: 'inline-block'
                        }}>
                          {node.whatsapp ? '✅' : '❌'}
                        </span>
                      </td>
                      <td style={{
                        padding: '16px 12px',
                        textAlign: 'center',
                        verticalAlign: 'middle'
                      }}>
                        <span style={{
                          fontSize: '18px',
                          display: 'inline-block'
                        }}>
                          {node.ha_sido_invitado ? '✅' : '❌'}
                        </span>
                      </td>
                      <td style={{
                        padding: '16px 12px',
                        textAlign: 'center',
                        verticalAlign: 'middle'
                      }}>
                        <span style={{
                          fontSize: '18px',
                          display: 'inline-block'
                        }}>
                          {node.confirmo_asistencia ? '✅' : '❌'}
                        </span>
                      </td>
                      <td style={{
                        padding: '16px 12px',
                        textAlign: 'center',
                        verticalAlign: 'middle'
                      }}>
                        <span style={{
                          fontSize: '18px',
                          display: 'inline-block'
                        }}>
                          {node.realizo_pago ? '✅' : '❌'}
                        </span>
                      </td>
                    </>
                  )}
                  <td style={{
                    padding: '16px 12px',
                    textAlign: 'center',
                    verticalAlign: 'middle'
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <button
                        onClick={() => handleViewNode(node)}
                        style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: '#ffffff',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-1px)';
                          e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        Ver
                      </button>
                      <button
                        onClick={() => onEditNode(node)}
                        style={{
                          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                          color: '#ffffff',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-1px)';
                          e.target.style.boxShadow = '0 4px 15px rgba(251, 191, 36, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(node)}
                        disabled={loading}
                        style={{
                          background: loading ? '#4b5563' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                          color: '#ffffff',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (!loading) {
                            e.target.style.transform = 'translateY(-1px)';
                            e.target.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.3)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!loading) {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                          }
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
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
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredNodes.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '64px 32px',
          color: '#9ca3af',
          fontSize: '16px',
          fontWeight: '500'
        }}>
          <p style={{ margin: 0 }}>No se encontraron personas.</p>
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
