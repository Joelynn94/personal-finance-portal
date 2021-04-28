const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAuthUser,
  deleteUser,
} = require('../controllers/userController');
const auth = require('../middleware/authorization');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.route('/auth').get(auth, getAuthUser);
router.delete('/delete', deleteUser);

module.exports = router;
