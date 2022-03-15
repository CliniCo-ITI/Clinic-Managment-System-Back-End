const mongoose = require("mongoose");
const doctorschema = new mongoose.Schema({
    vezeeta:{type:Number,required:true},       //هناخدها
    specialization:{type:string,enum:[""]},
    ppl:string,
    published:{type:Boolean,default:false}
    dr_clinic:{type:}

})
module.exports = mongoose.model('doctors',doctorschema);
