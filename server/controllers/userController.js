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

  // destructure from the req.body
  const { name, email, password } = req.body;

  await check('name', 'Please add a valid name that is not empty')
    .not()
    .isEmpty()
    .run(req);
  await check('email', 'Please enter a valid email address').isEmail().run(req);
  await check('password', 'Password must be at least 6 characters in length')
    .isLength({ min: 6 })
    .run(req);

  // let the validator check the req
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
      // query to create a new user
      const createNewUserQuery =
        'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *';

      // bcrypt the password before saving new user to database
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);

      // values to use to create new data in the database
      const postParams = [name, email, bcryptPassword];

      // create the new user
      const newUser = await db.query(createNewUserQuery, postParams);

      // create the payload object to send back
      res.status(201).json({
        id: newUser.rows[0].user_id,
        name: newUser.rows[0].user_name,
        email: newUser.rows[0].user_email,
        token: generateToken(newUser.rows[0].user_id),
        status: 'Success! A new user has been created',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: error,
      message: 'Server error',
    });
  }
};

const loginUser = async (req, res) => {
  // query to find user by user_email
  const findUserByEmail = 'SELECT * FROM users WHERE user_email = $1';

  // destructure from the req.body
  const { email, password } = req.body;

  await check('email', 'Please enter a valid email address').isEmail().run(req);
  await check('password', 'Password is required').exists().run(req);

  // let the validator check the req
  const errors = validationResult(req);
  // check is errors is empty
  if (!errors.isEmpty()) {
    // sends a status of 400 and sends json data that gives back an array of errors
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // query to check if user exists
    const user = await db.query(findUserByEmail, [email]);
    // if the user does not exist
    if (user.rows.length === 0) {
      return res.status(401).send({
        status: `User with the email ${email} does not exists, please register first`,
      });
    }
    // check if password is valid
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    // if the password is not valid
    if (!validPassword) {
      return res.status(401).send({
        status: `User with the password ${password} does not match, please enter a valid password`,
      });
    }

    // create the payload object to send back
    res.status(201).json({
      id: user.rows[0].user_id,
      name: user.rows[0].user_name,
      email: user.rows[0].user_email,
      token: generateToken(user.rows[0].user_id),
      status: 'Success! A user has been logged in',
    });
  } catch (error) {
    res.status(500).json({
      status: error,
      message: 'Server error',
    });
  }
};

const getAuthUser = async (req, res) => {
  // query to find user by user_id
  const findUserById = 'SELECT * FROM users WHERE user_id = $1';

  try {
    // query to check if user exists
    const user = await db.query(findUserById, [req.user.id]);

    // create the payload object to send back
    res.status(201).json({
      id: user.rows[0].user_id,
      name: user.rows[0].user_name,
      email: user.rows[0].user_email,
      token: generateToken(user.rows[0].user_id),
      status: 'Success! The user is authorized',
    });
  } catch (error) {
    res.status(500).json({
      status: error,
      message: 'Server error',
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAuthUser,
};
