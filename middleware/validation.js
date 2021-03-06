const { check, validationResult } = require('express-validator');

const User = require('../models/user');

// eslint-disable-next-line
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
                    if(Boolean(user)) { // eslint-disable-line
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
    const result = validationResult(req);
    result.errors.map((error, index) => {
        result.errors[index] = {
            msg: error.msg
        }
    });
    if(result.errors.length) {
        console.log({ error: JSON.stringify(result.errors) });
    }
    if (!result.isEmpty()) {
        return res.status(422).render('users/register', { error: result.errors });
    }
    next();
}
];


module.exports = {
    register_validation  // eslint-disable-line
};
