const express = require('express')
const cors = require('cors')

const corsOptions = {
  origin: 'http://localhost:8080',
}

const app = express()
const PORT = process.env.PORT || 8080

// setup the middleware to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// use CORS
app.use(cors(corsOptions))
// use static files
app.use(express.static('public'))

// basic route
app.get('/', (req, res) => {
  res.json({ message: 'basic server is setup' })
})

// listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
