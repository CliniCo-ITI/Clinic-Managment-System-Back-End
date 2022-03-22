const express = require("express");
const { body } = require("express-validator");
const { param } = require("express/lib/request");

const controller = require("../Controllers/receptionist");

const router = express.Router();

/***************List Of receptionist***************/
router.get("/",controller.getReceptionist);



/***************Creat New Receptionist*************/
router.post("/"
,
[
    body("salary").isInt().withMessage("Please enter a valid salary") 
]
,controller.createReceptionist);


/***************Update Receptionist****************/
router.put("/",[
    body("salary").isInt().withMessage("Please enter a valid salary") 
   
],controller.updateReceptionist);


/***************Delete Receptionist***************/
router.delete("/:salary",controller.deleteReceptionist);


module.exports=router;

