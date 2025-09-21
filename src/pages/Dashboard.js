import { useState, useEffect } from "react";
import { Tabs, Typography } from "antd";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();

  // Initialize Dify chatbot only when on dashboard route
  useEffect(() => {
    // Set up Dify chatbot configuration
    window.difyChatbotConfig = {
      token: "fHdXhfYjGoyhj4er",
      baseUrl: "https://43.217.163.179",
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

    // Check if script already exists to avoid duplicates
    let existingScript = document.getElementById("fHdXhfYjGoyhj4er");
    if (!existingScript) {
      // Add Dify chatbot script
      const script = document.createElement("script");
      script.src = "https://43.217.163.179/embed.min.js";
      script.id = "fHdXhfYjGoyhj4er";
      script.defer = true;
      document.body.appendChild(script);
    }

    // Check if style already exists to avoid duplicates
    let existingStyle = document.getElementById("dify-chatbot-style");
    if (!existingStyle) {
      // Add custom styles
      const style = document.createElement("style");
      style.id = "dify-chatbot-style";
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
    }

    // Function to show/hide chatbot based on route
    const toggleChatbotVisibility = () => {
      const chatbotButton = document.getElementById(
        "dify-chatbot-bubble-button"
      );
      const chatbotWindow = document.getElementById(
        "dify-chatbot-bubble-window"
      );

      if (location.pathname === "/dashboard") {
        // Show chatbot on dashboard
        if (chatbotButton) {
          chatbotButton.style.display = "block";
        }
        // Don't automatically show the window - let user click to open
        if (chatbotWindow) {
          chatbotWindow.style.display = "none";
        }
      } else {
        // Hide chatbot on other routes and close any open chat
        if (chatbotButton) {
          chatbotButton.style.display = "none";
        }
        if (chatbotWindow) {
          chatbotWindow.style.display = "none";
        }
      }
    };

    // Initial call to set visibility
    const checkAndToggle = () => {
      toggleChatbotVisibility();
      // If elements don't exist yet, try again after a short delay
      const chatbotButton = document.getElementById(
        "dify-chatbot-bubble-button"
      );
      if (!chatbotButton && location.pathname === "/dashboard") {
        setTimeout(checkAndToggle, 100);
      }
    };

    // Call immediately and set up interval for elements that load asynchronously
    setTimeout(checkAndToggle, 100);

    // Cleanup function - only hide, don't remove
    return () => {
      const chatbotButton = document.getElementById(
        "dify-chatbot-bubble-button"
      );
      const chatbotWindow = document.getElementById(
        "dify-chatbot-bubble-window"
      );

      if (chatbotButton) {
        chatbotButton.style.display = "none";
      }
      if (chatbotWindow) {
        chatbotWindow.style.display = "none";
      }
    };
  }, [location.pathname]); // Re-run when route changes

  // Close chatbot window when switching tabs within dashboard
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      const chatbotWindow = document.getElementById(
        "dify-chatbot-bubble-window"
      );
      if (chatbotWindow) {
        chatbotWindow.style.display = "none";
      }
    }
  }, [activeTab]); // Close chatbot when tab changes

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
