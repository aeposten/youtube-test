const axios = require('axios');

exports.handler = async (event) => {
  console.log("request")
  try {
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        },
        body: "",
      };
    } else if (event.httpMethod === "POST") {
      const {name} = JSON.parse(event.body)
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*", // Allow from anywhere
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        },
        body: JSON.stringify({message: "Hello" + name}),
      };
    }

    const { channelId, searchValue } = JSON.parse(event.body);

    const API_KEY = "AIzaSyC-0bMXoBYRfR1Gp5k1JCVNy38cgIX_IHk";

    const BASE_URL = "https://www.googleapis.com/youtube/v3/search";
    const response = await axios.get(BASE_URL, {
      params: {
        part: 'snippet',
        key: API_KEY,
        maxResults: 10,
        channelId: channelId,
        q: searchValue
      }
    });
    
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*", // Allow from anywhere
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

