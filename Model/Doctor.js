const mongoose = require("mongoose");

const doctorschema = new mongoose.Schema({
    vezeeta:{type:Number,required:true},  
    // ppl:{type:String, required:true},
    published:{type:Boolean,default:false},
    // clinic: {type: mongoose.Schema.Types.ObjectId, ref: 'clinics'}
    // specialization:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'clinics'
    // },
    specialization:{
        type: Number,
        ref: 'specializations'
    },
    clinic: {type:Number, ref: 'clinics'},
    userRef:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
})
module.exports = mongoose.model('doctors',doctorschema);
