const express = require('express');
const testsController = require('../controllers/testsController');

const router = express.Router();

router.get('/', testsController.tests_index);
router.get('/create', testsController.tests_create);

module.exports = router;