import { generateToken } from "../lib/auth.lib.js";
import { z } from "zod";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const requiredBody = z.object({
    email: z.string().email(),
    password: z.string().min(1),
  });

  try {
    const validationResult = requiredBody.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationResult.error.errors,
      });
    }

    const { email, password } = validationResult.data;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    generateToken(res, user._id);
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};
