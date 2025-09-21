import {
  InboxOutlined,
  UploadOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { Button, Upload, Typography, Space, message, Select } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useReport } from "../contexts/ReportContext";
import { useInsight } from "../contexts/InsightContext";

const { Dragger } = Upload;
const { Title, Text } = Typography;

const FileUploadSection = ({ onStartAnalysis }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState(null);
  const navigate = useNavigate();
  const { updateReport, setReportError } = useReport();
  const { updateInsight, setInsightError } = useInsight();

  // Initialize mock uploaded files in global scope for demo
  useEffect(() => {
    if (!window.mockUploadedFiles) {
      window.mockUploadedFiles = [];
    }
    setUploadedFiles(window.mockUploadedFiles);
  }, []);

  const handleDelete = async (fileId) => {
    // Mock delete functionality
    window.mockUploadedFiles = window.mockUploadedFiles.filter(
      (file) => file.id !== fileId
    );
    setUploadedFiles(window.mockUploadedFiles);
    message.success("File deleted successfully");
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Add this new function to call both APIs
  const handleGenerateReport = async () => {
    if (!selectedFramework) {
      message.error("Please select a framework first");
      return;
    }

    // Always redirect to analysis screen first
    onStartAnalysis(selectedFramework);

    // Call both APIs in parallel
    try {
      console.log("Starting report and insight generation...");
      console.log("Selected framework:", selectedFramework);
      console.log("Uploaded files:", uploadedFiles);

      // Make both API calls simultaneously
      const [reportResponse, insightResponse] = await Promise.all([
        // First API call for report (existing bearer token)
        fetch("https://43.217.163.179/v1/workflows/run", {
          method: "POST",
          headers: {
            Authorization: "Bearer app-heFrrKvxN6jhKvhldeLt6G8r",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: {},
            response_mode: "blocking",
            user: "zh-123",
          }),
        }),
        // Second API call for insights (new bearer token)
        fetch("https://43.217.163.179/v1/workflows/run", {
          method: "POST",
          headers: {
            Authorization: "Bearer app-Nzsvi7P12rnQ3HzyMVtG6I3t",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: {},
            response_mode: "blocking",
            user: "zh-123",
          }),
        }),
      ]);

      // Process report response
      if (reportResponse.ok) {
        const reportResult = await reportResponse.json();
        console.log("Report API response:", reportResult);

        if (
          reportResult.data &&
          reportResult.data.status === "succeeded" &&
          reportResult.data.outputs &&
          reportResult.data.outputs.esg_report
        ) {
          updateReport({
            content: reportResult.data.outputs.esg_report,
            framework: selectedFramework,
            files: uploadedFiles,
            timestamp: new Date().toISOString(),
            workflowData: reportResult,
          });
          console.log("Report data stored successfully");
        } else {
          console.error("Report workflow failed:", reportResult.data?.error);
          setReportError(reportResult.data?.error || "No ESG report generated");
        }
      } else {
        throw new Error(`Report API error! status: ${reportResponse.status}`);
      }

      // Process insight response
      if (insightResponse.ok) {
        const insightResult = await insightResponse.json();
        console.log("Insight API response:", insightResult);

        if (
          insightResult.data &&
          insightResult.data.status === "succeeded" &&
          insightResult.data.outputs &&
          insightResult.data.outputs.esg_report
        ) {
          updateInsight({
            content: insightResult.data.outputs.esg_report,
            framework: selectedFramework,
            files: uploadedFiles,
            timestamp: new Date().toISOString(),
            workflowData: insightResult,
          });
          console.log("Insight data stored successfully");
        } else {
          console.error("Insight workflow failed:", insightResult.data?.error);
          setInsightError(
            insightResult.data?.error || "No ESG insights generated"
          );
        }
      } else {
        throw new Error(`Insight API error! status: ${insightResponse.status}`);
      }
    } catch (error) {
      console.error("Error calling APIs:", error);
      setReportError(error.message);
      setInsightError(error.message);
    }
  };

  const uploadProps = {
    name: "file",
    multiple: true,
    customRequest: ({ file, onSuccess }) => {
      // Mock upload functionality
      setUploading(true);

      setTimeout(() => {
        const mockFile = {
          id: Date.now(),
          originalName: file.name,
          filename: file.name,
          size: file.size,
          uploadDate: new Date().toISOString(),
        };

        if (!window.mockUploadedFiles) {
          window.mockUploadedFiles = [];
        }
        window.mockUploadedFiles.push(mockFile);
        setUploadedFiles([...window.mockUploadedFiles]);
        setUploading(false);
        onSuccess("ok");
        message.success(`${file.name} uploaded successfully`);
      }, 1000);
    },
    onChange(info) {
      // Handle upload status changes if needed
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    showUploadList: false, // We'll show our custom list
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <Title level={3} style={{ color: "#5A67BA", marginBottom: 8 }}>
          Upload PDF Documents
        </Title>
        <Text style={{ color: "rgba(166, 171, 200, 1)", fontSize: 16 }}>
          Upload your ESG PDF documents to generate automated reports
        </Text>
      </div>

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Upload Button */}
        <div>
          <Upload {...uploadProps} showUploadList={false}>
            <Button
              icon={<UploadOutlined />}
              size="large"
              loading={uploading}
              style={{
                backgroundColor: "#5A67BA",
                borderColor: "#5A67BA",
                color: "white",
                height: 48,
                fontSize: 16,
                fontWeight: 500,
                borderRadius: 8,
                padding: "0 32px",
              }}
              onMouseEnter={(e) => {
                if (!uploading) {
                  e.currentTarget.style.backgroundColor = "#4A57A8";
                  e.currentTarget.style.borderColor = "#4A57A8";
                }
              }}
              onMouseLeave={(e) => {
                if (!uploading) {
                  e.currentTarget.style.backgroundColor = "#5A67BA";
                  e.currentTarget.style.borderColor = "#5A67BA";
                }
              }}
            >
              {uploading ? "Uploading..." : "Upload Files"}
            </Button>
          </Upload>
        </div>

        {/* Drop Zone */}
        <Dragger
          {...uploadProps}
          style={{
            backgroundColor: "#F1F2F7",
            border: "2px dashed rgba(166, 171, 200, 0.6)",
            borderRadius: 12,
            padding: "48px 24px",
          }}
        >
          <p className="ant-upload-drag-icon" style={{ marginBottom: 16 }}>
            <InboxOutlined
              style={{
                fontSize: 48,
                color: "rgba(166, 171, 200, 0.8)",
              }}
            />
          </p>
          <p
            className="ant-upload-text"
            style={{
              fontSize: 18,
              fontWeight: 500,
              color: "#5A67BA",
              marginBottom: 8,
            }}
          >
            Drop your files here
          </p>
          <p
            className="ant-upload-hint"
            style={{
              fontSize: 14,
              color: "rgba(166, 171, 200, 1)",
              margin: 0,
            }}
          >
            Support for PDF files. You can upload multiple PDF documents at
            once.
          </p>
        </Dragger>

        {/* ESG Framework Selection */}
        {uploadedFiles.length > 0 && (
          <div
            style={{
              marginTop: 32,
              padding: "24px",
              background:
                "linear-gradient(135deg, rgba(90, 103, 186, 0.05) 0%, rgba(90, 103, 186, 0.1) 100%)",
              border: "2px solid rgba(90, 103, 186, 0.2)",
              borderRadius: 16,
              position: "relative",
              boxShadow: "0 4px 12px rgba(90, 103, 186, 0.15)",
            }}
          >
            {/* Step Indicator */}
            <div
              style={{
                position: "absolute",
                top: -12,
                left: 24,
                backgroundColor: "#5A67BA",
                color: "white",
                padding: "6px 16px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              STEP 2
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#5A67BA",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 16,
                  fontSize: 20,
                }}
              >
                🎯
              </div>
              <div>
                <Title level={4} style={{ color: "#5A67BA", marginBottom: 4 }}>
                  Select ESG Framework
                </Title>
                <Text
                  style={{
                    color: "rgba(90, 103, 186, 0.8)",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  Choose your reporting framework to continue
                </Text>
              </div>
            </div>

            <Select
              placeholder="🔍 Choose an ESG framework..."
              size="large"
              style={{
                width: "100%",
                marginBottom: 16,
              }}
              value={selectedFramework}
              onChange={(value) => setSelectedFramework(value)}
              options={[
                {
                  value: "bursa",
                  label: "🇲🇾 Bursa Malaysia Sustainability Reporting Guide",
                },
                {
                  value: "nsrf",
                  label: "📋 National Sustainable Reporting Framework (NSRF)",
                },
                {
                  value: "issb",
                  label:
                    "🌍 International Sustainability Standards Board (ISSB)",
                },
              ]}
            />

            {!selectedFramework && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 16px",
                  backgroundColor: "rgba(255, 193, 7, 0.1)",
                  border: "1px solid rgba(255, 193, 7, 0.3)",
                  borderRadius: 8,
                  marginTop: 8,
                }}
              >
                <span style={{ fontSize: 16, marginRight: 8 }}>⚠️</span>
                <Text
                  style={{ color: "#d48806", fontSize: 13, fontWeight: 500 }}
                >
                  Please select a framework to proceed with analysis
                </Text>
              </div>
            )}
          </div>
        )}

        {/* Start Analysis Button */}
        {uploadedFiles.length > 0 && selectedFramework && (
          <div style={{ textAlign: "center", margin: "32px 0" }}>
            <Button
              type="primary"
              size="large"
              icon={<PlayCircleOutlined />}
              onClick={handleGenerateReport}
              style={{
                backgroundColor: "#5A67BA",
                borderColor: "#5A67BA",
                height: 56,
                fontSize: 18,
                fontWeight: 600,
                borderRadius: 8,
                padding: "0 48px",
                boxShadow: "0 4px 12px rgba(90, 103, 186, 0.3)",
              }}
            >
              🚀 Generate Report
            </Button>
          </div>
        )}

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div>
            <Title level={4} style={{ color: "#5A67BA", marginBottom: 16 }}>
              Uploaded Files ({uploadedFiles.length})
            </Title>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  style={{
                    backgroundColor: "#F8F9FB",
                    border: "1px solid #E8EAED",
                    borderRadius: 8,
                    padding: "16px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <Text strong style={{ color: "#5A67BA", fontSize: 14 }}>
                      {file.originalName}
                    </Text>
                    <br />
                    <Text
                      style={{ color: "rgba(166, 171, 200, 1)", fontSize: 12 }}
                    >
                      {formatFileSize(file.size)} •{" "}
                      {new Date(file.uploadDate).toLocaleString()}
                    </Text>
                  </div>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(file.id)}
                    style={{
                      color: "#ff4d4f",
                      borderRadius: 6,
                    }}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* File Requirements */}
        <div
          style={{
            backgroundColor: "#F8F9FB",
            padding: 20,
            borderRadius: 8,
            border: "1px solid #E8EAED",
          }}
        >
          <Text
            strong
            style={{ color: "#5A67BA", fontSize: 14, marginBottom: 8 }}
          >
            File Requirements:
          </Text>
          <ul
            style={{
              margin: "8px 0 0 0",
              paddingLeft: 20,
              color: "rgba(166, 171, 200, 1)",
            }}
          >
            <li>Maximum file size: 10MB</li>
            <li>Supported formats: .pdf</li>
            <li>Files should contain ESG-related content for analysis</li>
          </ul>
        </div>
      </Space>
    </div>
  );
};

export default FileUploadSection;
