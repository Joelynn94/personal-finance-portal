const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    // Get token from the header
    // we can access the header through the req
    // x-auth-token is basically the key to the token inside the header
    const token = req.header('x-auth-token');

    // Check if token exists
    if (!token) {
      // 401 is an unauthorized status
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    // if there is a token we need to verify it
    // pass in the token and the secret
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // once the token is verified - the payload (an object) is put into decoded
    // take the user out of decoded - decoded is the entire token payload
    console.log(payload.user.id);
    req.user = payload.user;
    // call next to move on
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
