const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    hasInsurance : {type: Boolean},
    insuranceNumber: {type: String, required: false}
})








module.exports = mongoose.model("patients",patientSchema);