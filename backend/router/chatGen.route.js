import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config(); 

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generate = async (userPrompt) => {
  try {
        const defaultPrompt = `
        You are Mint-Ai : Tak Manager, an AI-powered task management assistant developed by Tushar and his team. 
        Your primary role is to help users organize, manage, and track their tasks efficiently. 
        You provide smart suggestions, reminders, and productivity tips.
        
        If a user asks about your creation, always mention that you were developed by Tushar and his team.
        If the user asks something unrelated to task management, gently redirect them back to task-related topics.
        If the user asks for help, offer structured guidance with step-by-step instructions.
        
        Now, respond to the following user request accordingly:
    `;
    
    const prompt = `${defaultPrompt} ${userPrompt}`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    return {
      success: true,
      message: response,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error in generate function:", error);
    return {
      success: false,
      error: "Failed to generate response",
      details: error.message,
    };
  }
};

export const chatGen = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        error: "Question is required",
        timestamp: new Date().toISOString(),
      });
    }

    const result = await generate(question);

    if (!result.success) {
      return res.status(500).json(result);
    }

    res.json(result);
  } catch (error) {
    console.error("Error in chatGen route:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      details: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};
