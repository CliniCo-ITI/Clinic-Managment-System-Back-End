

const { response } = require("express");
const { validationResult, body } = require("express-validator");
const prescription = require("../Model/Prescription");



/***************List Of Prescription***************/

exports.getPrescription = function (req, res, next) {
    prescription.find({}).populate({path:"medicines appointment"})

        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => next(error));
}


/***************Creat New Medicine*************/

exports.createPrescription = function (req, res, next) {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " , ", "");
        next(error);
    }
    else {

        let prescriptionObject = new prescription({
            doctor: req.body.doctor,
            patient: req.body.patient,
            description: req.body.description,
            medicines: req.body.medicines,
            appointment: req.body.appointment
        })

        prescriptionObject.save()
            .then(result => {
                res.status(201).json({ message: "added" })
            }).catch(error => { next(error) });
    }
}

/***************Update Medicine****************/

exports.updatePrescription = function (req, res, next) {
    medicine.updateOne({ description: req.body.description },
        {
            $set: {
                doctor: req.body.doctor,
                patient: req.body.patient,
                medicines: req.body.medicines,
                appointment: req.body.appointment
            }
        }).then(result => {
            res.status(201).json({ message: "updated" });
        }).catch(error => {
            error.status = 500;
            next(error);
        })
}


/***************Delete Medicine***************/

exports.deletePrescription = async (req, res, next) => {


    const obj = await prescription.findOne({ description: req.params.description }).exec()
    if (obj) {

        await prescription.deleteOne({ description: req.params.description })

        res.status(201).json({ message: "deleted" });
    }
    else {

        return res.status(422).json({ message: "Not Found" })

    }
}


