const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const API_KEY = process.env.OPENWEATHER_API_KEY || process.env.OPENWEATHER_KEY; // support both names
  const city = "Chennai";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const response = await axios.get(url);
  res.json(response.data);
});

module.exports = router;