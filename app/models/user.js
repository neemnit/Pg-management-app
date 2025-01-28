const mongoose = require('mongoose');
const yup = require('yup');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
// Define Yup schema for validation
const userValidationSchema = yup.object().shape({
    name: yup
        .string()
        .required('Name is required')
        .test(
            'is-unique',
            'Name must be unique',
            async function (value) {
                const User = mongoose.model('User'); // Ensure the User model is accessible
                const user = await User.findOne({ name: value });
                return !user; // Return true if no user is found, indicating the name is unique
            }
        ),
    email: yup
        .string()
        .required('Email is required')
        .email('Invalid email format')
        .test(
            'is-unique',
            'Email must be unique',
            async function (value) {
                const User = mongoose.model('User');
                const user = await User.findOne({ email: value });
                return !user;
            }
        ),
    password: yup
        .string()
        .required('Password is required')
        .matches(
            /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{8,}$/,
            'Password must have at least one uppercase letter, one special character, and be alphanumeric with at least 8 characters'
        )
});

// Define the Mongoose schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Middleware for validation
userSchema.pre('save', async function (next) {
    try {
        await userValidationSchema.validate({
            name: this.name,
            email: this.email,
            password: this.password
        });
        if (this.isModified('password')) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
        userSchema.statics.findByCredentials = async function (email, password) {
            console.log("findByCredentials method called");
        
            // Find the user by email
            const user = await this.findOne({ email });  // `this` refers to the User model
            if (!user) {
                throw new Error('Invalid login credentials');
            }
        
            // Compare password with the hashed password in DB
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Invalid login credentials');
            }
        
            return user;
        };
        
        // Instance method to generate a JWT
        userSchema.methods.generateToken = function () {
            const payload = { id: this._id, email: this.email };
            const secretKey = process.env.JWT_SECRET || 'yourSecretKey';
            const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
            return token;
        };
        next();

        
    
        
    }
    catch (err) {
        next(err);
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
