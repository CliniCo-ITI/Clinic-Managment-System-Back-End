const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
    governorate: {type: String, required:true},
    address: {type: String, required:true},
    startTime: {type: String, required:true},
    endTime: {type: String, required:true},
    medicines: [
        {
            // type: mongoose.Schema.Types.ObjectId,
            type: mongoose.Schema.Types.ObjectId,
            ref:'medicines',
        }
    ]
});



module.exports = mongoose.model("clinics",clinicSchema);