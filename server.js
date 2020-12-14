const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')

const corsOptions = {
  origin: 'http://localhost:8080',
}
const debtController = require('./controller/debts')

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
// use the api debtController
app.use(debtController)

// use EJS as the templating engine 
app.set('view engine', 'ejs')

// get index route
app.get('/', async (req, res) => {
  res.render('index')
})

// get debts route
app.get('/debts', async (req, res) => {
  res.render('debts')
})

// listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
