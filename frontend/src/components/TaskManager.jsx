import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import Button from "./Button";
import toast from "react-hot-toast";
import { authStore } from "../store/authStore";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [taskLoading, setTaskLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const { authUser: user } = authStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/tasks", {
        params: { userId: user._id },
      });
      if (response.data.success) {
        setTasks(response.data.tasks);
      } else {
        setError(response.data.message || "Failed to fetch tasks");
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(err.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setTaskLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("/task", {
        title: title.trim(),
        description: description.trim(),
        userId: user._id,
      });

      if (response.data.success) {
        setTasks((prevTasks) => [response.data.task, ...prevTasks]);
        setTitle("");
        setDescription("");
        toast.success("Task created successfully!");
      } else {
        setError(response.data.message || "Failed to create task");
        toast.error(response.data.message || "Failed to create task");
      }
    } catch (err) {
      console.error("Error creating task:", err);
      setError(err.response?.data?.message || "Failed to create task");
      toast.error(err.response?.data?.message || "Failed to create task");
    } finally {
      setTaskLoading(false);
    }
  };

  const toggleTaskStatus = async (taskId, currentStatus) => {
    try {
      const response = await axiosInstance.patch(`/tasks/${taskId}/status`, {
        completed: !currentStatus,
      });

      if (response.data.success) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, completed: !currentStatus } : task
          )
        );
        toast.success(
          `Task marked as ${!currentStatus ? "completed" : "incomplete"}`
        );
      } else {
        toast.error(response.data.message || "Failed to update task status");
      }
    } catch (err) {
      console.error("Error updating task status:", err);
      toast.error(
        err.response?.data?.message || "Failed to update task status"
      );
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await axiosInstance.delete(`/tasks/${taskId}`);

      if (response.data.success) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        toast.success("Task deleted successfully");
      } else {
        toast.error(response.data.message || "Failed to delete task");
      }
    } catch (err) {
      console.error("Error deleting task:", err);
      toast.error(err.response?.data?.message || "Failed to delete task");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="flex items-center p-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-emerald-100">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h2 className="font-bold text-lg bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Task Manager
            </h2>
            <p className="text-xs text-emerald-700">
              {user ? `${user.name}'s Tasks` : 'Organize your day'}
            </p>
          </div>
        </div>
        <div className="ml-auto px-3 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">
          {tasks.length} Tasks
        </div>
      </div>

      <div className="p-4 border-b border-gray-100">
        <form onSubmit={createTask} className="space-y-3">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Task Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl 
                       focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 
                       transition-all duration-300"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Task Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows="2"
              className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl 
                       focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 
                       transition-all duration-300 resize-none"
              required
            />
          </div>
          <Button
            onClick={createTask}
            disabled={taskLoading || !title.trim() || !description.trim()}
            loading={taskLoading}
            className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-600 
                     text-white rounded-xl font-medium shadow-md
                     hover:from-emerald-600 hover:to-teal-700 
                     focus:ring-4 focus:ring-emerald-200 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transform transition-all duration-300"
          >
            Add Task
          </Button>
        </form>
      </div>

      <div className="p-4">
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-gray-500">No tasks yet. Add your first task!</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {tasks.map((task) => (
              <div
                key={task._id}
                className={`p-3 border ${
                  task.completed
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-gray-200 bg-white"
                } rounded-xl hover:shadow-md transition-all duration-300`}
              >
                <div className="flex items-start">
                  <button
                    onClick={() => toggleTaskStatus(task._id, task.completed)}
                    className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 ${
                      task.completed
                        ? "bg-emerald-500 border-emerald-500"
                        : "border-gray-300"
                    } flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-200`}
                  >
                    {task.completed && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    )}
                  </button>
                  <div className="ml-3 flex-1">
                    <h3
                      className={`text-sm font-medium ${
                        task.completed
                          ? "text-emerald-800 line-through"
                          : "text-gray-800"
                      }`}
                    >
                      {task.title}
                    </h3>
                    <p
                      className={`mt-1 text-xs ${
                        task.completed
                          ? "text-emerald-600 line-through"
                          : "text-gray-600"
                      }`}
                    >
                      {task.description}
                    </p>
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <span>
                        {new Date(task.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="mx-1">•</span>
                      <span>
                        {task.completed ? "Completed" : "In Progress"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="ml-2 p-1 text-gray-400 hover:text-red-500 focus:outline-none"
                    aria-label="Delete task"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
