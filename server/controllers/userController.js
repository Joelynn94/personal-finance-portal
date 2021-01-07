const bcrypt = require('bcryptjs');
const db = require('../db');

/**
 * get user
 * @param {object} req
 * @param {object} res
 * @returns {array} return a user
 */
const authUser = async (req, res) => {
  const findUserByEmail = 'SELECT * FROM users WHERE user_email = $1';

  // destructure from the req.body
  const { name, email, password, isadmin } = req.body;

  try {
    // // check if user exists
    const user = await db.query(findUserByEmail, [email]);

    if (user.rows.length !== 0) {
      return res
        .status(401)
        .send({ status: `User with the email ${email} already exists` });
    }

    // create new user
    const createNewUserQuery =
      'INSERT INTO users (user_name, user_email, user_password, isadmin) VALUES ($1, $2, $3, $4) RETURNING *';

    // bcrypt the password
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const postParams = [name, email, bcryptPassword, isadmin];

    const newUser = await db.query(createNewUserQuery, postParams);

    res.json(newUser.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  authUser,
};
