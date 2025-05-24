// doctor_availability_backend/server.js

import dotenv from "dotenv";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import cors from "cors";
import { Server as SocketIO } from "socket.io";
import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server, {
  cors: {
    origin: "*", // Allow all origins for now
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection Setup (explicit database name)
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: process.env.DB_NAME, // specify DB name here
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB connected: ${conn.connection.name}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

connectDB();

// Attach io instance to express app
app.set("io", io);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctor", doctorRoutes);

// Socket.io Real-time Connection
io.on("connection", (socket) => {
  console.log("🔌 New client connected");

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});

// Server Start
const PORT = process.env.PORT || 5002;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
