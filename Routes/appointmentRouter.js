const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const appointmentController = require("../Controllers/appointmentController");

// Get All Appointments
router.get("/", appointmentController.getAllAppointments);

// Gget Doctor Aappointments
router.get("/recep/:id", appointmentController.getClinicDoctorsAppointments);
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
module.exports = router;

router
  .route("/:id")
  // Get Specific Appointment
  .get(appointmentController.getAppointment)
  // Cancel an Appointment
  .delete(appointmentController.cancelAppointment);

module.exports = router;
