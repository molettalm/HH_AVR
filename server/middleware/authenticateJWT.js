const jwt = require('jsonwebtoken');
const SECRET_KEY = 'super-secret-key';

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token; // Retrieve token from cookies
    if (!token) {
        return res.status(403).json({ error: 'A token is required for authentication' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ error: 'Invalid Token' });
    }

    return next();
};

module.exports = authenticateJWT;
