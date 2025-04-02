import Task from "../models/task.model.js";

// Get all tasks for the authenticated user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve tasks",
      error: error.message,
    });
  }
};

// Get a specific task by ID
export const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    
    const task = await Task.findOne({ _id: taskId, user: req.user._id });
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Task retrieved successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve task",
      error: error.message,
    });
  }
};

// Update task status (mark as completed/uncompleted)
export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { completed } = req.body;
    
    if (completed === undefined) {
      return res.status(400).json({
        success: false,
        message: "Completed status is required",
      });
    }
    
    const task = await Task.findOne({ _id: taskId, user: req.user._id });
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    
    task.completed = completed;
    await task.save();
    
    res.status(200).json({
      success: true,
      message: `Task marked as ${completed ? 'completed' : 'incomplete'}`,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update task status",
      error: error.message,
    });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    
    const task = await Task.findOne({ _id: taskId, user: req.user._id });
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    
    await Task.deleteOne({ _id: taskId });
    
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete task",
      error: error.message,
    });
  }
};