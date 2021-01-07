const bcrypt = require('bcryptjs');
const db = require('../db');

/**
 * get user
 * @param {object} req
 * @param {object} res
 * @returns {object} return a new user
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
    } else {
      // create new user
      const createNewUserQuery =
        'INSERT INTO users (user_name, user_email, user_password, isadmin) VALUES ($1, $2, $3, $4) RETURNING *';

      // bcrypt the password
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);

      // values to use to create new data in the database
      const postParams = [name, email, bcryptPassword, isadmin];

      // create the new user
      const newUser = await db.query(createNewUserQuery, postParams);

      // if the data was created - send the new data back
      res.status(200).json({
        status: 'success',
        user: newUser.rows[0],
      });
    }
  } catch (error) {
    res.status(500).json({
      status: error,
    });
  }
};

module.exports = {
  authUser,
};
