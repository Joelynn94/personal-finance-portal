const bcrypt = require('bcryptjs');
const db = require('../db');
const { check, validationResult } = require('express-validator');

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

  await check('name', 'Please add a valid name that is not empty')
    .not()
    .isEmpty()
    .run(req);
  await check('email', 'Please enter a valid email address').isEmail().run(req);
  await check('password', 'Password must be at least 6 characters in length')
    .isLength({ min: 6 })
    .run(req);
  await check('isadmin', 'Not an admin').isBoolean().run(req);

  const errors = validationResult(req);
  // check is errors is empty
  if (!errors.isEmpty()) {
    // sends a status of 400 and sends json data that gives back an array of errors
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // query to check if user exists
    const user = await db.query(findUserByEmail, [email]);
    // if the user already exists
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
      res.status(201).json({
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
