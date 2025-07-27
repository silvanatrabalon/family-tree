import { useState, useEffect } from "react";
import { fetchNodesFromSheet } from "./events/api/fetchNode";
import NodeForm from "./NodeForm";
import NodeList from "./NodeList";
import AdminLogin from "./AdminLogin";
import { useAdmin } from "../context/AdminContext";
import "./AdminPanel.css";

const AdminPanel = ({ onNavigateToTree }) => {
  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeTab, setActiveTab] = useState("add"); // "add", "edit", "list"
  const [loading, setLoading] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  
  const { isAdminMode, logout } = useAdmin();

  const loadNodes = async () => {
    setLoading(true);
    try {
      const fetchedNodes = await fetchNodesFromSheet();
      setNodes(fetchedNodes);
    } catch (error) {
      console.error("Error loading nodes:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadNodes();
  }, []);

  const handleNodeCreated = () => {
    loadNodes();
    setActiveTab("list");
  };

  const handleNodeUpdated = () => {
    loadNodes();
    setSelectedNode(null);
    setActiveTab("list");
  };

  const handleEditNode = (node) => {
    setSelectedNode(node);
    setActiveTab("edit");
  };

  const handleDeleteNode = () => {
    loadNodes();
    setSelectedNode(null);
    setActiveTab("list");
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>Panel de Administración</h2>
        <div className="admin-header-actions">
          <div className="admin-mode-section">
            {isAdminMode ? (
              <div className="admin-status">
                <span className="admin-badge">Modo Admin</span>
                <button 
                  className="admin-logout-btn"
                  onClick={logout}
                  title="Cerrar sesión de administrador"
                >
                  Salir
                </button>
              </div>
            ) : (
              <button 
                className="admin-login-btn"
                onClick={() => setShowAdminLogin(true)}
                title="Acceder al modo administrador"
              >
                Modo Admin
              </button>
            )}
          </div>
          <button 
            className="nav-button"
            onClick={onNavigateToTree}
          >
            Ver Árbol Genealógico
          </button>
        </div>
      </div>

      <div className="admin-tabs">
        <button 
          className={`tab ${activeTab === "add" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("add");
            setSelectedNode(null);
          }}
        >
          Agregar Persona
        </button>
        <button 
          className={`tab ${activeTab === "list" ? "active" : ""}`}
          onClick={() => setActiveTab("list")}
        >
          Lista de Personas
        </button>
      </div>

      <div className="admin-content">
        {loading && <div className="loading">Cargando...</div>}
        
        {activeTab === "add" && (
          <NodeForm 
            nodes={nodes}
            onNodeCreated={handleNodeCreated}
            isAdminMode={isAdminMode}
          />
        )}

        {activeTab === "edit" && selectedNode && (
          <NodeForm 
            nodes={nodes}
            editNode={selectedNode}
            onNodeUpdated={handleNodeUpdated}
            isAdminMode={isAdminMode}
          />
        )}

        {activeTab === "list" && (
          <NodeList 
            nodes={nodes}
            onEditNode={handleEditNode}
            onDeleteNode={handleDeleteNode}
            onRefresh={loadNodes}
            isAdminMode={isAdminMode}
          />
        )}
      </div>
      
      <AdminLogin 
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
      />
    </div>
  );
};

export default AdminPanel;
