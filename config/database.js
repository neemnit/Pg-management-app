require('dotenv').config();
const mongoose = require('mongoose');

const configureDB = () => {
    mongoose.set('strictQuery', true); // Suppress the strictQuery deprecation warning

    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,    // Ensures compatibility with the latest MongoDB driver
        useUnifiedTopology: true, // Ensures better connection handling
    })
    .then(() => {
        console.log('Successfully connected to the database');
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err.message);
        process.exit(1); // Exit the application in case of a critical error
    });
};

module.exports = configureDB;
