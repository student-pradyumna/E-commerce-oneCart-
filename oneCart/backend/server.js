import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoute from "./routes/productRoute.js";
 import cartRoutes from "./routes/cartRoutes.js";
  import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const port = process.env.PORT || 6000;
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoute);
 app.use("/api/cart", cartRoutes);
  app.use("/api/order", orderRoutes);

// ✅ Connect DB first, then start server
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });
