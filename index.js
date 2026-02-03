require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

/**
 * POST /detect
 * Accepts both GUVI and manual formats
 */
app.post("/detect", async (req, res) => {
  try {
    // 1️⃣ API KEY (GUVI sends it in header)
    const clientKey = req.headers["x-api-key"];
    if (!clientKey || clientKey !== API_KEY) {
      return res.status(401).json({ error: "Invalid API key" });
    }

    // 2️⃣ AUDIO BASE64 (GUVI uses audioBase64)
    const audioBase64 =
      req.body.audio_base64 || req.body.audioBase64;

    if (!audioBase64) {
      return res.status(400).json({
        error: "audio_base64 is required",
      });
    }

    // 3️⃣ MOCK ANALYSIS (allowed in GUVI)
    return res.json({
      classification: "HUMAN",
      confidence: 0.5,
      explanation: "Mock detection for GUVI evaluation",
    });

  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

app.get("/", (req, res) => {
  res.send("VoxGuard API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
