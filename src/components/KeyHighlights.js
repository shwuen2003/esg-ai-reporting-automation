import { Card, Row, Col, Typography, Statistic, Badge } from "antd";
import {
  TrophyOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const KeyHighlights = () => {
  return (
    <div style={{ padding: "0px", background: "#f5f6fa", minHeight: "500px" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px", textAlign: "center" }}>
        <Title level={2} style={{ color: "#5A67BA", marginBottom: "8px" }}>
          🏆 ENVIRONMENTAL, SOCIAL, AND GOVERNANCE (ESG) HIGHLIGHTS
        </Title>
        <Text style={{ fontSize: "16px", color: "#666" }}>
          Key performance indicators and achievements from MRCB's sustainability
          journey
        </Text>
      </div>

      {/* First Row - Top 3 Highlights */}
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
        <Col xs={24} sm={8}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              textAlign: "center",
              border: "2px solid #1890ff",
            }}
          >
            <TeamOutlined
              style={{
                fontSize: "32px",
                color: "#1890ff",
                marginBottom: "12px",
              }}
            />
            <Statistic
              title="Women Employees"
              value={40}
              suffix="%"
              valueStyle={{
                color: "#1890ff",
                fontSize: "36px",
                fontWeight: "bold",
              }}
            />
            <Text style={{ color: "#666", fontSize: "14px" }}>
              of MRCB employees are women
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              textAlign: "center",
              border: "2px solid #52c41a",
            }}
          >
            <TrophyOutlined
              style={{
                fontSize: "32px",
                color: "#52c41a",
                marginBottom: "12px",
              }}
            />
            <Statistic
              title="QLASSIC Score - Alstonia Project"
              value={83}
              suffix="%"
              valueStyle={{
                color: "#52c41a",
                fontSize: "36px",
                fontWeight: "bold",
              }}
            />
            <Text style={{ color: "#666", fontSize: "14px" }}>
              Quality assessment achievement
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              textAlign: "center",
              border: "2px solid #722ed1",
            }}
          >
            <SafetyCertificateOutlined
              style={{
                fontSize: "32px",
                color: "#722ed1",
                marginBottom: "12px",
              }}
            />
            <Statistic
              title="QLASSIC Score - Jabil Facility"
              value={78}
              suffix="%"
              valueStyle={{
                color: "#722ed1",
                fontSize: "36px",
                fontWeight: "bold",
              }}
            />
            <Text style={{ color: "#666", fontSize: "14px" }}>
              Chuping Valley Industrial Area, Perlis
            </Text>
          </Card>
        </Col>
      </Row>

      {/* ESG Ratings & Scores */}
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              textAlign: "center",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              height: "140px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Title level={3} style={{ color: "white", marginBottom: "8px" }}>
              AA
            </Title>
            <Text
              style={{ color: "white", fontSize: "16px", fontWeight: "500" }}
            >
              MSCI ESG Rating
            </Text>
            <br />
            <Text style={{ color: "white", fontSize: "12px", opacity: 0.8 }}>
              ↗ from A in 2023
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              textAlign: "center",
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "white",
              height: "140px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Title level={3} style={{ color: "white", marginBottom: "8px" }}>
              3.9
            </Title>
            <Text
              style={{ color: "white", fontSize: "16px", fontWeight: "500" }}
            >
              FTSE4Good Index Score
            </Text>
            <br />
            <Text style={{ color: "white", fontSize: "12px", opacity: 0.8 }}>
              ↗ from 3.6 in 2023
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              textAlign: "center",
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              color: "white",
              height: "140px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>
              ⭐⭐⭐⭐⭐
            </div>
            <Text
              style={{ color: "white", fontSize: "16px", fontWeight: "500" }}
            >
              5-STAR SHASSIC
            </Text>
            <br />
            <Text style={{ color: "white", fontSize: "12px", opacity: 0.8 }}>
              Kwasa Utama C8 (Plot 2)
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              textAlign: "center",
              background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
              color: "white",
              height: "140px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Title level={3} style={{ color: "white", marginBottom: "8px" }}>
              23%
            </Title>
            <Text
              style={{ color: "white", fontSize: "16px", fontWeight: "500" }}
            >
              GHG Emissions Reduction
            </Text>
            <br />
            <Text style={{ color: "white", fontSize: "12px", opacity: 0.8 }}>
              Scope 1 & 2 from 2020 baseline
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Key Metrics */}
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
        <Col xs={24} sm={12} lg={8}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              height: "180px",
              display: "flex",
              flexDirection: "column",
            }}
            title={<span style={{ color: "#5A67BA" }}>📚 Social Impact</span>}
          >
            <Statistic
              title="Prisoners/Offenders Upskilled"
              value={470}
              valueStyle={{ color: "#52c41a", fontSize: "24px" }}
            />
            <Text style={{ color: "#666", fontSize: "14px" }}>
              via PEKA@MRCB Programme
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              height: "180px",
              display: "flex",
              flexDirection: "column",
            }}
            title={
              <span style={{ color: "#5A67BA" }}>🛡️ Governance Excellence</span>
            }
          >
            <div style={{ marginBottom: "12px" }}>
              <Statistic
                title="Malaysian Corporate Governance Code"
                value="42/43"
                valueStyle={{ color: "#722ed1", fontSize: "20px" }}
              />
              <Text style={{ color: "#666", fontSize: "12px" }}>
                Practices + 4/5 Step-Ups
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              height: "180px",
              display: "flex",
              flexDirection: "column",
            }}
            title={
              <span style={{ color: "#5A67BA" }}>🔒 Security & Equality</span>
            }
          >
            <div style={{ marginBottom: "12px" }}>
              <Badge status="success" text="ZERO Cybersecurity Breaches" />
              <br />
              <Badge status="success" text="ZERO Customer Data Breaches" />
              <br />
              <Text
                style={{
                  color: "#fa8c16",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                2.7% Gender Pay Gap
              </Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Awards Section */}
      <Card
        style={{
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          background: "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)",
          color: "#2c3e50",
        }}
        title={
          <span style={{ color: "#2c3e50", fontSize: "20px" }}>
            🏆 Awards & Recognition 2024
          </span>
        }
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <div
              style={{
                textAlign: "center",
                padding: "16px",
                height: "120px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>🥇</div>
              <Text
                style={{
                  color: "#2c3e50",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                National Corporate Governance & Sustainability Awards
              </Text>
              <br />
              <Text style={{ color: "#666", fontSize: "12px" }}>
                Excellence Award - Ranked 44th out of 854 PLCs
              </Text>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div
              style={{
                textAlign: "center",
                padding: "16px",
                height: "120px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>🥇</div>
              <Text
                style={{
                  color: "#2c3e50",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Australasian Reporting Awards
              </Text>
              <br />
              <Text style={{ color: "#666", fontSize: "12px" }}>
                Gold Award
              </Text>
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
          <Col xs={24} sm={12}>
            <div
              style={{
                textAlign: "center",
                padding: "16px",
                height: "120px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>🏗️</div>
              <Text
                style={{
                  color: "#2c3e50",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                BCI Asia Awards
              </Text>
              <br />
              <Text style={{ color: "#666", fontSize: "12px" }}>
                Malaysia's Top 10 Developers
              </Text>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div
              style={{
                textAlign: "center",
                padding: "16px",
                height: "120px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>🚆</div>
              <Text
                style={{
                  color: "#2c3e50",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Railway Project Achievement Award
              </Text>
              <br />
              <Text style={{ color: "#666", fontSize: "12px" }}>
                Safety Management & Best Practices 2023
              </Text>
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
          <Col xs={24} sm={12}>
            <div
              style={{
                textAlign: "center",
                padding: "16px",
                height: "120px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>🌟</div>
              <Text
                style={{
                  color: "#2c3e50",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                The Edge ESG Awards
              </Text>
              <br />
              <Text style={{ color: "#666", fontSize: "12px" }}>
                Gold for Most Consistent Performer Over Five Years
              </Text>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div
              style={{
                textAlign: "center",
                padding: "16px",
                height: "120px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>📊</div>
              <Text
                style={{
                  color: "#2c3e50",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                NACRA 2024
              </Text>
              <br />
              <Text style={{ color: "#666", fontSize: "12px" }}>
                Gold Excellence Award (Companies &lt; RM2B Market Cap)
              </Text>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default KeyHighlights;
