const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  // create a json web token
  return jwt.sign({ id }, process.env.jwtSecret, {
    expiresIn: '1d',
  });
};

module.exports = generateToken;
