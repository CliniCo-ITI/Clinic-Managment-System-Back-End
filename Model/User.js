const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  age: { type: Number, required: true },
  phone_number: { type: String, required: true},
  gender: { type: String, enum: ["M", "F"], default: "M" },
  user_type: {
    type: String,
    enum: ["admin", "doctor", "patient", "receptionist"],
  },
  user_id:{type:Number,
    unique:true,
    ref:function(){
        this.ref = this.user_type
    }
  }
});
module.exports = mongoose.model('users',userschema);
