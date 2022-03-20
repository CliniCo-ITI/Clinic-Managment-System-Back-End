const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Model/User");
const Doctor = require("../Model/Doctor");
const Patient = require("../Model/Patient");
const {jwt_secret} = require('./../config/secrets')
const {userDto} = require('./../dto/user.dto')

module.exports.signUp = (req,res)=>{
    const newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,8),
        image: req.body.image,
        age: req.body.age,
        phoneNumber: req.body.phoneNumber,
        gender: req.body.gender,
        userType: req.body.userType,
    });
    if(req.body.userType === "patient"){
        const newPatient = new Patient({
            hasInsurance: req.body.hasInsurance,
            insuranceNumber: req.body.insuranceNumber
        }).save()
            .then( object =>{
                newUser.save()
                .then()
                .catch(err=>{
                    console.log(err);
                })
                res.status(201).json({message: "patient added"});
            })
    }else if(req.body.userType === "admin"){
                newUser.save()
                .then()
                .catch(err=>{
                    console.log(err);
                })
                res.status(201).json({message: "admin added"});
            
    }//TO_DO add other types of USERS other than patient and who can register or will be added 

}


exports.signin = (req, res) => {
User.findOne({
    email: req.body.email
    })
    .exec((err, user) => {
    if (err) {
        res.status(500)
        .send({
            message: err
        });
        return;
    }
    if (!user) {
        return res.status(404)
        .send({
            message: "Invalid Email or password."
        });
    }

    //comparing passwords
    let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );
    // checking if password was valid and send response accordingly
    if (!passwordIsValid) {
        return res.status(401)
        .send({
            accessToken: null,
            message: "Invalid Email or Password!"
        });
    }
    //signing token with user id
    const userData = userDto(user)
    const token = jwt.sign(userData,jwt_secret)

    //responding to client request with user profile success message and  access token .
    res.status(200)
        .send({
        user: userDto(user),
        message: "Login successfully",
        accessToken: token,
        });
    });
};