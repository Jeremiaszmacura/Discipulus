const express = require('express');
const usersController = require('../controllers/usersController');
const validate = require('../validation/register');

const router = express.Router();

router.get('/register', usersController.register_index);
router.post('/register', validate.register_validation, usersController.register_post);
router.get('/login', usersController.login_index);


module.exports = router;