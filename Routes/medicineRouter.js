const express = require("express");
const { body } = require("express-validator");
const {IsAdmin} = require('./../middleware/validation/isAdmin');
const {ValidateToken} = require('./../middleware/validation/validateToken');
const { param } = require("express/lib/request");

const controller = require("../Controllers/medicineController");

const router = express.Router();

/***************List Of Medicine***************/
router.get("/",ValidateToken,IsAdmin,controller.getMedicine);

/***************one Clinic***************/
router.get("/:id",ValidateToken,IsAdmin,controller.getMedicineById);

/***************Creat New Medicine*************/
router.post("/"
,
[
    // body("productionDate").isDate().withMessage("Please enter a valid production date"),
    // body("expirationDate").isDate().withMessage("Please enter a valid expiration date"),
    body("price").isInt().withMessage("The price should be currency"),
    body("description").isAlpha().withMessage("please enter a valid description")
]
,ValidateToken,IsAdmin,controller.createMedicine);


/***************Update Medicine****************/
router.put("/:id",[
    // body("productionDate").isDate().withMessage("Please enter a valid production date"),
    // body("expirationDate").isDate().withMessage("Please enter a valid expiration date"),
    // body("price").isCurrency().withMessage("The price should be currency"),
    // body("description").isAlpha().withMessage("please enter a valid description")
],ValidateToken,IsAdmin,controller.updateMedicine);


/***************Delete Medicine***************/
router.delete("/:id",ValidateToken,IsAdmin,controller.deleteMedicine);


module.exports=router;

