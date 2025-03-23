import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { z } from "zod";

export const signup = async (req, res) => {
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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.create({ email: email, password: passwordHash });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User creation failed",
      error: error.message,
    });
  }
};
