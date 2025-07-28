import { useState, useEffect } from "react";
import { fetchNodesFromSheet } from "./events/api/fetchNode";
import NodeForm from "./NodeForm";
import NodeList from "./NodeList";
import AdminLogin from "./AdminLogin";
import { useAdmin } from "../context/AdminContext";
import "./AdminPanel.css";

const AdminPanel = ({ activeTab = "add", onTabChange }) => {
  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { isAdminMode } = useAdmin();

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

  // Resetear nodo seleccionado cuando se cambia a "add"
  useEffect(() => {
    if (activeTab === 'add') {
      setSelectedNode(null);
    }
  }, [activeTab]);

  const handleNodeCreated = () => {
    loadNodes();
    onTabChange && onTabChange("list");
  };

  const handleNodeUpdated = () => {
    loadNodes();
    setSelectedNode(null);
    onTabChange && onTabChange("list");
  };

  const handleEditNode = (node) => {
    setSelectedNode(node);
    onTabChange && onTabChange("edit");
  };

  const handleDeleteNode = () => {
    loadNodes();
    setSelectedNode(null);
    onTabChange && onTabChange("list");
  };

  return (
    <div className="admin-panel">
      <div className="admin-content">
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
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
