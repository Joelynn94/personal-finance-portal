const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const generateToken = require('../utils/generateToken');
const db = require('../db');

/**
 * get user
 * @param {object} req
 * @param {object} res
 * @returns {object} return a new user
 */
const registerUser = async (req, res) => {
  const findUserByEmail = 'SELECT * FROM users WHERE user_email = $1';

  try {
    // destructure from the req.body
    const { name, email, password } = req.body;

    // check the name is not an empty string
    await check('name', 'Please add a valid name that is not empty')
      .not()
      .isEmpty()
      .trim()
      .run(req);
    // check the email follows a valid email address pattern
    await check('email', 'Please enter a valid email address')
      .trim()
      .isEmail()
      .run(req);
    // check the password is at least 6 characters in length
    await check('password', 'Password must be at least 6 characters in length')
      .trim()
      .isLength({ min: 6 })
      .run(req);
    // let the validator check the req
    const errors = validationResult(req);

    // check if errors are not empty
    if (!errors.isEmpty()) {
      // sends a status of 400 and send json data that gives back an array of errors
      return res.status(400).json({ errors: errors.array() });
    }

    // query to check if user exists, querying by email
    const user = await db.query(findUserByEmail, [email]);
    // if the user already exists
    if (user.rows.length !== 0) {
      return res
        .status(409)
        .json({ msg: `An account with the email ${email} already exists` });
    }

    // query to create a new user
    const createNewUserQuery =
      'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *';

    // bcrypt the password before saving new user to database
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // values to use to create new data in the database
    const newUserParams = [name, email, bcryptPassword];

    // create the new user
    const newUser = await db.query(createNewUserQuery, newUserParams);

    // create the payload object to send back
    res.status(201).json({
      token: generateToken(newUser.rows[0].user_id),
      user: {
        id: newUser.rows[0].user_id,
        name: newUser.rows[0].user_name,
        email: newUser.rows[0].user_email,
        msg: `Success! User ${newUser.rows[0].user_name} has been created`,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  // query to find user by user_email
  const findUserByEmail = 'SELECT * FROM users WHERE user_email = $1';

  try {
    // destructure from the req.body
    const { email, password } = req.body;

    await check('email', 'Please enter a valid email address')
      .trim()
      .isEmail()
      .run(req);
    await check('password', 'Password is required').trim().exists().run(req);

    // let the validator check the req
    const errors = validationResult(req);
    // check if errors are not empty
    if (!errors.isEmpty()) {
      // sends a status of 400 and send json data that gives back an array of errors
      return res.status(400).json({ errors: errors.array() });
    }

    // query to check if user exists
    const user = await db.query(findUserByEmail, [email]);
    // if the user does not exist
    if (user.rows.length === 0) {
      return res.status(401).json({
        msg: `User with the email ${email} does not exists, please register before trying to sign in`,
      });
    }
    // check if password is valid
    const isMatch = await bcrypt.compare(password, user.rows[0].user_password);
    // if the password is not valid
    if (!isMatch) {
      return res.status(401).json({
        msg: 'Invalid credentials',
      });
    }

    // create the payload object to send back
    res.status(201).json({
      token: generateToken(user.rows[0].user_id),
      user: {
        id: user.rows[0].user_id,
        name: user.rows[0].user_name,
        email: user.rows[0].user_email,
        msg: `Success! User ${user.rows[0].user_name} has been logged in`,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAuthUser = async (req, res) => {
  // query to find user by user_id
  const findUserById =
    'SELECT user_id, user_name, user_email FROM users WHERE user_id = $1';

  try {
    // query to check if user exists
    // req.user has the payload
    const user = await db.query(findUserById, [req.user]);

    // check if there is a token in the header
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({
        msg: 'User is not authorized to go here, please register',
      });
    }

    res.json(user.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  // query to find user by user_id
  const deleteUserById = 'DELETE users WHERE user_id = $1';

  try {
    // query to check if user exists
    // req.user has the payload
    const deletedUser = await db.query(deleteUserById, [req.user]);

    res.json(deletedUser.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAuthUser,
  deleteUser,
};
