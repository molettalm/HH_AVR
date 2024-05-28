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

        // Generate a token for the new user
        const token = jwt.sign({ userId: newUser._id }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ message: 'User created successfully', token });
    } catch (error) {
        res.status(500).json({ error: 'Error: ' + error.message });
    }
});

//GET Registered Users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Unable to get users' });
    }
});

module.exports = router;
