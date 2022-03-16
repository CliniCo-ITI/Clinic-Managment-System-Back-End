const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  image: { type: String, required: true },
  age: { type: Number, required: true },
  phoneNumber: { type: String, required: true},
  gender: { type: String, enum: ["M", "F"], default: "M" },
  userType: {
    type: String,
    enum: ["admin", "doctor", "patient" , "receptionist" , "clinic-manager"],
  },
  userId:{type:Number,
    unique:true,
    ref:function(){
        this.ref = this.userType
    }
  }
});
module.exports = mongoose.model('users',userschema);
