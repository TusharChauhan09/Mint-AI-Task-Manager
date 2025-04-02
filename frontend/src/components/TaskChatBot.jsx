import React, { useState, useRef, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import ReactMarkdown from "react-markdown";
import Button from "./Button";
import { authStore } from "../store/authStore";

const TaskChatBot = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi there! I'm Mint AI, your task management assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const messagesEndRef = useRef(null);
  const { authUser: user } = authStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get("/tasks");
      if (response.data.success) {
        setTasks(response.data.tasks);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const handleTaskQuery = (query) => {
    query = query.toLowerCase();

    fetchTasks();

    if (query.includes("today") && (query.includes("task") || query.includes("tasks"))) {
      return formatTodaysTasks();
    } else if (query.includes("all") && (query.includes("task") || query.includes("tasks"))) {
      return formatAllTasks();
    } else if ((query.includes("completed") || query.includes("finished")) && (query.includes("task") || query.includes("tasks"))) {
      return formatCompletedTasks();
    } else if ((query.includes("pending") || query.includes("incomplete") || query.includes("unfinished")) && (query.includes("task") || query.includes("tasks"))) {
      return formatPendingTasks();
    } else if (query.includes("how many") && (query.includes("task") || query.includes("tasks"))) {
      return formatTaskCount();
    }

    return null;
  };

  const formatTodaysTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysTasks = tasks.filter(task => {
      const taskDate = new Date(task.createdAt);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === today.getTime();
    });

    if (todaysTasks.length === 0) {
      return "You don't have any tasks scheduled for today.";
    }

    let response = `Here are your tasks for today${user ? `, ${user.name}` : ''}:\n\n`;
    todaysTasks.forEach((task, index) => {
      response += `${index + 1}. **${task.title}** - ${task.completed ? '✅ Completed' : '⏳ Pending'}\n   ${task.description}\n\n`;
    });

    return response;
  };

  const formatAllTasks = () => {
    if (tasks.length === 0) {
      return "You don't have any tasks yet.";
    }

    let response = `Here are all your tasks${user ? `, ${user.name}` : ''}:\n\n`;
    tasks.forEach((task, index) => {
      response += `${index + 1}. **${task.title}** - ${task.completed ? '✅ Completed' : '⏳ Pending'}\n   ${task.description}\n\n`;
    });

    return response;
  };

  const formatCompletedTasks = () => {
    const completedTasks = tasks.filter(task => task.completed);

    if (completedTasks.length === 0) {
      return "You haven't completed any tasks yet.";
    }

    let response = `Here are your completed tasks${user ? `, ${user.name}` : ''}:\n\n`;
    completedTasks.forEach((task, index) => {
      response += `${index + 1}. **${task.title}**\n   ${task.description}\n\n`;
    });

    return response;
  };

  const formatPendingTasks = () => {
    const pendingTasks = tasks.filter(task => !task.completed);

    if (pendingTasks.length === 0) {
      return "You don't have any pending tasks. Great job!";
    }

    let response = `Here are your pending tasks${user ? `, ${user.name}` : ''}:\n\n`;
    pendingTasks.forEach((task, index) => {
      response += `${index + 1}. **${task.title}**\n   ${task.description}\n\n`;
    });

    return response;
  };

  const formatTaskCount = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    return `You have a total of ${totalTasks} tasks. ${completedTasks} completed and ${pendingTasks} pending.`;
  };

  const markTaskAsCompleted = async (taskTitle) => {
    try {
      const task = tasks.find(t => t.title.toLowerCase() === taskTitle.toLowerCase());

      if (!task) {
        return `I couldn't find a task with the title "${taskTitle}".`;
      }

      const response = await axiosInstance.patch(`/tasks/${task._id}/status`, {
        completed: true
      });

      if (response.data.success) {
        await fetchTasks();
        return `Task "${taskTitle}" has been marked as completed!`;
      } else {
        return "Sorry, I couldn't update the task status.";
      }
    } catch (err) {
      console.error("Error marking task as completed:", err);
      return "Sorry, there was an error updating the task.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);

    setLoading(true);
    setError(null);

    try {
      const markAsCompletedMatch = userMessage.match(/mark\s+(?:task\s+)?["'](.+?)["']\s+(?:as\s+)?completed/i);
      if (markAsCompletedMatch) {
        const taskTitle = markAsCompletedMatch[1];
        const result = await markTaskAsCompleted(taskTitle);

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: result },
        ]);
        setLoading(false);
        return;
      }

      const taskQueryResponse = handleTaskQuery(userMessage);
      if (taskQueryResponse) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: taskQueryResponse },
        ]);
        setLoading(false);
        return;
      }

      const taskIntent = userMessage.toLowerCase().includes("add task") || 
                          userMessage.toLowerCase().includes("create task") ||
                          userMessage.toLowerCase().includes("new task");

      if (taskIntent && userMessage.includes("title:")) {
        const titleMatch = userMessage.match(/title:\s*([^,\n]+)/i);
        const descriptionMatch = userMessage.match(/description:\s*([^,\n]+)/i);

        if (titleMatch && descriptionMatch) {
          const title = titleMatch[1].trim();
          const description = descriptionMatch[1].trim();

          const taskRes = await axiosInstance.post("/task", {
            title,
            description,
            userId: user?._id
          });

          if (taskRes.data.success) {
            await fetchTasks();

            setMessages((prev) => [
              ...prev,
              { 
                role: "assistant", 
                content: `✅ Task created successfully!\n\n**Title:** ${title}\n**Description:** ${description}` 
              },
            ]);
          } else {
            throw new Error(taskRes.data.message || "Failed to create task");
          }
        } else {
          setMessages((prev) => [
            ...prev,
            { 
              role: "assistant", 
              content: "To create a task, please provide both title and description. For example: 'Add task with title: Complete project, description: Finish the project by Friday'" 
            },
          ]);
        }
      } else {
        const chatRes = await axiosInstance.post("/chatGen", {
          question: userMessage,
        });

        if (chatRes.data.success) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: chatRes.data.message },
          ]);
        } else {
          throw new Error(chatRes.data.error || "Failed to generate response");
        }
      }
    } catch (err) {
      console.error("Error in chat:", err);
      setError(err.response?.data?.message || err.message || "Something went wrong. Please try again.");
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          content: "Sorry, I encountered an error. Please try again." 
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-3xl mx-auto overflow-hidden">
      <div className="flex items-center p-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-emerald-100">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div className="ml-3">
            <h2 className="font-bold text-lg bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Mint AI Assistant
            </h2>
            <p className="text-xs text-emerald-700">
              {user ? `${user.name}'s task management companion` : 'Your task management companion'}
            </p>
          </div>
        </div>
        <div className="ml-auto px-3 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">
          Online
        </div>
      </div>

      <div className="p-4 h-96 overflow-y-auto bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === "user" ? "flex justify-end" : "flex justify-start"
            }`}
          >
            <div
              className={`max-w-3/4 rounded-2xl p-4 ${
                message.role === "user"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                  : "bg-white border border-emerald-100 shadow-sm"
              }`}
            >
              <div className="prose prose-sm max-w-none">
                {message.role === "user" ? (
                  <p>{message.content}</p>
                ) : (
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                )}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="px-4 py-2 bg-red-50 border-t border-red-100 text-red-600 text-sm">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              />
            </svg>
            {error}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100">
        <div className="flex items-center">
          <div className="relative flex-grow">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about tasks or 'Add task with title: ... description: ...'"
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl 
                       focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 
                       transition-all duration-300 pl-12"
              disabled={loading}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
          </div>
          <Button
            type="submit"
            disabled={!input.trim() || loading}
            loading={loading}
            className="ml-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 
                     text-white rounded-xl font-medium shadow-md
                     hover:from-emerald-600 hover:to-teal-700 
                     focus:ring-4 focus:ring-emerald-200 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transform transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskChatBot;
