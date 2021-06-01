const express = require('express');
const homeController = require('../controllers/homeController');
const authorization = require('../middleware/authorization');

const router = express.Router();

router.get('/', authorization.checkIfLogged, homeController.homeIndex);
router.post('/', authorization.checkIfLogged, homeController.homePostCode);


module.exports = router;
