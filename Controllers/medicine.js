const { response } = require("express");
const { validationResult, body } = require("express-validator");
const medicine = require("../Model/Medicine");



/***************List Of Medicine***************/

exports.getMedicine = function (req, res, next) {
    medicine.find({})

        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => next(error));
}


/***************Creat New Medicine*************/

exports.createMedicine = function (req, res, next) {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " , ", "");
        next(error);
    }
    else {
        
        let medicineObject = new medicine({
            productionDate: req.body.productionDate,
            expirationDate: req.body.expirationDate,
            price: req.body.price,
            description: req.body.description,
            clinics: req.body.clinics
        })

        medicineObject.save()
            .then(result => {
                res.status(201).json({ message: "added" })
            }).catch(error => { next(error) });
    }
}

/***************Update Medicine****************/

exports.updateMedicine = function (req, res, next) {
    medicine.updateOne({ description: req.body.description },
        {
            $set: {
                productionDate: req.body.productionDate,
                expirationDate: req.body.expirationDate,
                price: req.body.price,
                clinics: req.body.clinics
            }
        }).then(result => {
            res.status(201).json({ message: "updated" });
        }).catch(error => {
            error.status = 500;
            next(error);
        })
}


/***************Delete Medicine***************/

exports.deleteMedicine = async (req, res, next) => {


    const obj = await medicine.findOne({ description: req.params.description }).exec()
    if (obj) {

        await medicine.deleteOne({ description: req.params.description })

        res.status(201).json({ message: "deleted" });
    }
    else {

        return res.status(422).json({ message: "Not Found" })

    }
}


