const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const createError = require('../utils/appError');

// Register user
exports.signup = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            return next(new createError('User already exists!', 400));
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
        });

        // Assign JWT
        const token = jwt.sign({ _id: newUser._id }, "secretkey123", {
            expiresIn: "90d",
        });

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            token,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        next(error);
    }
};

// Logout user
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error logging out:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.redirect('/');
            res.status(200).json({ message: 'Logout successful' });
        }
    });
};
