const User = require('../Model/User');
const Doctor = require('../Model/Doctor');
const upload = require("../middleware/uploadImage");
const bcrypt = require("bcrypt");

exports.getAllDoctors = async (req,res)=>{
    await Doctor.find()
    .populate({path:"userRef clinic"})
    .then(doctors=>res.json(doctors))
    .catch(error=>res.json({msg:error}));
}

exports.getDoctorById = async (req,res,next)=>{
    const {id} = req.params;
    console.log(id);
    try{
        const doctor = await Doctor.findById(id);
        doctor
        .populate({path:"userRef"})
        .then(data=>res.json(data))
    }catch(error){
        res.json({msg:error})
    }
}
exports.addDotor = async (req,res)=>{
    const {email} = req.body;
    const userExcist = await User.findOne({email});
    if(userExcist){
        return res.status(400).json({msg:'user already exist'});
    }
    const {fname,lname,password,age,phoneNumber,gender,userType,vezeeta,clinic,specialization} = req.body;
   
    const user = new User({
        fname,
        lname,
        email,
        password:bcrypt.hashSync(password, 10),
        image: req.files.image[0].path,
        age,
        phoneNumber,
        gender,
        userType
    });
    console.log(user);
    if(req.body.userType === "doctor"){
        const newDoctor = new Doctor({
            vezeeta,
            ppl:req.files.ppl[0].path,
            clinic,
            userRef:user._id,
            specialization
        }).save()
            .then( object =>{
                user.save()
                .then()
                .catch(err=>{
                    console.log(err);
                })
                console.log(newDoctor);
                res.status(201).json({message: "doctor added"});
            })
     }
  
}


exports.deleteDoctor = async (req,res) => {
    try{
        const doctor = await Doctor.findById(req.params.id);
        const user = await User.findById(doctor.userRef);
        await Doctor.findByIdAndDelete(req.params.id);
        const user1 = await User.findByIdAndDelete(user._id);
        res.json({msg:"deleted"})
    }
    catch(error){
        res.json({msg:error})
    }   
}

exports.updateDoctor = async(req,res)=>{
    const {id} = req.params;
    console.log(id);
    const {vezeeta,clinic,specialization} = req.body;
    try{
        const doctor = await Doctor.findByIdAndUpdate(id,{
            vezeeta,
            // ppl: req.files.ppl[0].filename,
            clinic,
            specialization
        },
        {
            new:true
        }
        );
        res.json({ doctor });
    }catch(error){
        res.json({msg:"error"})
    }
}