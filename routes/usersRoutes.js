const express = require('express');
const usersController = require('../controllers/usersController');
const validate = require('../middleware/validation');
const authorization = require('../middleware/authorization');

const router = express.Router();

router.get('/register', authorization.checkIfLogged, usersController.registerIndex);
router.post('/register', authorization.checkIfLogged, validate.register_validation, usersController.registerPost);
router.get('/login', authorization.checkIfLogged, usersController.loginIndex);
router.get('/logout',  usersController.logout);
router.post('/login', authorization.checkIfLogged, usersController.loginPost);


module.exports = router;
