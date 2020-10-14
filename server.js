const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')

const corsOptions = {
  origin: 'http://localhost:8080',
}
const debtRoutes = require('./routes/debts')

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
//
app.use('/api/v1', debtRoutes)



// listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
