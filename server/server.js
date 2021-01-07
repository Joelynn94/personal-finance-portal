const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

const debtRoutes = require('./routes/debtRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// setup the middleware to handle data parsing
app.use(express.urlencoded({ extended: true }));
// this middleware creates the req.body object
app.use(express.json());
// use CORS
app.use(cors());
// use static files
app.use(express.static('public'));

// use the api debtRoutes
app.use('/api/v1', debtRoutes);
// use the api userRoutes
app.use('/api/v1/users', userRoutes);

// listen for requests
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`);
});
