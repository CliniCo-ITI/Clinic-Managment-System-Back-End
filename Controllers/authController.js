const jwt               = require("jsonwebtoken");
const bcrypt            = require("bcrypt");
const User              = require("../Model/User");
const Doctor            = require("../Model/Doctor");
const Patient           = require("../Model/Patient");
const upload            = require("../middleware/uploadImage");



module.exports.signUp = (req,res)=>{
    const newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,8),
        image: req.file.filename,
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
            }).catch(err =>{
                console.log(err);
            })
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
            message: "User Not found."
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
            message: "Invalid Password!"
        });
    }
    //signing token with user id
    var token = jwt.sign({
        id: user._id
    }, process.env.API_SECRET, {
        expiresIn: 86400
    });

    //responding to client request with user profile success message and  access token .
    res.status(200)
        .send({
        user: {
            id: user._id,
            email: user.email,
            fname: user.fname,
        },
        message: "Login successfully",
        accessToken: token,
        });
    });
};