const axios = require('axios');
require('dotenv').config();

const api = axios.create({
  baseURL: process.env.BASE_API_URL,
  timeout: 15000,
});

module.exports = api;
