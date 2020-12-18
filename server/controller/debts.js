const express = require('express')
const router = express.Router()

const db = require('../db')

// get all debts
router.get('/debts', async (req, res) => {
  const data = await 
    db.query("SELECT * FROM debt")

  try {
    res.status(200).json({
      status: "success",
      results: data.rows.length,
      debts: data.rows 
    })
  } catch (error) {
    res.status(500).json({
      status: error
    })
  }
})

// post a new debt
router.post('/debts', async (req, res) => {
  const data = await 
    db.query('INSERT INTO debt (balance, min_payment, interest, account_type) VALUES ($1, $2, $3, $4) RETURNING *', 
    [req.body.balance, req.body.min_payment, req.body.interest, req.body.account_type])

  try {
    res.status(201).json({
      status: "success",
      debt: data.rows[0]
    })
  } catch (error) {
    res.status(500).json({
      status: error
    })
  }
})

// get one debt by id
router.get('/debts/:id', async (req, res) => {
  const data = await 
    db.query('SELECT * FROM debt WHERE debt_id = $1', [req.params.id])

  try {
    res.status(200).json({
      status: "success",
      debt: data.rows[0]
    })
  } catch (error) {
    res.status(500).json({
      status: error
    })
  }
})

// update a debt by id
router.put('/debts/:id', async (req, res) => {
  const data = await 
    db.query('UPDATE debt SET balance = $1, min_payment = $2, interest = $3, account_type = $4 WHERE debt_id = $5 RETURNING *', 
    [req.body.balance, req.body.min_payment, req.body.interest, req.body.account_type, req.params.id])

  try {
    res.status(200).json({
      status: "success",
      debt: data.rows[0]
    })
  } catch (error) {
    res.status(500).json({
      status: error
    })
  }
})

// Delete a debt by id
router.delete('/debts/:id', async (req, res) => {
  const data = await 
    db.query('DELETE FROM debt WHERE debt_id = $1 RETURNING *', 
    [req.params.id])

  const allDebts = await 
    db.query("SELECT * FROM debt")

    try {
      res.status(204).json({
        status: "success",
        debts: allDebts.rows,
        results: allDebts.rows.length,
      })
    } catch (error) {
      res.status(500).json({
        status: error
      })
    }
})

module.exports = router