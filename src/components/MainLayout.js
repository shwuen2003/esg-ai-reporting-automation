import { useState, useEffect } from "react";
import { Layout, Menu, Typography, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  FileTextOutlined,
  PlusOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RobotOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import kiwiLogo from "../assets/kiwi bird.jpg";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("1");
  const [collapsed, setCollapsed] = useState(false);

  // Map routes to menu keys
  const routeToKeyMap = {
    "/": "1",
    "/upload": "1",
    "/dashboard": "2",
    "/insight": "3",
    "/report": "4",
    "/chatbot": "5",
  };

  // Map menu keys to routes
  const keyToRouteMap = {
    1: "/upload",
    2: "/dashboard",
    3: "/insight",
    4: "/report",
    5: "/chatbot",
  };

  // Update selected key based on current route
  useEffect(() => {
    const currentKey = routeToKeyMap[location.pathname] || "1";
    setSelectedKey(currentKey);
  }, [location.pathname, routeToKeyMap]);

  const handleMenuClick = (e) => {
    const route = keyToRouteMap[e.key];
    if (route) {
      navigate(route);
      setSelectedKey(e.key);
    }
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header spanning full width */}
      <Header
        style={{
          background: "#fff",
          padding: "0 24px",
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapsed}
          style={{
            fontSize: "16px",
            width: 40,
            height: 40,
            marginRight: "8px",
          }}
        />
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // border: "2px solid #5A67BA",
          }}
        >
          <img
            src={kiwiLogo}
            alt="Kiwi Bird Logo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <Title
          level={5}
          style={{ margin: 0, color: "#5A67BA", fontWeight: 650 }}
        >
          Kiwi Bird
        </Title>
      </Header>

      <Layout style={{ marginTop: 64 }}>
        {/* Sidebar */}
        <Sider
          collapsible
          collapsed={collapsed}
          trigger={null}
          style={{
            background: "#F1F2F7",
            minHeight: "calc(100vh - 64px)",
          }}
          theme="light"
        >
          {!collapsed && (
            <div
              style={{
                padding: "16px 16px 8px 16px",
                color: "rgba(166, 171, 200, 1)",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.5px",
              }}
            >
              MENU
            </div>
          )}
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={handleMenuClick}
            style={{
              background: "#F1F2F7",
              border: "none",
            }}
            items={[
              {
                key: "1",
                icon: <PlusOutlined />,
                label: "Upload PDF",
                style: {
                  color:
                    selectedKey === "1" ? "#5A6ACF" : "rgba(166, 171, 200, 1)",
                  backgroundColor:
                    selectedKey === "1"
                      ? "rgba(112, 127, 221, 0.1)"
                      : "transparent",
                  margin: "4px 8px",
                  borderRadius: "6px",
                  fontWeight: selectedKey === "1" ? 600 : 400,
                },
              },
              {
                key: "2",
                icon: <DashboardOutlined />,
                label: "Dashboard",
                style: {
                  color:
                    selectedKey === "2" ? "#5A6ACF" : "rgba(166, 171, 200, 1)",
                  backgroundColor:
                    selectedKey === "2"
                      ? "rgba(112, 127, 221, 0.1)"
                      : "transparent",
                  margin: "4px 8px",
                  borderRadius: "6px",
                  fontWeight: selectedKey === "2" ? 600 : 400,
                },
              },
              {
                key: "3",
                icon: <BulbOutlined />,
                label: "Insight",
                style: {
                  color:
                    selectedKey === "3" ? "#5A6ACF" : "rgba(166, 171, 200, 1)",
                  backgroundColor:
                    selectedKey === "3"
                      ? "rgba(112, 127, 221, 0.1)"
                      : "transparent",
                  margin: "4px 8px",
                  borderRadius: "6px",
                  fontWeight: selectedKey === "3" ? 600 : 400,
                },
              },
              {
                key: "4",
                icon: <FileTextOutlined />,
                label: "Report",
                style: {
                  color:
                    selectedKey === "4" ? "#5A6ACF" : "rgba(166, 171, 200, 1)",
                  backgroundColor:
                    selectedKey === "4"
                      ? "rgba(112, 127, 221, 0.1)"
                      : "transparent",
                  margin: "4px 8px",
                  borderRadius: "6px",
                  fontWeight: selectedKey === "4" ? 600 : 400,
                },
              },
              {
                key: "5",
                icon: <RobotOutlined />,
                label: "Chatbot",
                style: {
                  color:
                    selectedKey === "5" ? "#5A6ACF" : "rgba(166, 171, 200, 1)",
                  backgroundColor:
                    selectedKey === "5"
                      ? "rgba(112, 127, 221, 0.1)"
                      : "transparent",
                  margin: "4px 8px",
                  borderRadius: "6px",
                  fontWeight: selectedKey === "5" ? 600 : 400,
                },
              },
            ]}
          />
        </Sider>

        {/* Page content */}
        <Content
          style={{
            padding: 32,
            background: "#fff",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
