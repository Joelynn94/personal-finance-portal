const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAuthUser,
} = require('../controllers/userController');
const auth = require('../middleware/authorization');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.route('/auth').get(auth, getAuthUser);

module.exports = router;
