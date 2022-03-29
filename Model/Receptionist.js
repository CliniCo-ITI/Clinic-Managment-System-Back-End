const mongoose = require("mongoose");


const receptionistSchema = new mongoose.Schema({
    salary: {type: Number},
    clinic: {type: mongoose.Schema.Types.ObjectId, ref: 'clinics'},
    // clinic: {type: String, ref: 'clinics'},
    userRef:{
        type:mongoose.Schema.Types.ObjectId, 
        ref: 'users'
    }
});






module.exports = mongoose.model("receptionists",receptionistSchema);


