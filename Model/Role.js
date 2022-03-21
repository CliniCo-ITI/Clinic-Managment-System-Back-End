const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctors"
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patients"
    },
    receptionist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "receptionists"
    }
});

module.exports = mongoose.model("roles",roleSchema)