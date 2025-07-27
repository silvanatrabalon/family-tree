import { useState, useEffect } from "react";
import { fetchNodesFromSheet } from "./events/api/fetchNode";
import NodeForm from "./NodeForm";
import NodeList from "./NodeList";
import AdminLogin from "./AdminLogin";
import { useAdmin } from "../context/AdminContext";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeTab, setActiveTab] = useState("add"); // "add", "edit", "list"
  const [loading, setLoading] = useState(false);
  
  const { isAdminMode } = useAdmin();

  const loadNodes = async () => {
    setLoading(true);
    try {
      const fetchedNodes = await fetchNodesFromSheet();
      setNodes(fetchedNodes);
    } catch (error) {
      // Silently handle loading errors
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
        <h2>Modifica los miembros del árbol genealógico</h2>
      </div>

      <div className="admin-tabs">
        <button 
          className={`tab ${activeTab === "add" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("add");
            setSelectedNode(null);
          }}
        >
          <span className="tab-icon">➕</span>
          <span>Agregar Persona</span>
        </button>
        <button 
          className={`tab ${activeTab === "list" ? "active" : ""}`}
          onClick={() => setActiveTab("list")}
        >
          <span className="tab-icon">📋</span>
          <span>Lista de Personas</span>
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
    </div>
  );
};

export default AdminPanel;
