// models/Doctor.js
import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isOnline: { type: Boolean, default: false },
  specialization: { type: String, default: "General" },
});

export default mongoose.model("Doctor", doctorSchema);
