async function analyzeAudio(audioBase64) {
  try {
    if (!audioBase64 || typeof audioBase64 !== "string") {
      throw new Error("Invalid audio input");
    }

    // Placeholder logic (Stage-2 safe)
    // You can replace this later with your real AI logic
    const classification = "HUMAN";
    const confidence = 0.5;

    return { classification, confidence };

  } catch (error) {
    return {
      classification: "HUMAN",
      confidence: 0.5
    };
  }
}

module.exports = { analyzeAudio };
