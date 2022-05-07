const { validationResult } = require("express-validator");
const Appointment = require("../Model/Appointment");
const Receptionist = require("../Model/Receptionist");
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

// Get Patient Appointments
const getPatientAppointments = async (req, res, next) => {
  try {
    const PatientAppointments = await Appointment.find({
      patient: req.params.id,
    }).populate({ path: "doctor patient" });
    if (PatientAppointments != null) res.json(PatientAppointments);
  } catch (err) {
    err.status = 404;
    next(err);
  }
};

// Get Doctor Appointments
const getDoctorAppointments = async (req, res, next) => {
  try {
    const DoctorAppointments = await Appointment.find({
      doctor: req.params.id,
    }).populate({ path: "doctor patient" });
    if (DoctorAppointments != null) res.json(DoctorAppointments);
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

// Get not seen Appointments

const getUnSeenAppointments = async (req, res, next) => {
  try {
    const doctorAppointment = await Appointment.find({
      doctor: req.params.id,
      seen: false,
    }).populate({ path: "doctor patient" });
    if (doctorAppointment != null) res.status(200).json(doctorAppointment);
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

//Change to seen Appointment
const changeSeen = async (req, res, next) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const doctorAppointment = await Appointment.findById(req.params.id);
    if (doctorAppointment != null) {
      await Appointment.updateOne(
        { _id: req.params.id },
        {
          $set: {
            seen: true,
          },
        }
      );
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  }
};

// List appointments for all doctors in the same clinic
const getClinicDoctorsAppointments = async (req, res, next) => {
  try {
    
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      const clinicDoctorsAppointment = await Receptionist.findById(
        req.params.id
      );
      if (clinicDoctorsAppointment != null) {
        const clinicDoctorsAppointment = await Appointment.find({
          clinic: getClinicDoctorsAppointments.clinic,
        }).populate({ path: "doctor patient" });
        if (clinicDoctorsAppointment != null) {
          res.json(clinicDoctorsAppointment);
        }
      }
    }
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
  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = validationErrors
      .array()
      .reduce((current, object) => current + object.msg + " , ", "");
    next(error);
  } else {
    try {
      // Create new Invoice and add it to invoices table
      const newAppointment = await Appointment.create({
        time: req.body.time,
        avaliable: false,
        seen: false,
        doctor: req.body.doctor,
        patient: req.body.patient,
        clinic: req.body.clinic,
      });
      if (newAppointment) {
        res.status(201).json({ message: "added" });
      }
    } catch (err) {
      err.status = 500;
      next(err);
    }
  }
};

// Update Appointment
const updateAppointment = async (req, res, next) => {
  try {
    const appointmentUpdate = await Appointment.findByIdAndUpdate(
      req.params.id
    );
    if (appointmentUpdate != null) res.status(200).json({ message: "updated" });
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

// Cancel Appointment
const cancelAppointment = async (req, res, next) => {
  try {
    const getCAppointment = await Appointment.findOneAndDelete({
      _id: req.params.id,
    });
    if (getCAppointment != null) res.status(200).json({ message: "deleted" });
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

module.exports = {
  getAllAppointments,
  getAppointment,
  addAppointment,
  updateAppointment,
  cancelAppointment,
  getClinicDoctorsAppointments,
  getDoctorAppointments,
  getPatientAppointments,
  getUnSeenAppointments,
  changeSeen,
};
