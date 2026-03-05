const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Region = require("./models/Region");
const Alert = require("./models/Alert");
const Prediction = require("./models/Prediction");
const WaterUsage = require("./models/WaterUsage");

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    // Clear existing data
    await Region.deleteMany();
    await Alert.deleteMany();
    await Prediction.deleteMany();
    await WaterUsage.deleteMany();

    // Seed regions
    const regions = [
      { name: 'Region A', population: 850000, allocation: 450, perCapita: 529, inequality: 'High', accessLevel: 'Adequate', coordinates: { lat: 40.7128, lng: -74.0060 } },
      { name: 'Region B', population: 620000, allocation: 280, perCapita: 452, inequality: 'Medium', accessLevel: 'Adequate', coordinates: { lat: 34.0522, lng: -118.2437 } },
      { name: 'Region C', population: 1200000, allocation: 290, perCapita: 242, inequality: 'Very High', accessLevel: 'Scarce', coordinates: { lat: 41.8781, lng: -87.6298 } },
      { name: 'Region D', population: 450000, allocation: 200, perCapita: 444, inequality: 'Low', accessLevel: 'Adequate', coordinates: { lat: 29.7604, lng: -95.3698 } },
      { name: 'Region E', population: 780000, allocation: 180, perCapita: 231, inequality: 'High', accessLevel: 'Scarce', coordinates: { lat: 33.4484, lng: -112.0740 } },
    ];
    await Region.insertMany(regions);

    // Seed alerts
    const alerts = [
      { type: 'flood', severity: 'high', message: 'Heavy rainfall detected in Region C', location: 'Region C', region: 'Region C' },
      { type: 'shortage', severity: 'medium', message: 'Water usage spike in Region E', location: 'Region E', region: 'Region E' },
      { type: 'maintenance', severity: 'low', message: 'Scheduled maintenance for pump station A', location: 'Region A', region: 'Region A' },
      { type: 'anomaly', severity: 'medium', message: 'Unusual consumption pattern detected', location: 'Region B', region: 'Region B' },
    ];
    await Alert.insertMany(alerts);

    // Seed predictions
    const predictions = [
      { location: 'Region A', predictedUsage: 480, confidence: 85, date: new Date('2026-03-06'), factors: { weather: 'Sunny', population: 850000, historical: 450 } },
      { location: 'Region B', predictedUsage: 310, confidence: 78, date: new Date('2026-03-06'), factors: { weather: 'Cloudy', population: 620000, historical: 280 } },
      { location: 'Region C', predictedUsage: 320, confidence: 92, date: new Date('2026-03-06'), factors: { weather: 'Rainy', population: 1200000, historical: 290 } },
      { location: 'Region D', predictedUsage: 220, confidence: 88, date: new Date('2026-03-06'), factors: { weather: 'Sunny', population: 450000, historical: 200 } },
      { location: 'Region E', predictedUsage: 200, confidence: 76, date: new Date('2026-03-06'), factors: { weather: 'Sunny', population: 780000, historical: 180 } },
    ];
    await Prediction.insertMany(predictions);

    // Seed water usage
    const waterUsages = [
      { location: 'Region A', usage: 450, reservoirLevel: 85 },
      { location: 'Region B', usage: 280, reservoirLevel: 78 },
      { location: 'Region C', usage: 290, reservoirLevel: 45 },
      { location: 'Region D', usage: 200, reservoirLevel: 82 },
      { location: 'Region E', usage: 180, reservoirLevel: 38 },
    ];
    await WaterUsage.insertMany(waterUsages);

    // Seed demo user
    const User = require("./models/User");
    const demoUser = new User({ name: 'Admin User', email: 'admin@water.ai', password: 'admin' });
    await demoUser.save();

    console.log('Data seeded successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();