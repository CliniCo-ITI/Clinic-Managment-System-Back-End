const mongoose = require("mongoose");
 
const specializationSchema = new mongoose.Schema({
    name: {type: String},
    doctors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctors"
    }]
});








module.exports = mongoose.model("specializations",specializationSchema)