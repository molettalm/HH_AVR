const express = require('express');
const router = express.Router();

// Logout route
router.route('/').post((req, res) => {
    // Clear cookies
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });
    res.clearCookie('username', {
        httpOnly: false, // Not HttpOnly as it is accessible from the client-side
        secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;