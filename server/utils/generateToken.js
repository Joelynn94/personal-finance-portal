const jwt = require('jsonwebtoken');

const generateToken = (user_id) => {
  const payload = {
    user: {
      id: user_id,
    },
  };
  // create a json web token
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

module.exports = generateToken;
