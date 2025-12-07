import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import loginRoute from "./src/routes/login.js";
import profileRoute from "./src/routes/protectedRoute.js";
import logoutRoute from "./src/routes/logout.js";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", loginRoute);
app.use("/auth", logoutRoute);
app.use("/user", profileRoute);

// Default route
app.get("/", (req, res) => {
  res.send("API Berjalan 🚀 Silakan tes /auth/login");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
