const User = require('../models/user');
const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');


const registerIndex = (req, res) => {
    res.render('users/register', { pageTitle: 'Register'} );
};


const registerPost = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // second param is salt

    const user = new User( { email: req.body.email, password: hashedPassword, authToken: uniqueString() } );

    user.save()
        .then(() => {
            res.status(201).redirect('/users/login');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).render('500');
        });
};

const loginIndex = (req, res) => {
    res.render('users/login', { pageTitle: 'Login'} );
};


const loginPost = async (req, res) => {
    User.findOne({ email: req.body.email }, (error, data) => {
        if(error) {
            console.log(error);
        }
        if (!data) {
            return res.render('users/login', { error: "No such an email registered", pageTitle: 'Login' });
        }
        bcrypt.compare(req.body.password, data.password, (err, result) => {
            if (err) {
                return res.status(500).render('500');
            }
            if (result) {
                res.cookie('authentication', data.authToken, { maxAge: 1000 * 60 * 60 * 12 });
                res.cookie('adminRole', data.admin, { maxAge: 1000 * 60 * 60 * 12 });
                return res.status(201).redirect('/');
            }
            res.render('users/login', { error: "Invalid password", pageTitle: 'Login' });
        });
    });
};


const logout = (req, res) => {
    res.clearCookie("authentication");
    res.clearCookie("adminRole");
    res.render('users/login', { pageTitle: 'Login', isLogged: false });
};


module.exports = {
    registerIndex,
    registerPost,
    loginIndex,
    loginPost,
    logout
};
