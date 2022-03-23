
const express = require("express");
const { body } = require("express-validator");

const controller = require("../Controllers/clinicController");

const router = express.Router();





/***************List Of Clinic***************/
router.get("/", controller.getClinic);



/***************Creat New Clinic*************/
router.post("/"
,
    [
        body("governorate").isAlpha().withMessage("Please enter your governorate correctly"),
        body("address").isAlpha().withMessage("Please enter your address correctly"),
        body("startTime").isAlpha().withMessage("Please enter start time correctly"),
        body("endTime").isAlpha().withMessage("Please end start time correctly")
    ]
    , controller.createClinic);


/***************Update Clinic****************/

router.put("/", [
    body("governorate").isAlpha().withMessage("Please enter your governorate correctly"),
    body("address").isAlpha().withMessage("Please enter your address correctly"),
    body("startTime").isAlpha().withMessage("Please enter start time correctly"),
    body("endTime").isAlpha().withMessage("Please end start time correctly")
], controller.updateClinic);


/***************Delete Clinic***************/

router.delete("/:address", controller.deleteClinic);


module.exports = router;

