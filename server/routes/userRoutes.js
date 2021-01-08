const express = require('express');
const router = express.Router();
const { authUser } = require('../controllers/userController');

router.route('/signup').post(authUser);

module.exports = router;
