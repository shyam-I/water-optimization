const mongoose = require("mongoose");

const RegionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  population: Number,
  allocation: Number,
  perCapita: Number,
  inequality: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Very High']
  },
  accessLevel: {
    type: String,
    enum: ['Scarce', 'Adequate', 'Abundant']
  },
  coordinates: {
    lat: Number,
    lng: Number
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Region", RegionSchema);