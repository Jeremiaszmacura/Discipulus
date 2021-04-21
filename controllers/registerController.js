const User = require('../models/user');

const register_index = (req, res) => {
    res.render('register', { pageTitle: 'Register'} );
};


const register_post = (req, res) => {
    const user = new User(req.body);

    user.save()
        .then((result) => {
            res.status(201).redirect('/');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).render('500');
        });
};


module.exports = {
    register_index,
    register_post
};