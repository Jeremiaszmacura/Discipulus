const express = require('express');
const solutionsController = require('../controllers/solutionsController');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

const router = express.Router();

router.get('/personalInformation/:id', authorization.checkIfLogged, solutionsController.personalInformationGet);
router.post('/personalInformation/:id', authorization.checkIfLogged, solutionsController.personalInformationPost);


module.exports = router;
