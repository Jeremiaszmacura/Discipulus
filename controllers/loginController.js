const User = require('../models/user');

const login_index = (req, res) => {
    res.render('login', { pageTitle: 'Login'} );
};


module.exports = {
    login_index
};