const mongoose = require("mongoose");


const receptionistSchema = new mongoose.Schema({
    salary: {type: Number},
    clinic: {type: mongoose.Schema.Types.ObjectId, ref: 'clinics'}
});






module.exports = mongoose.model("receptionists",receptionistSchema);


