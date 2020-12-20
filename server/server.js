const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/connection')

dotenv.config()
connectDB()

const debtsController = require('./controller/debts')

const app = express()
const PORT = process.env.PORT || 8080

// setup the middleware to handle data parsing
app.use(express.urlencoded({ extended: true }))
// this middleware creates the req.body object
app.use(express.json())
// use CORS
app.use(cors())
// use static files
app.use(express.static('public'))

// use the api debtsController
app.use('/api/v1', debtsController)


// listen for requests
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`)
})
