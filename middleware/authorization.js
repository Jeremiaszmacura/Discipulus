const checkIfLogged = async (req, res, next) => {
    res.locals.isLogged = req.cookies.authentication;
    if (typeof(req.cookies.adminRole) === 'string')
        if (req.cookies.adminRole === 'true')
            res.locals.isAdmin = req.cookies.adminRole;
    next();
};


module.exports = {
    checkIfLogged
};