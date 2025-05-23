import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Updated cookie config for production
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Secure in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // Important for cross-site cookies
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // Don't set domain in production, Vercel will handle it
  });
};

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: error.message,
    });
  }
};
