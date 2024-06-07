const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
let User = require('../models/user');

const SECRET_KEY = 'super-secret-key';

router.route('/').post(async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Set HttpOnly cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: true, // Use secure flag in production
            sameSite: 'none',
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        // Set username in the cookie
        res.cookie('username', user.username, {
            httpOnly: false, // Allow client-side access to username cookie
            secure: true, // Use secure flag in production
            sameSite: 'none',
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        const token = jwt.sign({ userId: user._id, }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

module.exports = router;
