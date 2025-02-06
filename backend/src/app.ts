import express from "express";
import cors from "cors";
import sequelize from "./config/database.js";
import taskRoutes from "./routes/task.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);

// Error handling
app.use(errorHandler);

// Initialize database and start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
