const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')

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
app.get('/api/v1/debts', (req, res) => {
  res.status(200).json({
    status: "success",
    debt: ['Student Loan', 'Auto Loan']
  })
})

// get one debt by id
app.get('/api/v1/debts/:id', (req, res) => {
  console.log(req.params.id)

  res.status(200).json({
    status: "success",
    debt: ['Student Loan', 'Auto Loan']
  })
})

// post a new debt
app.post('/api/v1/debts', (req, res) => {
  console.log(req.body)

  res.status(201).json({
    status: "success",
    debt: ['Student Loan', 'Auto Loan']
  })
})

// update a deby by id
app.put('/api/v1/debts/:id', (req, res) => {
  console.log(req.params.id)
  console.log(req.body)

  res.status(200).json({
    status: "success",
    debt: ['Student Loan', 'Auto Loan']
  })
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
