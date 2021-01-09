const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  // create a json web token
  return jwt.sign(
    { id },
    process.env.jwtSecret,
    {
      expiresIn: 5000,
    },
    (err, token) => {
      if (err) {
        return res
          .status(401)
          .send({ status: `There was a problem generating a web token` });
      }
      // if the data was created - send the new data back and the token
      res.status(201).json({ id, token });
    }
  );
};

module.exports = generateToken;
