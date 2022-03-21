const IsDoctor = (req, res, next) => {
    const user = req.user;
    if (user.userType !== 'doctor') {
        return res.status(403).json({msg: 'not allwed'})
    }

    next();
}

module.exports = {IsDoctor}