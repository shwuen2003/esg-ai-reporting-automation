import React from "react";
import { Card, Row, Col, Typography } from "antd";
import { ExperimentOutlined } from "@ant-design/icons";
import { Column } from "@ant-design/plots";
import { forEach, groupBy } from "lodash";

const { Title, Text } = Typography;

const Environmental = () => {
  // Scope 1 and 2 Emissions Data
  const emissionsData = [
    { year: "2020", type: "Scope 1", value: 1983, total: 27504 },
    { year: "2020", type: "Scope 2", value: 25521, total: 27504 },
    { year: "2021", type: "Scope 1", value: 2021, total: 24323 },
    { year: "2021", type: "Scope 2", value: 22302, total: 24323 },
    { year: "2022", type: "Scope 1", value: 4339, total: 29065 },
    { year: "2022", type: "Scope 2", value: 24726, total: 29065 },
    { year: "2023", type: "Scope 1", value: 7870, total: 35210 },
    { year: "2023", type: "Scope 2", value: 27339, total: 35210 },
    { year: "2024", type: "Scope 1", value: 8793, total: 29067 },
    { year: "2024", type: "Scope 2", value: 20274, total: 29067 },
  ].filter(
    (item) =>
      item.year && item.type && item.value !== undefined && item.value !== null
  );

  // Create annotations for total labels
  const annotations = [];
  forEach(groupBy(emissionsData, "year"), (values, year) => {
    // Only process years 2020-2024
    if (year >= "2020" && year <= "2024") {
      const total = values.reduce((a, b) => a + b.value, 0);
      annotations.push({
        type: "text",
        position: [year, total + 1000],
        content: total.toLocaleString(),
        style: {
          textAlign: "center",
          fontSize: 12,
          fontWeight: "bold",
          fill: "#333",
        },
      });
    }
  });

  // Add the 5.7% decrease annotation
  annotations.push({
    type: "text",
    position: ["2024", 32000],
    content: "▼ 5.7%",
    style: {
      textAlign: "center",
      fontSize: 12,
      fontWeight: "bold",
      fill: "#d32f2f",
    },
  });

  const chartConfig = {
    data: emissionsData,
    xField: "year",
    yField: "value",
    stack: true,
    colorField: "type",
    color: ["#2d5016", "#7cb342"], // Dark green for Scope 1, light green for Scope 2
    columnWidthRatio: 0.6,
    maxColumnWidth: 60,
    scale: {
      x: {
        type: "band",
        domain: ["2020", "2021", "2022", "2023", "2024"], // Explicitly set the years
      },
    },
    label: {
      text: (datum) => (datum?.value ? datum.value.toLocaleString() : "0"),
      textBaseline: "middle",
      position: "inside",
      style: {
        fill: "white",
        fontWeight: "bold",
        fontSize: 12,
      },
    },
    legend: {
      position: "top-right",
      offsetY: -10,
    },
    tooltip: {
      formatter: (datum) => {
        return {
          name: datum?.type || "Unknown",
          value: `${datum?.value ? datum.value.toLocaleString() : "0"} tCO2e`,
        };
      },
    },
    annotations,
    yAxis: {
      title: {
        text: "Emissions (tCO2e)",
        style: {
          fontSize: 12,
          fontWeight: "bold",
        },
      },
      label: {
        formatter: (value) => `${Math.round(value / 1000)}k`,
      },
    },
    xAxis: {
      title: {
        text: "Year",
        style: {
          fontSize: 12,
          fontWeight: "bold",
        },
      },
    },
  };

  // Business Segment Data - Separated by segment for individual charts
  const corporateData = [
    { year: "2020", type: "Scope 1", value: 196 },
    { year: "2020", type: "Scope 2", value: 143 },
    { year: "2021", type: "Scope 1", value: 167 },
    { year: "2021", type: "Scope 2", value: 68 },
    { year: "2022", type: "Scope 1", value: 211 },
    { year: "2022", type: "Scope 2", value: 58 },
    { year: "2023", type: "Scope 1", value: 134 },
    { year: "2023", type: "Scope 2", value: 62 },
    { year: "2024", type: "Scope 1", value: 156 },
    { year: "2024", type: "Scope 2", value: 70 },
  ];

  const psData = [
    { year: "2020", type: "Scope 1", value: 450 },
    { year: "2020", type: "Scope 2", value: 410 },
    { year: "2021", type: "Scope 1", value: 723 },
    { year: "2021", type: "Scope 2", value: 890 },
    { year: "2022", type: "Scope 1", value: 812 },
    { year: "2022", type: "Scope 2", value: 688 },
    { year: "2023", type: "Scope 1", value: 945 },
    { year: "2023", type: "Scope 2", value: 755 },
    { year: "2024", type: "Scope 1", value: 823 },
    { year: "2024", type: "Scope 2", value: 629 },
  ];

  const fmData = [
    { year: "2020", type: "Scope 1", value: 12545 },
    { year: "2020", type: "Scope 2", value: 7780 },
    { year: "2021", type: "Scope 1", value: 10234 },
    { year: "2021", type: "Scope 2", value: 7160 },
    { year: "2022", type: "Scope 1", value: 11678 },
    { year: "2022", type: "Scope 2", value: 7019 },
    { year: "2023", type: "Scope 1", value: 12890 },
    { year: "2023", type: "Scope 2", value: 7693 },
    { year: "2024", type: "Scope 1", value: 6234 },
    { year: "2024", type: "Scope 2", value: 4445 },
  ];

  const eceData = [
    { year: "2020", type: "Scope 1", value: 2456 },
    { year: "2020", type: "Scope 2", value: 1533 },
    { year: "2021", type: "Scope 1", value: 2134 },
    { year: "2021", type: "Scope 2", value: 1355 },
    { year: "2022", type: "Scope 1", value: 2567 },
    { year: "2022", type: "Scope 2", value: 1636 },
    { year: "2023", type: "Scope 1", value: 2456 },
    { year: "2023", type: "Scope 2", value: 1634 },
    { year: "2024", type: "Scope 1", value: 4567 },
    { year: "2024", type: "Scope 2", value: 3079 },
  ];

  const pdiData = [
    { year: "2020", type: "Scope 1", value: 5 },
    { year: "2020", type: "Scope 2", value: 3 },
    { year: "2021", type: "Scope 1", value: 98 },
    { year: "2021", type: "Scope 2", value: 86 },
    { year: "2022", type: "Scope 1", value: 267 },
    { year: "2022", type: "Scope 2", value: 268 },
    { year: "2023", type: "Scope 1", value: 289 },
    { year: "2023", type: "Scope 2", value: 291 },
    { year: "2024", type: "Scope 1", value: 334 },
    { year: "2024", type: "Scope 2", value: 237 },
  ];

  // Helper function to generate chart config for each segment
  const getSegmentChartConfig = (data, segmentName) => ({
    data,
    xField: "year",
    yField: "value",
    colorField: "type",
    isStack: true,
    color: ["#2d5016", "#7cb342"], // Dark green for Scope 1, light green for Scope 2
    style: {
      inset: 2,
    },
    columnWidthRatio: 0.8,
    label: {
      text: (datum) =>
        datum?.value && datum.value > 50 ? datum.value.toLocaleString() : "",
      position: "inside",
      style: {
        fill: "white",
        fontWeight: "bold",
        fontSize: 9,
      },
    },
    legend: false, // Individual charts don't need legends since we have a global one
    tooltip: {
      formatter: (datum) => {
        return {
          name: `${segmentName} - ${datum?.type}`,
          value: `${datum?.value ? datum.value.toLocaleString() : "0"} tCO₂e`,
        };
      },
    },
    yAxis: {
      title: null,
      label: {
        formatter: (value) => {
          if (value >= 1000) {
            return `${Math.round(value / 1000)}k`;
          }
          return value.toString();
        },
        style: {
          fontSize: 10,
        },
      },
    },
    xAxis: {
      title: null,
      label: {
        style: {
          fontSize: 10,
        },
      },
    },
  });

  return (
    <div style={{ padding: "24px", background: "#f5f6fa", minHeight: "500px" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px", textAlign: "center" }}>
        <Title level={2} style={{ color: "#2c3e50", marginBottom: "8px" }}>
          <ExperimentOutlined
            style={{ marginRight: "12px", color: "#52c41a" }}
          />
          Environmental Performance Dashboard
        </Title>
        <Text style={{ color: "#666", fontSize: "16px" }}>
          Carbon emissions tracking and environmental impact metrics
        </Text>
      </div>

      {/* Scope 1 and 2 Emissions Chart */}
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card
            title={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    color: "#2c3e50",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  Scope 1 and 2 Absolute Emissions
                </span>
              </div>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
            bodyStyle={{ padding: "24px" }}
          >
            <div style={{ height: "400px" }}>
              <Column {...chartConfig} />
            </div>
          </Card>
        </Col>
      </Row>

      {/* GHG Emissions by Business Segment - 5 Separate Charts */}
      <div
        style={{ marginTop: "48px", marginBottom: "32px", textAlign: "center" }}
      >
        <Title level={3} style={{ color: "#2c3e50", marginBottom: "8px" }}>
          GHG Emissions by Business Segment (tCO₂e)
        </Title>
        <Text style={{ color: "#666", fontSize: "16px" }}>
          Individual segment analysis with optimized scales for better
          visualization
        </Text>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            marginTop: "16px",
            fontSize: "14px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: "#2d5016",
                borderRadius: "2px",
              }}
            ></div>
            <span>Scope 1</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: "#7cb342",
                borderRadius: "2px",
              }}
            ></div>
            <span>Scope 2</span>
          </div>
        </div>
      </div>

      <Row gutter={[16, 16]}>
        {/* Corporate Segment */}
        <Col xs={24} sm={12} lg={8} xl={4.8}>
          <Card
            title={
              <div style={{ textAlign: "center" }}>
                <span
                  style={{
                    color: "#2c3e50",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Corporate
                </span>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#52c41a",
                    fontWeight: "bold",
                  }}
                >
                  ▼ 33%
                </div>
              </div>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
            bodyStyle={{ padding: "16px" }}
          >
            <div style={{ height: "250px" }}>
              <Column {...getSegmentChartConfig(corporateData, "Corporate")} />
            </div>
          </Card>
        </Col>

        {/* PS Segment */}
        <Col xs={24} sm={12} lg={8} xl={4.8}>
          <Card
            title={
              <div style={{ textAlign: "center" }}>
                <span
                  style={{
                    color: "#2c3e50",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  PS
                </span>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#f5222d",
                    fontWeight: "bold",
                  }}
                >
                  ▲ 127%
                </div>
              </div>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
            bodyStyle={{ padding: "16px" }}
          >
            <div style={{ height: "250px" }}>
              <Column {...getSegmentChartConfig(psData, "PS")} />
            </div>
          </Card>
        </Col>

        {/* FM Segment */}
        <Col xs={24} sm={12} lg={8} xl={4.8}>
          <Card
            title={
              <div style={{ textAlign: "center" }}>
                <span
                  style={{
                    color: "#2c3e50",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  FM
                </span>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#52c41a",
                    fontWeight: "bold",
                  }}
                >
                  ▼ 16%
                </div>
              </div>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
            bodyStyle={{ padding: "16px" }}
          >
            <div style={{ height: "250px" }}>
              <Column {...getSegmentChartConfig(fmData, "FM")} />
            </div>
          </Card>
        </Col>

        {/* ECE Segment */}
        <Col xs={24} sm={12} lg={8} xl={4.8}>
          <Card
            title={
              <div style={{ textAlign: "center" }}>
                <span
                  style={{
                    color: "#2c3e50",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  ECE
                </span>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#f5222d",
                    fontWeight: "bold",
                  }}
                >
                  ▲ 92%
                </div>
              </div>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
            bodyStyle={{ padding: "16px" }}
          >
            <div style={{ height: "250px" }}>
              <Column {...getSegmentChartConfig(eceData, "ECE")} />
            </div>
          </Card>
        </Col>

        {/* PDI Segment */}
        <Col xs={24} sm={12} lg={8} xl={4.8}>
          <Card
            title={
              <div style={{ textAlign: "center" }}>
                <span
                  style={{
                    color: "#2c3e50",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  PDI
                </span>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#f5222d",
                    fontWeight: "bold",
                  }}
                >
                  ▲ 7,038%
                </div>
              </div>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
            bodyStyle={{ padding: "16px" }}
          >
            <div style={{ height: "250px" }}>
              <Column {...getSegmentChartConfig(pdiData, "PDI")} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Environmental;
