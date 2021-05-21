const User = require('../models/user');


const dashboardIndex = (req, res) => {
    res.render('dashboard', {
        pageTitle: 'Dashboard',
        userEmail: res.locals.user.email,
        userExams: res.locals.user.ownedExams
    });
};


module.exports = {
    dashboardIndex
};