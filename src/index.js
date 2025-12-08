import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routes } from "./routes/index.routes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api', routes)
// Default route
app.get("/", (req, res) => {
  res.send("API Berjalan 🚀 Silakan tes /auth/login");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
