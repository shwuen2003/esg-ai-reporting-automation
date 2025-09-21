/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  // Handle CORS preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
      body: JSON.stringify({ message: "CORS preflight successful" }),
    };
  }

  try {
    // Parse the request body
    const requestBody = JSON.parse(event.body || "{}");
    const { framework, files, timestamp } = requestBody;

    console.log("Request data:", {
      framework,
      files: files?.length,
      timestamp,
    });

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
        inputs: {
          framework: framework,
          fileCount: files?.length || 0,
          timestamp: timestamp,
        },
        response_mode: "blocking",
        user: `user-${Date.now()}`, // Generate unique user ID
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Workflow API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Workflow response:", data);

    // Extract key information for easier frontend access
    const workflowStatus = data?.data?.status;
    const esgReport = data?.data?.outputs?.esg_report;
    const workflowError = data?.data?.error;

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
      body: JSON.stringify({
        success: true,
        message: "Workflow executed successfully",
        workflowStatus: workflowStatus,
        esgReport: esgReport,
        workflowError: workflowError,
        fullResponse: data, // Keep the full response for reference
        requestInfo: {
          framework,
          fileCount: files?.length || 0,
          timestamp,
        },
      }),
      
    };
  } catch (error) {
    console.error("Error calling workflow:", error);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
      body: JSON.stringify({
        success: false,
        error: "Failed to execute workflow",
        details: error.message,
      }),
    };
  }
};
