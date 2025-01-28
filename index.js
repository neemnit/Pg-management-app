require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const configureDB = require('./config/database');
const router = require('./config/router');
const port = process.env.PORT || 4000; // Use process.env.PORT first, fallback to 4000

// Setup DB
configureDB();

app.use(express.json());
app.use(cors());
app.use(
    cors({
      origin: 'http://localhost:5173', // Allow requests from this origin
      methods: 'GET,POST,PUT,DELETE',  // Allow specific HTTP methods
      credentials: true,               // Allow cookies and credentials
    })
  );
app.use(router);

app.listen(port, () => {
    console.log('Server running on port', port);
});
