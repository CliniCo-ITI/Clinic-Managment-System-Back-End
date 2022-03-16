const mongoose = require("mongoose");

const doctorschema = new mongoose.Schema({
    vezeeta:{type:Number,required:true},  
    ppl:string,
    published:{type:Boolean,default:false},
    clinic: {type: mongoose.Schema.Types.ObjectId, ref: 'clinics'}
})
module.exports = mongoose.model('doctors',doctorschema);
