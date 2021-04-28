const jwt = require('jsonwebtoken');

const generateToken = (user_id) => {
  // create a json web token
  return jwt.sign({ id: user_id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

module.exports = generateToken;
