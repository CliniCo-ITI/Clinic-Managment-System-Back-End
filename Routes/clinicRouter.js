
const express = require("express");
const {IsAdmin} = require('./../middleware/validation/isAdmin');
const {ValidateToken} = require('./../middleware/validation/validateToken');
const { body } = require("express-validator");

const controller = require("../Controllers/clinicController");

const router = express.Router();





/***************List Of Clinic***************/
router.get("/",ValidateToken,IsAdmin, controller.getClinic);



/***************one Clinic***************/
router.get("/:id",ValidateToken,IsAdmin, controller.getClinicById);


/***************Creat New Clinic*************/
router.post("/"
,
    [
        body("governorate").isAlpha().withMessage("Please enter your governorate correctly"),
        body("address").isAlpha().withMessage("Please enter your address correctly"),
        // body("startTime").isAlpha().withMessage("Please enter start time correctly"),
        // body("endTime").isAlpha().withMessage("Please end start time correctly")
        // body("startTime"),
        // body("endTime")
    ]
    ,ValidateToken,IsAdmin, controller.createClinic);


/***************Update Clinic****************/

router.put("/:id", [
    // body("governorate").isAlpha().withMessage("Please enter your governorate correctly"),
    // body("address").isAlpha().withMessage("Please enter your address correctly"),
    // body("startTime").isAlpha().withMessage("Please enter start time correctly"),
    // body("endTime").isAlpha().withMessage("Please end start time correctly")
],ValidateToken,IsAdmin, controller.updateClinic);


/***************Delete Clinic***************/

router.delete("/:id",ValidateToken,IsAdmin, controller.deleteClinic);


module.exports = router;

