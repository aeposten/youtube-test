// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
exports.handler = async (event) => {
  try {
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "https://6501c27678d0300008f40e1d--tangerine-torte-2fd1e5.netlify.app",
          // "Access-Control-Allow-Origin": "*", // Allow from anywhere
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        },
        body: "",
      };
    }

    const { channelId, searchValue } = JSON.parse(event.body);

    const API_KEY = "AIzaSyC-0bMXoBYRfR1Gp5k1JCVNy38cgIX_IHk";

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&maxResults=10&channelId=${channelId}&q=${searchValue}`;

    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*", // Allow from anywhere
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };