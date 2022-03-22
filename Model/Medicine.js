const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
    productionDate: {type:Date},
    expirationDate: {type: Date},
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