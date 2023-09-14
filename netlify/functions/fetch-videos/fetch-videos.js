require("dotenv").config();
const process = require("process");

exports.handler = async (event) => {
  try {
    // Handle CORS preflight request.
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*", // Allow from anywhere
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        },
        body: "",
      };
    }

    // Handle POST request.
    if (event.httpMethod === "POST") {
      const { channelId, searchValue } = JSON.parse(event.body);

      

      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.YOUTUBE_API_KEY}&maxResults=10&channelId=${channelId}&q=${searchValue}`;

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
    }

    // If the request HTTP method is neither OPTIONS nor POST, return a method not allowed message.
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*", 
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
      body: JSON.stringify({ message: "Method not allowed" }),
    };

  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
