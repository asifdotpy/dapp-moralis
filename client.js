const axios = require("axios");

async function getTime() {
  try {
    const response = await axios.get("http://185.70.197.77:8081/currentTime");
    console.log(response.data);
    return response.data;
  } catch (error) {
    return [];
  }
}

getTime();
