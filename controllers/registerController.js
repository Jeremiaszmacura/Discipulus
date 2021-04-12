const register_index = (req, res) => {
    res.render('register', { pageTitle: 'Register'} );
};


module.exports = {
    register_index
};