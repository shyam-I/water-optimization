const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
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

// routes
app.use("/api/water", authMiddleware, waterRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/alerts", authMiddleware, alertRoutes);
app.use("/api/predictions", authMiddleware, predictionRoutes);
app.use("/api/regions", authMiddleware, regionRoutes);
app.use("/api/weather", authMiddleware, weatherRoutes);

// test route
app.get("/", (req, res) => {
  res.send("AI Water Optimization API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});