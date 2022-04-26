const invoiceController = require("../Controllers/invoiceController");
const express = require("express");
const { body, param, query } = require("express-validator");
const router = express.Router();

// All Invoices
router.get("/", invoiceController.getAllInvoices);

/***************one Invoice***************/
//router.get("/:id", invoiceController.getInvoiceById);

//New Invoice
router.post(
  "/",
  [
    body("paymentMethod").isString().withMessage("paymentMethod is required"),
    body("totalAmount")
      .isNumeric()
      .withMessage("total amount must be numberic"),
    body("totalPaid").isNumeric().withMessage("total paid must be numeric"),
  ],
  invoiceController.addInvoice
);

// Edit an Invoice
router.put(
  "/",
  [
    body("paymentMethod").isString().withMessage("paymentMethod is required"),
    body("totalAmount")
      .isNumeric()
      .withMessage("total amount must be numberic"),
    body("totalPaid").isNumeric().withMessage("total paid must be numeric"),
  ],
  invoiceController.updateInvoice
);

router
  .route("/:id")
  // Delete Invoice with param
  .delete(invoiceController.deleteInvoice)

  // Get Specific Invoice with param
  .get(invoiceController.getInvoice);


  

module.exports = router;
