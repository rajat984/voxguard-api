// ====== Load environment variables ======
require("dotenv").config();

// ====== Imports ======
const express = require("express");
const cors = require("cors");

// ====== App setup ======
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// ====== Config ======
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

// ====== Health check (optional, but useful) ======
app.get("/", (req, res) => {
  res.json({ status: "API is running" });
});

// ====== GUVI /detect endpoint ======
app.post("/detect", async (req, res) => {
  try {
    // 🔹 API key comes from HEADER (GUVI requirement)
    const apiKeyFromHeader = req.headers["x-api-key"];

    if (!apiKeyFromHeader || apiKeyFromHeader !== API_KEY) {
      return res.status(401).json({
        error: "Invalid API key"
      });
    }

    // 🔹 Audio comes from request body
    const { audio_base64 } = req.body;

    if (!audio_base64) {
      return res.status(400).json({
        error: "audio_base64 is required"
      });
    }

    // 🔹 Dummy response as allowed by GUVI
    return res.json({
      classification: "HUMAN",
      confidence: 0.5
    });

  } catch (err) {
    return res.status(500).json({
      error: "Internal server error"
    });
  }
});

// ====== Start server ======
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
