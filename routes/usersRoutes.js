const express = require('express');
const usersController = require('../controllers/usersController');
const validate = require('../middleware/register');

const router = express.Router();

router.get('/register', usersController.registerIndex);
router.post('/register', validate.register_validation, usersController.registerPost);
router.get('/login', usersController.loginIndex);
router.post('/login', usersController.loginPost);


module.exports = router;