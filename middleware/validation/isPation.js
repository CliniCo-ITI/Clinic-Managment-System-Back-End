const IsPatient = (req, res, next) => {
    const user = req.user;
    if (user.userType !== 'patient') {
        return res.status(403).json({msg: 'not allwed'})
    }

    next();
}

module.exports = {IsPatient}