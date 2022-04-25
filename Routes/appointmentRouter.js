const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const appointmentController = require("../Controllers/appointmentController");

// Get All Appointments
router.get("/", appointmentController.getAllAppointments);

// Add new Appointment
router.post(
  "/",
  [
    body("time")
      .isEmpty()
      .withMessage("You have to set a time")
      .isDate()
      .withMessage("Time has to be of type Date"),
  ],
  appointmentController.addAppointment
);

// Update recent Appointment
router.put(
  "/",
  [
    body("time")
      .isEmpty()
      .withMessage("You have to set a time")
      .isDate()
      .withMessage("Time has to be of type Date"),
  ],
  appointmentController.updateAppointment
);

router
  .route("/:id")
  // Get Specific Appointment
  .get(appointmentController.getAppointment)
  // Cancel an Appointment
  .delete(appointmentController.cancelAppointment);


  router.get('/doctor/appointments',appointmentController.getDoctorAppointments);
  
module.exports = router;
