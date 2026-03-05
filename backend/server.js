const express = require("express");
console.log('loading server.js from', __filename, 'cwd', process.cwd());
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const nasaRoutes = require("./routes/nasa");
const waterRoutes = require("./routes/waterRoutes");
const authRoutes = require("./routes/auth");
const alertRoutes = require("./routes/alerts");
const predictionRoutes = require("./routes/predictions");
const regionRoutes = require("./routes/regions");
const weatherRoutes = require("./routes/weather");

const authMiddleware = require("./middleware/auth");

dotenv.config();

// connect database
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// debug: log all incoming requests
const fs = require('fs');
app.use((req, res, next) => {
  const line = `${new Date().toISOString()} ${req.method} ${req.url}\n`;
  try { fs.appendFileSync('requests.log', line); } catch {}
  console.log("incoming request", req.method, req.url);
  next();
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/nasa", nasaRoutes);
app.use("/api/water", authMiddleware, waterRoutes);
app.use("/api/alerts", authMiddleware, alertRoutes);
app.use("/api/predictions", authMiddleware, predictionRoutes);
app.use("/api/regions", authMiddleware, regionRoutes);

// weather API (public)
app.use("/api/weather", authMiddleware, weatherRoutes);

// Test NASA route
app.get("/api/nasa-test", (req, res) => {
  res.json({ message: "NASA test route working" });
});

// test route
app.get("/", (req, res) => {
  res.send("AI Water Optimization API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});