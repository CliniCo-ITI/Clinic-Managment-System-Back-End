const User = require('../Model/User');
const Doctor = require('../Model/Doctor');

exports.getAllDoctors =  (req,res)=>{
    const Doctors =  Doctor.find({})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            console.log(err);
        })
}

exports.getDoctorById = (req,res)=>{
    
}


