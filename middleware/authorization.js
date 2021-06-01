const checkIfLogged = async (req, res, next) => {
    res.locals.isLogged = req.cookies.authentication;
    res.locals.isAdmin = req.cookies.adminRole;
    next();
};


module.exports = {
    checkIfLogged
};