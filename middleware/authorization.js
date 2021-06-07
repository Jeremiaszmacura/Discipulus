const User = require('../models/user');


const checkIfLogged = async (req, res, next) => {
    res.locals.isLogged = req.cookies.authentication;
    if (typeof(req.cookies.adminRole) === 'string')
        if (req.cookies.adminRole === 'true')
            res.locals.isAdmin = req.cookies.adminRole;
    next();
};


const isExamOwnerOrAdmin = async (req, res, next) => {
    const id = req.params.id; // take id of exam from URL
    // checks if user who wants to delete exam is owner of this exam
    await User.findOne( { _id: res.locals.user._id } ).then((result) => {
        if (result.ownedExams.includes(id) || result.admin === true) {
            res.locals.delPermission = true;
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ redirect: '500' });
    });
    next();
}


module.exports = {
    checkIfLogged,
    isExamOwnerOrAdmin
};