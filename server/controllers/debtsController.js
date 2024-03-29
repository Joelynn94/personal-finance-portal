const db = require('../db');

/**
 * get all debts
 * @param {object} req
 * @param {object} res
 * @returns {array} list of all debts
 */
const getAllDebts = async (req, res) => {
  // query to find all debts
  const findAllQuery = 'SELECT * FROM debts';

  try {
    const { rows } = await db.query(findAllQuery);
    res.status(200).json({
      msg: 'Success! Found all debts for this user',
      results: rows.length,
      debts: rows,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error!');
  }
};

/**
 * post a new debt
 * @param {object} req
 * @param {object} res
 * @returns {object} new dept
 */
const createDebt = async (req, res) => {
  // query to create a new debt
  const createNewQuery =
    'INSERT INTO debts (balance, interest_rate, min_payment, debt_type, account_name) VALUES ($1, $2, $3, $4, $5) RETURNING *';

  // destructure from the req.body
  const {
    balance,
    interest_rate,
    min_payment,
    debt_type,
    account_name,
  } = req.body;
  // values to use to create new data in the database
  const postParams = [
    balance,
    interest_rate,
    min_payment,
    debt_type,
    account_name,
  ];

  try {
    // pull the rows data out of the {data} object and query it
    const { rows } = await db.query(createNewQuery, postParams);

    // if the data was created - send the new data back
    res.status(201).json({
      msg: `Success! A new debt has been created`,
      debt: rows[0],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error!');
  }
};

/**
 * get one debt by id
 * @param {object} req
 * @param {object} res
 * @returns {object} get one debt
 */
const getDebtById = async (req, res) => {
  // query to find the debt
  const getOneByIdQuery = 'SELECT * FROM debts WHERE debt_id = $1';

  try {
    // pull the rows data out of the {data} object and query it
    const { rows } = await db.query(getOneByIdQuery, [req.params.id]);
    // if the data is empty
    if (!rows[0]) {
      // return an error
      return res.status(404).json({
        status: `Failed to find this debt, ID ${req.params.id} does not exist`,
      });
      // if there is data - return the data
    } else {
      res.status(200).json({
        msg: `Success! Found debt ${req.params.id}`,
        debt: rows[0],
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error!');
  }
};

/**
 * Update a debt by id
 * @param {object} req
 * @param {object} res
 * @returns {object} updated dept
 */
const updateDeptById = async (req, res) => {
  // query to update the debt
  const updateByIdQuery =
    'UPDATE debts SET balance = $1, interest_rate = $2, min_payment = $3, debt_type = $4, account_name = $5 WHERE debt_id = $6 RETURNING *';

  // desctructre from the req.body
  const {
    balance,
    interest_rate,
    min_payment,
    debt_type,
    account_name,
  } = req.body;
  // values to use for the database query
  const findParams = [
    balance,
    interest_rate,
    min_payment,
    debt_type,
    account_name,
    req.params.id,
  ];

  try {
    // pull the rows data out of the {data} object and query it
    const { rows } = await db.query(updateByIdQuery, findParams);
    // if the data is empty
    if (!rows[0]) {
      // return an error
      return res.status(404).json({
        msg: `Failed to find this debt, ID ${req.params.id} does not exist`,
      });
      // if there is data - return the updated data
    } else {
      res.status(200).json({
        msg: `Success! Debt ID ${req.params.id} has been updated`,
        debt: rows[0],
      });
    }
  } catch {
    console.log(error.message);
    res.status(500).send('Server Error!');
  }
};

/**
 * Delete A Debt by id
 * @param {object} req
 * @param {object} res
 * @returns {void} return status code 204
 */
const deleteDebt = async (req, res) => {
  // query to delete the debt
  const deleteByIdQuery = 'DELETE FROM debts WHERE debt_id = $1 RETURNING *';

  try {
    // pull the rows data out of the {data} object and query it
    const { rows } = await db.query(deleteByIdQuery, [req.params.id]);
    // if the data is empty
    if (!rows[0]) {
      // return an error
      return res.status(404).json({
        msg: `Failed to delete debt, ID ${req.params.id} does not exist`,
      });
      // if there is data and it was updated - return a message
    } else {
      return res
        .status(200)
        .json({ msg: `ID ${req.params.id} was successfully deleted` });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error!');
  }
};

module.exports = {
  getAllDebts,
  createDebt,
  getDebtById,
  updateDeptById,
  deleteDebt,
};
