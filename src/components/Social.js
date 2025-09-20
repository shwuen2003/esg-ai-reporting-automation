import React from "react";
import { Card, Row, Col, Typography } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { Pie } from "@ant-design/plots";

const { Title, Text } = Typography;

const Social = () => {
  // Age breakdown data
  const ageData = [
    { type: "<30", value: 13 },
    { type: "30-50", value: 72 },
    { type: ">50", value: 15 },
  ];

  // Gender breakdown data
  const genderData = [
    { type: "Male", value: 60 },
    { type: "Female", value: 40 },
  ];

  // Employment type breakdown data
  const employmentData = [
    { type: "Contract", value: 43 },
    { type: "Permanent", value: 57 },
  ];

  // Grade breakdown data
  const gradeData = [
    { type: "Non-Executive", value: 24 },
    { type: "Executive", value: 46 },
    { type: "Middle Management", value: 25 },
    { type: "Senior Management", value: 5 },
  ];

  // New Hires Data (189 total)
  // New hire gender breakdown
  const newHireGenderData = [
    { type: "Male", value: 58 },
    { type: "Female", value: 42 },
  ];

  // New hire age breakdown
  const newHireAgeData = [
    { type: "<30", value: 29 },
    { type: "30-50", value: 58 },
    { type: ">50", value: 13 },
  ];

  // New hire ethnicity breakdown
  const newHireEthnicityData = [
    { type: "Chinese", value: 13 },
    { type: "Indian", value: 8 },
    { type: "Malay", value: 76 },
    { type: "Others", value: 3 },
  ];

  // Turnover Rate Data by Grade (27.8% overall)
  const turnoverRateData = [
    { type: "Non-Executive", value: 26 },
    { type: "Executive", value: 54 },
    { type: "Middle Management", value: 18 },
    { type: "Senior Management", value: 2 },
  ];

  // Women Representation Data
  const womenBoardData = [
    { type: "Women", value: 37.5 },
    { type: "Men", value: 62.5 },
  ];

  const womenSeniorMgmtData = [
    { type: "Women", value: 20.5 },
    { type: "Men", value: 79.5 },
  ];

  // Common pie chart configuration
  const getPieConfig = (data, title) => ({
    data,
    angleField: "value",
    colorField: "type",
    innerRadius: 0.4,
    label: {
      text: (d) => `${d.value}%`,
      style: {
        fontWeight: "bold",
        fontSize: 12,
      },
    },
    legend: {
      color: {
        title: false,
        position: "bottom",
        rowPadding: 3,
        itemHeight: 20,
      },
    },
    annotations: [
      {
        type: "text",
        style: {
          text: title,
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 14,
          fontWeight: "bold",
          fill: "#666",
        },
      },
    ],
    tooltip: {
      formatter: (data) => {
        return { name: data.type, value: `${data.value}%` };
      },
    },
  });

  return (
    <div style={{ padding: "0px", background: "#f5f6fa", minHeight: "500px" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px", textAlign: "center" }}>
        <Title level={2} style={{ color: "#2c3e50", marginBottom: "8px" }}>
          <TeamOutlined style={{ marginRight: "12px", color: "#1890ff" }} />
          Employees Percentage Breakdown in 2024
        </Title>
        <Text style={{ color: "#666", fontSize: "16px" }}>
          Comprehensive demographic analysis of our workforce composition
        </Text>
      </div>

      {/* Pie Charts Row */}
      <Row gutter={[24, 24]}>
        {/* Age Breakdown */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            title={
              <span
                style={{
                  color: "#2c3e50",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Age Distribution
              </span>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              height: "400px",
            }}
            bodyStyle={{ padding: "16px" }}
          >
            <div style={{ height: "300px" }}>
              <Pie {...getPieConfig(ageData, "Age")} />
            </div>
          </Card>
        </Col>

        {/* Gender Breakdown */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            title={
              <span
                style={{
                  color: "#2c3e50",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Gender Distribution
              </span>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              height: "400px",
            }}
            bodyStyle={{ padding: "16px" }}
          >
            <div style={{ height: "300px" }}>
              <Pie {...getPieConfig(genderData, "Gender")} />
            </div>
          </Card>
        </Col>

        {/* Employment Type Breakdown */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            title={
              <span
                style={{
                  color: "#2c3e50",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Employment Type
              </span>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              height: "400px",
            }}
            bodyStyle={{ padding: "16px" }}
          >
            <div style={{ height: "300px" }}>
              <Pie {...getPieConfig(employmentData, "Type")} />
            </div>
          </Card>
        </Col>

        {/* Grade Breakdown */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            title={
              <span
                style={{
                  color: "#2c3e50",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Grade Distribution
              </span>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              height: "400px",
            }}
            bodyStyle={{ padding: "16px" }}
          >
            <div style={{ height: "300px" }}>
              <Pie {...getPieConfig(gradeData, "Grade")} />
            </div>
          </Card>
        </Col>
      </Row>

      {/* New Hires Section Header */}
      <div
        style={{ marginTop: "48px", marginBottom: "32px", textAlign: "center" }}
      >
        <Title level={3} style={{ color: "#2c3e50", marginBottom: "8px" }}>
          189 New Hires Breakdown in 2024
        </Title>
        <Text style={{ color: "#666", fontSize: "16px" }}>
          Demographic analysis of new employees recruited this year
        </Text>
      </div>

      {/* New Hires Pie Charts Row */}
      <Row gutter={[24, 24]}>
        {/* New Hire Gender Breakdown */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            title={
              <span
                style={{
                  color: "#2c3e50",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Gender Distribution
              </span>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              height: "400px",
            }}
            bodyStyle={{ padding: "16px" }}
          >
            <div style={{ height: "300px" }}>
              <Pie {...getPieConfig(newHireGenderData, "Gender")} />
            </div>
          </Card>
        </Col>

        {/* New Hire Age Breakdown */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            title={
              <span
                style={{
                  color: "#2c3e50",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Age Distribution
              </span>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              height: "400px",
            }}
            bodyStyle={{ padding: "16px" }}
          >
            <div style={{ height: "300px" }}>
              <Pie {...getPieConfig(newHireAgeData, "Age")} />
            </div>
          </Card>
        </Col>

        {/* New Hire Ethnicity Breakdown */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            title={
              <span
                style={{
                  color: "#2c3e50",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Ethnicity Distribution
              </span>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              height: "400px",
            }}
            bodyStyle={{ padding: "16px" }}
          >
            <div style={{ height: "300px" }}>
              <Pie {...getPieConfig(newHireEthnicityData, "Ethnicity")} />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Third Row: Turnover Rate & Women Representation */}
      <div
        style={{ marginTop: "48px", marginBottom: "32px", textAlign: "center" }}
      >
        <Title level={3} style={{ color: "#2c3e50", marginBottom: "8px" }}>
          Workforce Analytics & Diversity Metrics
        </Title>
        <Text style={{ color: "#666", fontSize: "16px" }}>
          Turnover patterns and leadership representation insights
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        {/* 1/3 Section - Turnover Rate */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <span
                style={{
                  color: "#2c3e50",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Turnover Rate by Grade (27.8% Overall)
              </span>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              height: "400px",
            }}
            bodyStyle={{ padding: "16px" }}
          >
            <div style={{ height: "300px" }}>
              <Pie {...getPieConfig(turnoverRateData, "Grade")} />
            </div>
          </Card>
        </Col>

        {/* 2/3 Section - Women Representation */}
        <Col xs={24} lg={16}>
          <Row gutter={[16, 0]} style={{ height: "400px" }}>
            {/* Women on Board */}
            <Col xs={24} sm={12}>
              <Card
                title={
                  <span
                    style={{
                      color: "#2c3e50",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Women on Board
                  </span>
                }
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  height: "400px",
                }}
                bodyStyle={{ padding: "16px" }}
              >
                <div style={{ height: "300px" }}>
                  <Pie {...getPieConfig(womenBoardData, "37.5%")} />
                </div>
              </Card>
            </Col>

            {/* Women in Senior Management */}
            <Col xs={24} sm={12}>
              <Card
                title={
                  <span
                    style={{
                      color: "#2c3e50",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Women in Senior Management
                  </span>
                }
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  height: "400px",
                }}
                bodyStyle={{ padding: "16px" }}
              >
                <div style={{ height: "300px" }}>
                  <Pie {...getPieConfig(womenSeniorMgmtData, "20.5%")} />
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Fourth Row: Training and Development Progress */}
      <div
        style={{ marginTop: "48px", marginBottom: "32px", textAlign: "center" }}
      >
        <Title level={3} style={{ color: "#2c3e50", marginBottom: "8px" }}>
          Training and Development Progress
        </Title>
        <Text style={{ color: "#666", fontSize: "16px" }}>
          Employee learning and development metrics for 2024
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        {/* Total Training Hours */}
        <Col xs={24} lg={12}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              height: "250px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
            }}
            bodyStyle={{
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Title
              level={1}
              style={{ color: "white", margin: "0 0 8px 0", fontSize: "48px" }}
            >
              40,661
            </Title>
            <Title level={3} style={{ color: "white", margin: "0 0 16px 0" }}>
              Total Training Hours
            </Title>
            <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px" }}>
              2023: 8,884 hours
            </Text>
            <div
              style={{
                marginTop: "8px",
                padding: "4px 12px",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "20px",
              }}
            >
              <Text
                style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}
              >
                +357% increase
              </Text>
            </div>
          </Card>
        </Col>

        {/* Average Employee Training Hours */}
        <Col xs={24} lg={12}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              height: "250px",
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "white",
            }}
            bodyStyle={{
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Title
              level={1}
              style={{ color: "white", margin: "0 0 8px 0", fontSize: "48px" }}
            >
              27.4
            </Title>
            <Title level={3} style={{ color: "white", margin: "0 0 16px 0" }}>
              Average Employee Training Hours
            </Title>
            <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px" }}>
              2023: 6.4 hours
            </Text>
            <div
              style={{
                marginTop: "8px",
                padding: "4px 12px",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "20px",
              }}
            >
              <Text
                style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}
              >
                +328% increase
              </Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Social;
