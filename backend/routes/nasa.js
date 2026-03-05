const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/events", async (req, res) => {

  try {

    const lat = 13.0827;
    const lon = 80.2707;

    const url =
      `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=PRECTOTCORR,T2M&community=AG&longitude=${lon}&latitude=${lat}&start=20240101&end=20240107&format=JSON`;

    const response = await axios.get(url);

    const rainfall = response.data.properties.parameter.PRECTOTCORR;
    const temp = response.data.properties.parameter.T2M;

    const chartData = Object.keys(rainfall).map(date => ({
      date,
      rainfall: rainfall[date],
      temperature: temp[date]
    }));

    res.json(chartData);

  } catch (error) {

    console.error("NASA API Error:", error.message);

    res.status(500).json({
      error: "NASA data fetch failed"
    });

  }

});

module.exports = router;