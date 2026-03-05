const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['flood', 'shortage', 'maintenance', 'anomaly'],
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  location: String,
  region: String,
  timestamp: {
    type: Date,
    default: Date.now
  },
  resolved: {
    type: Boolean,
    default: false
  },
  resolvedAt: Date
});

module.exports = mongoose.model("Alert", AlertSchema);