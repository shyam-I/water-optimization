const express = require("express");
const router = express.Router();
const Region = require("../models/Region");

// Get all regions
router.get("/", async (req, res) => {
  try {
    const regions = await Region.find();
    res.json(regions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create region
router.post("/", async (req, res) => {
  try {
    const region = new Region(req.body);
    await region.save();
    res.status(201).json(region);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update region
router.put("/:id", async (req, res) => {
  try {
    const region = await Region.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(region);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;