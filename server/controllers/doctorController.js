// controllers/doctorController.js
import * as doctorService from "../services/doctorService.js";

export const updateStatus = async (req, res, next) => {
  try {
    const result = await doctorService.updateDoctorStatus(
      req.user,
      req.body.isOnline,
      req.app.get("io"),
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getOnlineDoctors = async (req, res, next) => {
  try {
    const doctors = await doctorService.fetchOnlineDoctors();
    res.json(doctors);
  } catch (err) {
    next(err);
  }
};
