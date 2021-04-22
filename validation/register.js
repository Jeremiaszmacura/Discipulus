const { check, validationResult } = require('express-validator');

const User = require('../models/user');


register_validation = [

    check('email')
        .not()
        .isEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid Email')
        .custom((value, {req}) => {
            return new Promise((resolve, reject) => {
                User.findOne({ email: req.body.email }, function(err, user){
                    if(err) {
                        reject(new Error('Server Error'))
                    }
                    if(Boolean(user)) {
                        reject(new Error('E-mail already in use'))
                    }
                    resolve(true)
                });
            });
        }),

    check('password')
        .not()
        .isEmpty()
        .withMessage('Password is required')
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 chars long.'),

    check('confirmedPassword', 'Passwords do not match')
        .exists()
        .custom((value, { req }) => value === req.body.password),

    (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('users/register', { error: JSON.stringify(errors) });
    }
    else next();
}
];


module.exports = {
    register_validation
};