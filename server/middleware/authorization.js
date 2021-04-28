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
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      // 401 is an unauthorized status
      return res
        .status(401)
        .json({ msg: 'Token verification failed, authorization denied' });
    }
    // once the token is verified
    // take the user out of verified - verified is the entire token verified
    console.log(verified.id);
    req.user = verified.id;
    // call next to move on
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
