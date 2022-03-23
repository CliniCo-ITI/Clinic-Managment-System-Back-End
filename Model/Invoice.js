const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    paymentMethod: 
                {
                    type:String, 
                    enum:["Cash","CreditCard","InsuranceCard"],
                    default: "Cash",
                    required:true
                },
    totalAmount: {
                    type: Number,
                    required: true
                    },
    totalPaid: {
        type: Number,
        required: true
    },
    amountLeft: {
        type: Number,
    },
    receptionist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "receptionists"
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "appointments"
    }
});


module.exports = mongoose.model("invoices",invoiceSchema)