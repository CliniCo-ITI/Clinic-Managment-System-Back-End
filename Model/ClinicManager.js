const mongoose = require("mongoose");

const clinicManagerSchema = new mongoose.Schema({
    salary: Number,
    clinic: {type: mongoose.Schema.Types.ObjectId, ref: 'clinics'}
})


module.exports = mongoose.model("clinic_managers",clinicManagerSchema);