<<<<<<< HEAD
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const testRoutes = require("./src/routes/testRoutes");
const authRoutes = require("./src/routes/authRoutes"); 

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api", testRoutes);
app.use("/api/auth", authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
=======
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // ❌ tambahkan ini
import loginRoute from "./src/routes/login.js";
import profileRoute from "./src/routes/protectedRoute.js"; // ❌ route profile
import logoutRoute from "./src/routes/logout.js";          // ❌ route logout

const app = express();

// Middleware global
app.use(cors({
  origin: "http://localhost:3000", // ganti sesuai frontend
  credentials: true                // agar cookie bisa dikirim
}));
app.use(express.json());
app.use(cookieParser()); // ❌ harus ada supaya bisa baca cookie

// ROUTES
app.use("/auth", loginRoute);    // /auth/login
app.use("/auth", logoutRoute);   // /auth/logout
app.use("/user", profileRoute);  // /user/profile (protected route)

// DEFAULT ROUTE
app.get("/", (req, res) => {
  res.send("API Berjalan 🚀 Silakan tes /auth/login");
});

// JALANKAN SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server berjalan di http://localhost:" + PORT));
>>>>>>> 82ea985483050a3fb08be0b165a476568a696c20
