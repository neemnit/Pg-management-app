const User = require('../models/user')
const userCltr = {}
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
userCltr.create = async (req, res) => {
    try {

        const body = req.body;
        if (!body || Object.keys(body).length === 0) {
            return res.status(400).json({ error: 'Request body cannot be empty' });
        }

        // Create a new user instance
        const user = new User(body);

        // Save the user to the database
        const savedUser = await user.save();

        // Respond with the saved user
        res.status(201).json(savedUser);
    } catch (err) {
        // Check if the error is from Yup validation or Mongoose
        if (err.name === 'ValidationError') {
            // Extract Yup-specific validation errors
            res.status(400).json({ errors: err.errors });
        } else if (err.code === 11000) {
            // Handle unique constraint violations
            const field = Object.keys(err.keyPattern)[0];
            res.status(400).json({ error: `${field} must be unique` });
        } else {
            // Handle other errors
            res.status(500).json({ error: 'An error occurred', details: err.message });
        }
    }
}
userCltr.show = (req, res) => {

    User.find()
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
}



userCltr.login = async (req, res) => {
    try {
        const { email, password } = req.body;


        // Call the static method to find user by credentials
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }

        // Generate the token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });



        // Generate the token


        res.status(200).json({ token, message: 'Login success' });

    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

module.exports = userCltr;






userCltr.showById = (req, res) => {
    const id = req.params.id
    User.findById(id)
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
}
userCltr.destroy = (req, res) => {
    const id = req.params.id
    User.findByIdAndDelete(id)
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
}
module.exports = userCltr