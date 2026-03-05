const mongoose = require("mongoose");

const PredictionSchema = new mongoose.Schema({
  location: String,
  predictedUsage: Number,
  confidence: Number,
  date: {
    type: Date,
    required: true
  },
  factors: {
    weather: String,
    population: Number,
    historical: Number
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Prediction", PredictionSchema);