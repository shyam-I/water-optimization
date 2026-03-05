const express = require("express");
const router = express.Router();
const Prediction = require("../models/Prediction");

// Get predictions
router.get("/", async (req, res) => {
  try {
    const predictions = await Prediction.find().sort({ date: 1 });
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create prediction
router.post("/", async (req, res) => {
  try {
    const prediction = new Prediction(req.body);
    await prediction.save();
    res.status(201).json(prediction);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;