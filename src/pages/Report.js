import React from "react";
import { Typography, Card, Spin, Alert, Button, Space, Tag } from "antd";
import {
  FileTextOutlined,
  DownloadOutlined,
  EyeOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { useReport } from "../contexts/ReportContext";
import "highlight.js/styles/github.css"; // Add syntax highlighting styles

const { Title, Text } = Typography;

const Report = () => {
  const navigate = useNavigate();
  const { reportData, loading, error } = useReport();

  // Loading state
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Spin size="large" />
        <Text style={{ color: "#666", fontSize: "16px" }}>
          Generating your ESG report...
        </Text>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px" }}
      >
        <Alert
          message="Report Generation Failed"
          description={error}
          type="error"
          showIcon
          action={
            <Space>
              <Button size="small" onClick={() => navigate("/upload")}>
                Try Again
              </Button>
            </Space>
          }
        />
      </div>
    );
  }

  // No report data
  if (!reportData) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <FileTextOutlined style={{ fontSize: "64px", color: "#d9d9d9" }} />
        <div style={{ textAlign: "center" }}>
          <Title level={3} style={{ color: "#666", marginBottom: "8px" }}>
            No Report Available
          </Title>
          <Text style={{ color: "#999", fontSize: "16px" }}>
            Please generate a report first by uploading documents
          </Text>
        </div>
        <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/upload")}
          style={{ backgroundColor: "#5A67BA", borderColor: "#5A67BA" }}
        >
          Go to Upload
        </Button>
      </div>
    );
  }

  const downloadReport = () => {
    const element = document.createElement("a");
    const file = new Blob([reportData.content], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = `ESG_Report_${reportData.framework}_${
      new Date().toISOString().split("T")[0]
    }.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getFrameworkName = (framework) => {
    const frameworkMap = {
      bursa: "Bursa Malaysia",
      nsrf: "NSRF",
      issb: "ISSB",
    };
    return frameworkMap[framework] || framework?.toUpperCase() || "ESG";
  };

  return (
    <div style={{ background: "#f5f6fa", minHeight: "100vh", padding: "24px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate("/dashboard")}
              style={{ borderColor: "#5A67BA", color: "#5A67BA" }}
            >
              Back to Dashboard
            </Button>
            <div>
              <Tag color="blue">{getFrameworkName(reportData.framework)}</Tag>
              <Tag color="green">
                {reportData.files?.length || 0} Files Processed
              </Tag>
            </div>
          </div>

          <Title level={2} style={{ color: "#2c3e50", marginBottom: "8px" }}>
            <FileTextOutlined
              style={{ marginRight: "12px", color: "#5A67BA" }}
            />
            ESG Compliance Report
          </Title>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#666", fontSize: "16px" }}>
              Generated on{" "}
              {new Date(reportData.timestamp).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>

            <Space>
              <Button icon={<EyeOutlined />} onClick={() => window.print()}>
                Print
              </Button>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={downloadReport}
                style={{ backgroundColor: "#5A67BA", borderColor: "#5A67BA" }}
              >
                Download Report
              </Button>
            </Space>
          </div>
        </div>

        {/* Report Content */}
        <Card
          style={{
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            marginBottom: "32px",
          }}
          bodyStyle={{
            padding: "40px",
            fontSize: "16px",
            lineHeight: "1.8",
          }}
        >
          <div
            style={{
              maxWidth: "none",
              color: "#2c3e50",
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                h1: ({ children }) => (
                  <Title
                    level={1}
                    style={{
                      color: "#2c3e50",
                      marginTop: "32px",
                      marginBottom: "16px",
                      borderBottom: "2px solid #5A67BA",
                      paddingBottom: "8px",
                    }}
                  >
                    {children}
                  </Title>
                ),
                h2: ({ children }) => (
                  <Title
                    level={2}
                    style={{
                      color: "#2c3e50",
                      marginTop: "28px",
                      marginBottom: "14px",
                    }}
                  >
                    {children}
                  </Title>
                ),
                h3: ({ children }) => (
                  <Title
                    level={3}
                    style={{
                      color: "#2c3e50",
                      marginTop: "24px",
                      marginBottom: "12px",
                    }}
                  >
                    {children}
                  </Title>
                ),
                p: ({ children }) => (
                  <Text
                    style={{
                      display: "block",
                      marginBottom: "16px",
                      fontSize: "16px",
                      lineHeight: "1.7",
                    }}
                  >
                    {children}
                  </Text>
                ),
                ul: ({ children }) => (
                  <ul style={{ marginBottom: "16px", paddingLeft: "24px" }}>
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol style={{ marginBottom: "16px", paddingLeft: "24px" }}>
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li
                    style={{
                      marginBottom: "8px",
                      fontSize: "16px",
                      lineHeight: "1.6",
                    }}
                  >
                    {children}
                  </li>
                ),
                blockquote: ({ children }) => (
                  <div
                    style={{
                      borderLeft: "4px solid #5A67BA",
                      paddingLeft: "16px",
                      margin: "16px 0",
                      backgroundColor: "#f8f9fa",
                      padding: "16px",
                      borderRadius: "4px",
                    }}
                  >
                    {children}
                  </div>
                ),
                table: ({ children }) => (
                  <div style={{ overflowX: "auto", margin: "16px 0" }}>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        backgroundColor: "white",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                    >
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th
                    style={{
                      padding: "12px 16px",
                      borderBottom: "2px solid #5A67BA",
                      backgroundColor: "#f8f9fa",
                      fontWeight: "600",
                      textAlign: "left",
                      color: "#2c3e50",
                    }}
                  >
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td
                    style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid #e8e8e8",
                      fontSize: "15px",
                    }}
                  >
                    {children}
                  </td>
                ),
              }}
            >
              {reportData.content}
            </ReactMarkdown>
          </div>
        </Card>

        {/* Footer Info */}
        <Card
          size="small"
          style={{
            borderRadius: "8px",
            backgroundColor: "#f8f9fa",
            border: "1px solid #e8e8e8",
          }}
        >
          <Text style={{ color: "#666", fontSize: "14px" }}>
            This report was automatically generated using AI analysis of your
            uploaded documents. Framework:{" "}
            {getFrameworkName(reportData.framework)} | Files processed:{" "}
            {reportData.files?.length || 0} | Report ID:{" "}
            {reportData.workflowData?.data?.id || "N/A"}
          </Text>
        </Card>
      </div>
    </div>
  );
};

export default Report;
