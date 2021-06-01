const express = require('express');
const aboutController = require('../controllers/aboutController');
const authorization = require('../middleware/authorization');

const router = express.Router();

router.get('/', authorization.checkIfLogged, aboutController.aboutIndex);


module.exports = router;
