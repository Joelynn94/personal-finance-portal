const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  // checking the request header for a token
  // const { token } = req.headers('x-auth-token');
  let token = '';

  // if there is not token
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      // checks if the jwt token is valid
      const payload = jwt.verify(token, process.env.jwtSecret);

      // puts this payload into the user object (req.user) - so we can access this in our routes
      req.user = payload.user;
      next();
    } catch (error) {
      res.status(403).json({
        message: 'Not Authorized',
      });
    }
  }
};
