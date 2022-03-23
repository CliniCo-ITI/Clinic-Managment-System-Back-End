

const { response } = require("express");
const { validationResult, body } = require("express-validator");
const  receptionist = require("../Model/Receptionist");



/***************List Of Receptionist***************/

exports.getReceptionist = function (req, res, next) {
    receptionist.find({})

        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => next(error));
}


/***************Creat New Receptionist*************/

exports.createReceptionist = function (req, res, next) {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " , ", "");
        next(error);
    }
    else {
        
        let receptionistObject = new receptionist({
            salary: req.body.salary,
            
            clinic: req.body.clinic
        })

        receptionistObject.save()
            .then(result => {
                res.status(201).json({ message: "added" })
            }).catch(error => { next(error) });
    }
}

/***************Update Receptionist****************/

exports.updateReceptionist = function (req, res, next) {
    receptionist.updateOne({ salary: req.body.salary },
        {
            $set: {
                salary: req.body.salary,
                
                clinic: req.body.clinic
            }
        }).then(result => {
            res.status(201).json({ message: "updated" });
        }).catch(error => {
            error.status = 500;
            next(error);
        })
}


/***************Delete Receptionist***************/

exports.deleteReceptionist = async (req, res, next) => {


    const obj = await receptionist.findOne({ salary: req.params.salary }).exec()
    if (obj) {

        await receptionist.deleteOne({ salary: req.params.salary })

        res.status(201).json({ message: "deleted" });
    }
    else {

        return res.status(422).json({ message: "Not Found" })

    }
}


