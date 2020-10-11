const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')

const db = require('./db')

const corsOptions = {
  origin: 'http://localhost:8080',
}

const app = express()
const PORT = process.env.PORT || 8080

// setup the middleware to handle data parsing
app.use(express.urlencoded({ extended: true }))
// this middleware creates the req.body object
app.use(express.json())
// use CORS
app.use(cors(corsOptions))
// use static files
app.use(express.static('public'))

// get all debts
app.get('/api/v1/debts', async (req, res) => {
  const data = await db.query("SELECT * FROM debt")
  console.log(data)

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

// get one debt by id
app.get('/api/v1/debts/:id', async (req, res) => {
  const data = await db.query('SELECT * FROM debt WHERE debt_id = $1', [req.params.id])
  console.log(data.rows[0])

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

// post a new debt
app.post('/api/v1/debts', async (req, res) => {
  const data = await 
    db.query('INSERT INTO debt (balance, min_payment, interest, account_type) VALUES ($1, $2, $3, $4) returning *', 
    [req.body.balance, req.body.min_payment, req.body.interest, req.body.account_type])
  console.log(data)

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

// update a debt by id
app.put('/api/v1/debts/:id', async (req, res) => {
  const data = await 
    db.query('UPDATE debt SET balance = $1, min_payment = $2, interest = $3, account_type = $4 WHERE debt_id = $5 returning *', 
    [req.body.balance, req.body.min_payment, req.body.interest, req.body.account_type, req.params.id])
  console.log(data)

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

app.delete('/api/v1/debts/:id', (req, res) => {
  console.log(req.params.id)
  console.log(req.body)

  res.status(204).json({
    status: "success"
  })
})

// listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
