const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
    doctor: {type: mongoose.Schema.Types.ObjectId,ref:"doctors"},
    patient: {type: mongoose.Schema.Types.ObjectId,ref:"patients"},
    description: [{
        type: String,
        required: true
    }],
    medicines: 
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"medicines"
    }],
    appointment: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "appointments"
    }
});


module.exports = mongoose.model("prescriptions",prescriptionSchema);