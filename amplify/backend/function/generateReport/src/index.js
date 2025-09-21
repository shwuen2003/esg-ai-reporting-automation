/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  try {
    // Make the API call to the workflow endpoint
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Disable SSL verification (not recommended for production)
    const response = await fetch("https://43.217.163.179/v1/workflows/run", {
      method: "POST",
      timeout: 600000, // 10 minutes timeout
      headers: {
        Authorization: "Bearer app-Nzsvi7P12rnQ3HzyMVtG6I3t",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: {},
        response_mode: "blocking",
        user: "abc-123",
      }),
    });

    const data = await response.json();
    const esg_report = data.get("data").get("outputs").get("esg_report");
    console.log("Workflow response data:", data);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({
        esg_report: esg_report,
        
      }),
      
    };
  } catch (error) {
    console.error("Error calling workflow:", error);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({
        error: "Failed to execute workflow",
        details: error.message,
      }),
    };
  }
};
