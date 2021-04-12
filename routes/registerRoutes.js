const express = require('express');
const registerController = require('../controllers/registerController');

const router = express.Router();

router.get('/', registerController.register_index);

module.exports = router;