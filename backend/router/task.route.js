import Task from "../models/task.model.js";
import { z } from "zod";

export const createTask = async (req, res) => {
  const requiredBody = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
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

    const { title, description } = validationResult.data;

    const task = await Task.create({
      title,
      description,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Task creation failed",
      error: error.message,
    });
  }
};
