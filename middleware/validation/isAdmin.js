const IsAdmin = (req, res, next) => {
    const user = req.user;
    if (user.userType !== 'admin') {
        return res.status(403).json({msg: 'not allwed'})
    }

    next();
}

module.exports = {IsAdmin}

