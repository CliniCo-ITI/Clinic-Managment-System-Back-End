const { validationResult } = require("express-validator");
const Appointment = require("../Model/Appointment");

// Get All Appointments
const getAllAppointments = async (req, res, next) => {
  try {
    const Appointments = await Appointment.find({}).populate({
      path: "doctor patient",
    });
    if (Appointments != null) res.status(200).json(Appointments);
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

// Get specific Appointment
const getAppointment = async (req, res, next) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const targetAppointment = await Appointment.findById(
      req.params.id
    ).populate({ path: "doctor patient" });
    if (targetAppointment == null)
      return res.status(204).json({ message: "No Appointments found" });
    res.json(targetAppointment);
  } else {
    res.status(204).json({ message: "No Appointments found" });
  }
};

// Add Appointment
const addAppointment = async (req, res, next) => {
    
};

// Update Appointment
const updateAppointment = async (req, res, next) => {};

// Cancel Appointment
const cancelAppointment = async (req, res, next) => {};

module.exports = {
  getAllAppointments,
  getAppointment,
  addAppointment,
  updateAppointment,
  cancelAppointment,
};
