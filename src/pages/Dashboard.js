import { useState, useEffect } from "react";
import { Tabs, Typography } from "antd";
import {
  HighlightOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import KeyHighlights from "../components/KeyHighlights";
import Environmental from "../components/Environmental";
import Social from "../components/Social";
import Governance from "../components/Governance";

const { Title } = Typography;

function Dashboard() {
  const [activeTab, setActiveTab] = useState("1");

  // Initialize Dify chatbot
  useEffect(() => {
    // Set up Dify chatbot configuration
    window.difyChatbotConfig = {
      token: "fHdXhfYjGoyhj4er",
      baseUrl: "http://43.217.163.179",
      inputs: {
        // You can define the inputs from the Start node here
        // key is the variable name
        // e.g.
        // name: "NAME"
      },
      systemVariables: {
        // user_id: 'YOU CAN DEFINE USER ID HERE',
        // conversation_id: 'YOU CAN DEFINE CONVERSATION ID HERE, IT MUST BE A VALID UUID',
      },
      userVariables: {
        // avatar_url: 'YOU CAN DEFINE USER AVATAR URL HERE',
        // name: 'YOU CAN DEFINE USER NAME HERE',
      },
    };

    // Add Dify chatbot script
    const script = document.createElement("script");
    script.src = "http://43.217.163.179/embed.min.js";
    script.id = "fHdXhfYjGoyhj4er";
    script.defer = true;
    document.body.appendChild(script);

    // Add custom styles
    const style = document.createElement("style");
    style.textContent = `
      #dify-chatbot-bubble-button {
        background-color: #5A67BA !important;
      }
      #dify-chatbot-bubble-window {
        width: 24rem !important;
        height: 40rem !important;
      }
    `;
    document.head.appendChild(style);

    // Cleanup function
    return () => {
      // Remove script and style on component unmount
      const existingScript = document.getElementById("fHdXhfYjGoyhj4er");
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, []);

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
    </div>
  );
}

export default Dashboard;
