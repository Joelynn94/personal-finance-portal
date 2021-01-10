const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  let token = '';

  // if there is not token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      // checks if the jwt token is valid
      const user = jwt.verify(token, process.env.jwtSecret);

      // puts this payload into the user object (req.user) - so we can access this in our routes
      req.user = user;
      next();
    } catch (error) {
      res.status(403).json({
        message: 'Not Authorized, token is not valid',
      });
    }
  }

  if (!token) {
    res.status(401).json({
      status: 'Not authorized, no token',
    });
  }
};
