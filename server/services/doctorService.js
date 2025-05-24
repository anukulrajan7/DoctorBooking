// services/doctorService.js
import User from "../models/user.js";
import Doctor from "../models/doctor.js";
import { sendEmailToPatients } from "../utils/emailService.js";

export const updateDoctorStatus = async (user, isOnline, io) => {
  if (user.role !== "Doctor") throw new Error("Only doctors can update status");

  const updated = await Doctor.findOneAndUpdate(
    { userId: user.id },
    { isOnline },
    { new: true },
  ).populate("userId");
  io.emit("doctor-status-update", { doctorId: user.id, isOnline });

  if (isOnline) {
    const patients = await User.find({ role: "Patient" });
    const emails = patients.map((p) => p.email);
    await sendEmailToPatients(updated.userId.name, emails);
  }

  return { success: true };
};

export const fetchOnlineDoctors = async () => {
  return Doctor.find({ isOnline: true }).populate("userId");
};
