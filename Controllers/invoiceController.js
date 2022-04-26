const { validationResult } = require("express-validator");
const Invoice = require("../Model/Invoice");

// Get All the invoices
const getAllInvoices = async (req, res, next) => {
  const invoices = await Invoice.find({}).populate({path:"receptionist appointment"});
  if (!invoices) return res.status(204).json({ message: "No invoices found" });
  res.json(invoices);
};

/***************Invoice By ID***************/

exports.getInvoiceById = async (req, res, next)=>{

  const {id} = req.params;
  console.log(id);
  try{
      const inv = await Invoice.findById(id);
      inv
      
      .then(data=>res.json(data))
  }catch(error){
      res.json({msg:error})
  }
  
}

//Get individual invoice informations
const getInvoice = async (req, res, next) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const invoice = await Invoice.findById(req.params.id).populate({path:"receptionist appointment"});
    if (invoice == null)
      return res.status(204).json({ message: "No invoices found" });
    res.json(invoice);
  } else {
    res.status(204).json({ message: "No invoices found" });
  }
};

//Addition of a new invoice
const addInvoice = async (req, res, next) => {
  //Validate user Inputs

  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = validationErrors
      .array()
      .reduce((current, object) => current + object.msg + " , ", "");
    next(error);
  } else {
    // Create new Invoice and add it to invoices table
    const newInvoice = await Invoice.create({
      paymentMethod: req.body.paymentMethod,
      totalAmount: req.body.totalAmount,
      totalPaid: req.body.totalPaid,
      amountLeft: req.body?.amountLeft || "",
      receptionist: req.body.receptionistId,
      appointment: req.body.appointmentId,
    });
    if (newInvoice) {
      res.status(201).json({ message: "added" });
    } else {
        let error = new Error();
      error.status = 500;
      next(error);
    }
  }
};

//Update an invoice
const updateInvoice = async (req, res, next) => {
  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = validationErrors
      .array()
      .reduce((current, object) => current + object.msg + " , ", "");
    next(error);
  } else {
    try {
   
      if (req.body._id.match(/^[0-9a-fA-F]{24}$/)) {
        const updatedInvoice = await Invoice.findById(req.body._id);
       
        if(!updatedInvoice)
        {
            res.status(204).json({ message: "No invoices found" });
        }
        else
        {
            updatedInvoice.paymentMethod = req.body.paymentMethod;
            updatedInvoice.totalAmount = req.body.totalAmount;
            updatedInvoice.totalPaid = req.body.totalPaid;
            updatedInvoice.amountLeft = req.body?.amountLeft || "";
            updatedInvoice.receptionist = req.body.receptionistId;
            updatedInvoice.appointment = req.body.appointmentId;
            updatedInvoice.save();
            res.status(200).json({message:"Updated"});
        }

      }
    } catch (err) {
      
      err.status = 500;
      next(err);
    }
  }
};

//Delete specific Invoice from list
const deleteInvoice = async (req, res, nex) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) return res.status(404).json({ message: "No invoices found" });
    res.status(200).json({ message: "deleted" });
  } else {
    res.status(404).json({ message: "No invoices found" });
  }
};

// Export module functions
module.exports = {
  getAllInvoices,
  getInvoice,
  deleteInvoice,
  updateInvoice,
  addInvoice,
};
