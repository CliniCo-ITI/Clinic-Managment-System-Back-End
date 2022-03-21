const IsReceptionist = (req, res, next) => {
    const user = req.user;
    if (user.userType !== 'receptionist') {
        return res.status(403).json({msg: 'not allwed'})
    }

    next();
}

module.exports = {IsReceptionist}