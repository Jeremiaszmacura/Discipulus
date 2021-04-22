const User = require('../models/user');
const bcrypt = require('bcrypt');


const register_index = (req, res) => {
    res.render('users/register', { pageTitle: 'Register'} );
};

const register_post = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // second param is salt

    const user = new User( { email: req.body.email, password: hashedPassword } );

    user.save()
        .then((result) => {
            res.status(201).redirect('/');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).render('500');
        });
};

const login_index = (req, res) => {
    res.render('users/login', { pageTitle: 'Login'} );
};


module.exports = {
    register_index,
    register_post,
    login_index
};