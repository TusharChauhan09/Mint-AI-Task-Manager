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

import { verifyToken } from "./lib/auth.lib.js";

import { check } from "./router/check.route.js";

const app = express();

dotenv.config();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: [ "http://localhost:5174","http://localhost:5173"],
    credentials: true,
  })
);

app.post("/signup", signup);

app.post("/login", login);

app.get("/check", verifyToken , check);

// Protected routes
app.use(verifyToken);

app.post("/logout", logout);

app.post("/createTask", createTask);

app.post("/chatGen", chatGen);

app.post("/imageGen", imageGen);

// app.use("/history", history);

// app.use("/data", data);

app.listen(process.env.PORT, () => {
  console.log("server is running on PORT: " + process.env.PORT);
  connectDB();
});
