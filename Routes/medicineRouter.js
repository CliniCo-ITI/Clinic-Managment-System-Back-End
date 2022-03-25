const express = require("express");
const { body } = require("express-validator");
const { param } = require("express/lib/request");

const controller = require("../Controllers/medicineController");

const router = express.Router();

/***************List Of Medicine***************/
router.get("/",controller.getMedicine);

/***************one Clinic***************/
router.get("/:id", controller.getMedicineById);

/***************Creat New Medicine*************/
router.post("/"
,
[
    // body("productionDate").isDate().withMessage("Please enter a valid production date"),
    // body("expirationDate").isDate().withMessage("Please enter a valid expiration date"),
    body("price").isInt().withMessage("The price should be currency"),
    body("description").isAlpha().withMessage("please enter a valid description")
]
,controller.createMedicine);


/***************Update Medicine****************/
router.put("/",[
    body("productionDate").isDate().withMessage("Please enter a valid production date"),
    body("expirationDate").isDate().withMessage("Please enter a valid expiration date"),
    body("price").isCurrency().withMessage("The price should be currency"),
    body("description").isAlpha().withMessage("please enter a valid description")
],controller.updateMedicine);


/***************Delete Medicine***************/
router.delete("/:description",controller.deleteMedicine);


module.exports=router;

