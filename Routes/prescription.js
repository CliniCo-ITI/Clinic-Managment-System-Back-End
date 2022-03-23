

const express = require("express");
const { body } = require("express-validator");
const { param } = require("express/lib/request");

const controller = require("../Controllers/prescription");

const router = express.Router();

/***************List Of Prescription***************/
router.get("/",controller.getPrescription);



/***************Creat New Prescription*************/
router.post("/"
,
[
    body("description").isAlpha().withMessage("please enter a valid description")
]
,controller.createPrescription);


/***************Update Prescription****************/
router.put("/",[
    body("description").isAlpha().withMessage("please enter a valid description")
],controller.updatePrescription);


/***************Delete Prescription***************/
router.delete("/:description",controller.deletePrescription);


module.exports=router;
