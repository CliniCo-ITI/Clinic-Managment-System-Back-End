const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
    name:{type:String},
    productionDate: {type:Date,default:Date.now()},
    expirationDate: {type: Date,default:Date.now()},
    price: {type: Number},
    description: {type: String},
    clinics: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'clinics',
        }
    ]
    
});



module.exports = mongoose.model("medicines",medicineSchema);