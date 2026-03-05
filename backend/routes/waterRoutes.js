const express = require("express");
const router = express.Router();
const WaterUsage = require("../models/WaterUsage");

router.get("/", async (req, res) => {
  const data = await WaterUsage.find().sort({ timestamp: -1 }).limit(10);
  res.json(data);
});

router.post("/", async (req, res) => {
  const water = new WaterUsage(req.body);
  await water.save();
  res.json(water);
});

module.exports = router;