const express = require("express");
const router = express.Router();
const Alert = require("../models/Alert");

// Get all alerts
router.get("/", async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create alert
router.post("/", async (req, res) => {
  try {
    const alert = new Alert(req.body);
    await alert.save();
    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update alert (mark as resolved)
router.put("/:id", async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { resolved: true, resolvedAt: new Date() },
      { new: true }
    );
    res.json(alert);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;