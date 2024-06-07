const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
let User = require('../models/user');

const SECRET_KEY = 'super-secret-key';

router.route('/').post(async (req, res) => {
    const { email, username, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            username,
            password: hashedPassword
        });

        // Save the new user
        await newUser.save();

        // Set HttpOnly cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: true, // Use secure flag in production
            sameSite: 'none',
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        // Set username in the cookie
        res.cookie('username', newUser.username, {
            httpOnly: false, // Allow client-side access to username cookie
            secure: true, // Use secure flag in production
            sameSite: 'none',
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        // Generate a token for the new user
        const token = jwt.sign({ userId: newUser._id }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error: ' + error.message });
    }
});

router.route('/').get(async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Unable to get users' });
    }
});

module.exports = router;
