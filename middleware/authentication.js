const User = require('../models/user');


const authenticateUser = async (req, res, next) => {

    if (!req.cookies.authentication) {
        return res.render('users/login', { error: "You have to be logged in first." });
    }
    await User.findOne({ authToken: req.cookies.authentication }, (error, data) => {
        if(error) {
            console.log(error);
            return res.status(500).render('500');
        }
        if (!data) {
            return res.status(422).render('users/login', { error: "You have to be logged in first." });
        }
        res.locals.user = data;
        next();
    });
};


module.exports = {
    authenticateUser
};