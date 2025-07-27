import { useState, useEffect } from "react";
import { fetchNodesFromSheet } from "./events/api/fetchNode";
import NodeForm from "./NodeForm";
import NodeList from "./NodeList";
import "./AdminPanel.css";

const AdminPanel = ({ onNavigateToTree }) => {
  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeTab, setActiveTab] = useState("add"); // "add", "edit", "list"
  const [loading, setLoading] = useState(false);

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
        <button 
          className="nav-button"
          onClick={onNavigateToTree}
        >
          Ver Árbol Genealógico
        </button>
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
          />
        )}

        {activeTab === "edit" && selectedNode && (
          <NodeForm 
            nodes={nodes}
            editNode={selectedNode}
            onNodeUpdated={handleNodeUpdated}
          />
        )}

        {activeTab === "list" && (
          <NodeList 
            nodes={nodes}
            onEditNode={handleEditNode}
            onDeleteNode={handleDeleteNode}
            onRefresh={loadNodes}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
