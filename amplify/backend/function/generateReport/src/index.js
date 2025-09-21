/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  try {
    // Make the API call to the workflow endpoint
    const response = await fetch("http://43.216.88.84/v1/workflows/run", {
      method: "POST",
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

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({
        message: "Workflow executed successfully",
        data: data,
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
