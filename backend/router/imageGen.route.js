import axios from "axios";

export const imageGen = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        error: "Question is required",
        timestamp: new Date().toISOString(),
      });
    }

    const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(
      question
    )}?width=512&height=512&seed=${Math.floor(Math.random() * 1000)}`;

    // Send structured response
    res.json({
      success: true,
      data: {
        url: imageUrl,
        prompt: question,
        dimensions: {
          width: 512,
          height: 512,
        },
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in imageGen:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to generate image",
      details: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};
