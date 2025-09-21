import { useState } from "react";
import { Tabs, Typography, FloatButton, Modal } from "antd";
import {
  HighlightOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  ExperimentOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import KeyHighlights from "../components/KeyHighlights";
import Environmental from "../components/Environmental";
import Social from "../components/Social";
import Governance from "../components/Governance";

const { Title } = Typography;

function Dashboard() {
  const [activeTab, setActiveTab] = useState("1");
  const [chatbotOpen, setChatbotOpen] = useState(false);

  // Get selected framework from global state
  const selectedFramework = window.selectedFramework || "ESG";
  const getFrameworkName = (framework) => {
    const frameworkMap = {
      bursa: "Bursa Malaysia",
      nsrf: "NSRF",
      issb: "ISSB",
    };
    return frameworkMap[framework] || "ESG";
  };

  const frameworkDisplayName = getFrameworkName(selectedFramework);

  const tabItems = [
    {
      key: "1",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <HighlightOutlined style={{ color: "#faad14" }} />
          Key Highlights
        </span>
      ),
      children: <KeyHighlights />,
    },
    {
      key: "2",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ExperimentOutlined style={{ color: "#52c41a" }} />
          Environmental
        </span>
      ),
      children: <Environmental />,
    },
    {
      key: "3",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <TeamOutlined style={{ color: "#1890ff" }} />
          Social
        </span>
      ),
      children: <Social />,
    },
    {
      key: "4",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <SafetyCertificateOutlined style={{ color: "#722ed1" }} />
          Governance
        </span>
      ),
      children: <Governance />,
    },
  ];

  return (
    <div style={{ background: "#f5f6fa", minHeight: "100vh", padding: "0" }}>
      {/* Dashboard Header */}
      <div
        style={{
          background: "#fff",
          padding: "24px",
          marginBottom: "0px",
          borderRadius: "0 0 0px 0px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <Title level={2} style={{ margin: 0, color: "#5A67BA" }}>
          📊 ESG Dashboard - {frameworkDisplayName} Framework
        </Title>
        <p style={{ margin: "8px 0 0 0", color: "#666" }}>
          Comprehensive Environmental, Social, and Governance metrics based on
          your uploaded documents
        </p>
      </div>

      {/* Dashboard Tabs */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        size="large"
        style={{
          background: "transparent",
          padding: "0 0px",
        }}
        tabBarStyle={{
          background: "#fff",
          margin: "0 0 24px 0",
          padding: "0 24px",
          borderRadius: "0px 0px 12px 12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      />

      {/* Floating Chatbot Button */}
      <FloatButton
        icon={<MessageOutlined />}
        type="primary"
        style={{
          right: 24,
          bottom: 24,
          width: 60,
          height: 60,
          backgroundColor: "#5A67BA",
          borderColor: "#5A67BA",
        }}
        onClick={() => setChatbotOpen(true)}
        tooltip="Open AI Assistant"
      />

      {/* Chatbot Modal */}
      <Modal
        title="AI Assistant"
        open={chatbotOpen}
        onCancel={() => setChatbotOpen(false)}
        footer={null}
        width={800}
        style={{ top: 20 }}
        bodyStyle={{ padding: 0, height: "70vh" }}
      >
        <iframe
          src="http://43.216.88.84/chatbot/fHdXhfYjGoyhj4er"
          style={{
            width: "100%",
            height: "100%",
            minHeight: "500px",
            border: "none",
          }}
          frameBorder="0"
          allow="microphone"
        />
      </Modal>
    </div>
  );
}

export default Dashboard;
