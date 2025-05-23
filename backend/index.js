import express, { response } from "express";
import { connectDB } from "./db/db.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

import { chatGen } from "./router/chatGen.route.js";

import { imageGen } from "./router/imageGen.route.js";

import { signup } from "./router/signup.route.js";

import { login } from "./router/login.route.js";

import { logout } from "./router/logout.route.js";

import { createTask } from "./router/task.route.js";

import {
  getTasks,
  getTaskById,
  updateTaskStatus,
  deleteTask,
} from "./router/gettask.route.js";

import { verifyToken } from "./lib/auth.lib.js";

import { check } from "./router/check.route.js";

const app = express();

dotenv.config();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);

app.post("/signup", signup);

app.post("/login", login);

app.get("/check", verifyToken, check);

// Protected routes
app.use(verifyToken);

app.post("/logout", logout);

app.post("/task", createTask);

// Task management routes
app.get("/tasks", getTasks);
app.get("/tasks/:taskId", getTaskById);
app.patch("/tasks/:taskId/status", updateTaskStatus);
app.delete("/tasks/:taskId", deleteTask);

app.post("/chatGen", chatGen);

app.post("/imageGen", imageGen);

// app.use("/history", history);

// app.use("/data", data);

app.listen(process.env.PORT, () => {
  console.log("server is running on PORT: " + process.env.PORT);
  connectDB();
});
