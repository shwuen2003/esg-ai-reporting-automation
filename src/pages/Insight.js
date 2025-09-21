import React, { useRef } from "react";
import { Typography, Card, Spin, Alert, Button, Space, Tag } from "antd";
import {
  FileTextOutlined,
  DownloadOutlined,
  EyeOutlined,
  ArrowLeftOutlined,
  FilePdfOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { useInsight } from "../contexts/InsightContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "highlight.js/styles/github.css"; // Add syntax highlighting styles

const { Title, Text } = Typography;

const Insight = () => {
  const navigate = useNavigate();
  const { insightData, loading, error } = useInsight();
  const reportRef = useRef(null);

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
          Generating your ESG insights...
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
          message="Insight Generation Failed"
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

  // No insight data
  if (!insightData) {
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
            No Insights Available
          </Title>
          <Text style={{ color: "#999", fontSize: "16px" }}>
            Please generate insights first by uploading documents
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
    const file = new Blob([insightData.content], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = `ESG_Insights_${insightData.framework}_${
      new Date().toISOString().split("T")[0]
    }.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadPDF = async () => {
    if (!reportRef.current) return;

    try {
      // Show loading state
      const loadingMessage = document.createElement("div");
      loadingMessage.innerHTML =
        '<div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">📄 Generating PDF...</div>';
      document.body.appendChild(loadingMessage);

      // Create canvas from the report content
      const canvas = await html2canvas(reportRef.current, {
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        height: reportRef.current.scrollHeight,
        width: reportRef.current.scrollWidth,
      });

      const imgData = canvas.toDataURL("image/png");

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Calculate dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save(
        `ESG_Insights_${insightData.framework}_${
          new Date().toISOString().split("T")[0]
        }.pdf`
      );

      // Remove loading message
      document.body.removeChild(loadingMessage);
    } catch (error) {
      console.error("Error generating PDF:", error);

      // Remove loading message if it exists
      const loadingEl = document.querySelector('div[style*="Generating PDF"]');
      if (loadingEl) {
        document.body.removeChild(loadingEl.parentElement);
      }

      // Show error message
      const errorDiv = document.createElement("div");
      errorDiv.innerHTML =
        '<div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #ff4d4f; color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">❌ Error generating PDF. Please try again.</div>';
      document.body.appendChild(errorDiv);
      setTimeout(() => {
        if (document.body.contains(errorDiv)) {
          document.body.removeChild(errorDiv);
        }
      }, 3000);
    }
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
              <Tag color="purple">
                {getFrameworkName(insightData.framework)}
              </Tag>
              <Tag color="green">
                {insightData.files?.length || 0} Files Processed
              </Tag>
            </div>
          </div>

          <Title level={2} style={{ color: "#2c3e50", marginBottom: "8px" }}>
            <BulbOutlined style={{ marginRight: "12px", color: "#5A67BA" }} />
            ESG Insights & Analysis
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
              {new Date(insightData.timestamp).toLocaleDateString("en-US", {
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
                icon={<DownloadOutlined />}
                onClick={downloadReport}
                style={{ borderColor: "#5A67BA", color: "#5A67BA" }}
              >
                Download MD
              </Button>
              <Button
                type="primary"
                icon={<FilePdfOutlined />}
                onClick={downloadPDF}
                style={{ backgroundColor: "#5A67BA", borderColor: "#5A67BA" }}
              >
                Download PDF
              </Button>
            </Space>
          </div>
        </div>

        {/* Report Content */}
        <Card
          ref={reportRef}
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
              {insightData.content}
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
            This insight report was automatically generated using AI analysis of
            your uploaded documents. Framework:{" "}
            {getFrameworkName(insightData.framework)} | Files processed:{" "}
            {insightData.files?.length || 0} | Insight ID:{" "}
            {insightData.workflowData?.data?.id || "N/A"}
          </Text>
        </Card>
      </div>
    </div>
  );
};

export default Insight;
