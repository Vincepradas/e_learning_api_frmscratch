import express from "express";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import courseRoutes from "./routes/course.route";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users/", userRoutes);
app.use("/api/auth/", authRoutes);
app.use("/api/course/", courseRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// Error handling
app.use(errorHandler);

export default app;