const express = require('express');
const router = express.Router();

const db = require('../db');

/**
 * get all debts
 * @param {object} req
 * @param {object} res
 * @returns {array} list of all debts
 */
router.get('/debts', async (req, res) => {
  const data = await db.query('SELECT * FROM debt');

  try {
    res.status(200).json({
      status: 'success',
      results: data.rows.length,
      debts: data.rows,
    });
  } catch (error) {
    res.status(500).json({
      status: error,
    });
  }
});

/**
 * post a new debt
 * @param {object} req
 * @param {object} res
 * @returns {object} new dept
 */
router.post('/debts', async (req, res) => {
  // query to create a new debt
  const createNew =
    'INSERT INTO debt (balance, interest_rate, min_payment, debt_type, account_name) VALUES ($1, $2, $3, $4, $5) RETURNING *';

  // values to use to create new data in the database
  const postParams = [
    req.body.balance,
    req.body.interest_rate,
    req.body.min_payment,
    req.body.debt_type,
    req.body.account_name,
  ];

  try {
    // pull the rows data out of the {data} object and query it
    const { rows } = await db.query(createNew, postParams);

    // if the data was created - send the new data back
    res.status(201).json({
      status: 'success',
      debt: rows[0],
    });
  } catch (error) {
    res.status(500).json({
      status: error,
    });
  }
});

/**
 * get one debt by id
 * @param {object} req
 * @param {object} res
 * @returns {object} get one debt
 */
router.get('/debts/:id', async (req, res) => {
  // query to find the debt
  const getOneById = 'SELECT * FROM debt WHERE debt_id = $1';

  try {
    // pull the rows data out of the {data} object and query it
    const { rows } = await db.query(getOneById, [req.params.id]);
    // if the data is empty
    if (!rows[0]) {
      // return an error
      return res.status(404).send({
        status: `Failed to find this debt, ID ${req.params.id} does not exist`,
      });
      // if there is data - return the data
    } else {
      res.status(200).send({
        status: 'success',
        debt: rows[0],
      });
    }
  } catch (error) {
    res.status(500).json({
      status: error,
    });
  }
});

/**
 * Update a debt by id
 * @param {object} req
 * @param {object} res
 * @returns {object} updated dept
 */
router.put('/debts/:id', async (req, res) => {
  // query to update the debt
  const updateByIdQuery =
    'UPDATE debt SET balance = $1, interest_rate = $2, min_payment = $3, debt_type = $4, account_name = $5 WHERE debt_id = $6 RETURNING *';

  // values to use for the database query
  const findParams = [
    req.body.balance || rows[0].balance,
    req.body.interest_rate || rows[0].interest_rate,
    req.body.min_payment || rows[0].min_payment,
    req.body.debt_type || rows[0].debt_type,
    req.body.account_name || rows[0].account_name,
    req.params.id,
  ];

  try {
    // pull the rows data out of the {data} object and query it
    const { rows } = await db.query(updateByIdQuery, findParams);
    // if the data is empty
    if (!rows[0]) {
      // return an error
      return res.status(404).send({
        status: `Failed to find this debt, ID ${req.params.id} does not exist`,
      });
      // if there is data - return the updated data
    } else {
      res.status(200).send({
        status: 'success',
        debt: rows[0],
      });
    }
  } catch {
    res.status(500).send({
      status: `Failed to update this debt, ID ${req.params.id} does not exist`,
    });
  }
});

/**
 * Delete A Debt by id
 * @param {object} req
 * @param {object} res
 * @returns {void} return status code 204
 */
router.delete('/debts/:id', async (req, res) => {
  // query to delete the debt
  const deleteByIdQuery = 'DELETE FROM debt WHERE debt_id = $1 RETURNING *';

  try {
    // pull the rows data out of the {data} object and query it
    const { rows } = await db.query(deleteByIdQuery, [req.params.id]);
    // if the data is empty
    if (!rows[0]) {
      // return an error
      return res.status(404).send({
        status: `Failed to delete debt, ID ${req.params.id} does not exist`,
      });
      // if there is data and it was updated - return a message
    } else {
      return res
        .status(200)
        .send({ status: `ID ${req.params.id} was successfully deleted` });
    }
  } catch (error) {
    res.status(500).json({
      status: error,
    });
  }
});

module.exports = router;
