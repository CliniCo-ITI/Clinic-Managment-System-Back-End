const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, 
          required: true, 
          lowercase: true,
          unique: true },
  password: { type: String, required: true },
  image: { type: String,required:true},
  age: { type: Number, required: true },
  phoneNumber: { type: String, required: true},
  gender: { type: String, enum: ["M", "F"], default: "M" },
  userType: {
    type: String,
    required: true,
    default:"patient",
    enum: ["admin", "doctor", "patient" , "receptionist"],
  },
  // userId:{
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   refPath: "userType",
  // }
  userID: { 
    type:mongoose.Schema.Types.ObjectId, 
    ref:function(){
    this.ref = this.UserType;
}}

});
module.exports = mongoose.model('users',userschema);
