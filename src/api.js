const axios = require("axios");

const api = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://db-chatbot-sos.up.railway.app",
  timeout: 15000,
});

module.exports = { api };
