const mongoose = require("mongoose");

const WaterUsageSchema = new mongoose.Schema({
  location: String,
  usage: Number,
  reservoirLevel: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("WaterUsage", WaterUsageSchema);