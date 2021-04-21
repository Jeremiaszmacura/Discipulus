const express = require('express');
const registerController = require('../controllers/registerController');
const validate = require('../validation/register');

const router = express.Router();

router.get('/', registerController.register_index);
router.post('/', validate.register_validation ,registerController.register_post);

module.exports = router;