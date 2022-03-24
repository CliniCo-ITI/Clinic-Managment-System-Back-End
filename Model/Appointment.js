const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  time: { type: Date, required: true },
  avaliable: { type: Boolean, default: true },
  seen: { type: Boolean, default: false },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "doctors" },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "patients" },
  clinic: { type: mongoose.Schema.Types.ObjectId, ref: "clinics" },
});

module.exports = mongoose.model("appointments", appointmentSchema);
