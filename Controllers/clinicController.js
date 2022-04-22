

const { validationResult } = require("express-validator");
const { param } = require("express/lib/request");
const clinic = require("../Model/Clinic");

/***************List Of Clinic***************/

exports.getClinic = function (req, res, next) {
    clinic.find({}).populate({path:'medicines'})

        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => next(error));
}

/***************Clinic By ID***************/

exports.getClinicById = async (req, res, next)=>{

    const {id} = req.params;
    console.log(id);
    try{
        const clin = await clinic.findById(id);
        clin
        .populate({path:"medicines"})
        .then(data=>res.json(data))
    }catch(error){
        res.json({msg:error})
    }
    
}

/***************Creat New Clinic*************/

exports.createClinic = function (req, res, next) {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " , ", "");
        next(error);
    }
    else {

        let clinicObject = new clinic({
            governorate: req.body.governorate,
            address: req.body.address,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            medicines: req.body.medicines
        })

        clinicObject.save()
            .then(result => {
                res.status(201).json({ message: "added" })
            }).catch(error => { next(error) });
    }
}

/***************Update Clinic****************/

exports.updateClinic = async (req, res, next) => {

    const {id} = req.params;
    console.log(id);
    const {governorate,address,startTime,endTime,medicines} = req.body;
    try{
        const cli = await clinic.findByIdAndUpdate(id,{
            governorate,
            address,
            startTime,
            endTime,
            medicines
        },
        {
            new:true
        }
        );
            res.json({ cli });
        }catch(error){
            res.json({msg:"error"})
        }
    // clinic.updateOne({ address: req.body.address },
    //     {
    //         $set: {
    //             governorate: req.body.governorate,
    //             startTime: req.body.startTime,
    //             endTime: req.body.endTime,
    //             medicines: req.body.medicines
    //         }
    //     }).then(result => {
    //         res.status(201).json({ message: "updated" });
    //     }).catch(error => {
    //         error.status = 500;
    //         next(error);
    //     })
}


/***************Delete Clinic***************/

exports.deleteClinic = async (req, res, next) => {
    const {id} = req.params
    console.log(id);
    // try{
    //     await clinic.findByIdAndDelete(id);
    //     res.status(200).json({msg: "clinic Deleted Successfully"})
    // }
    // catch(error){
    //     res.json({msg:error})
    // }  

    const obj = await clinic.findOne(id).exec()
    if (obj) {

        await clinic.deleteOne(id)

        res.status(201).json({ message: "deleted" });
    }
    else {

        return res.status(422).json({ message: "Not Found" })

    }
}


