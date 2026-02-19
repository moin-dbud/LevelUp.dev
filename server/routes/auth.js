const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

/* ─── helpers ─── */
const signToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

const authMiddleware = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer '))
        return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

/* ─── POST /api/auth/register ─── */
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password)
            return res.status(400).json({ message: 'All fields are required' });

        const exists = await User.findOne({ email });
        if (exists)
            return res.status(409).json({ message: 'Email already registered' });

        const hashed = await bcrypt.hash(password, 12);
        const user = await User.create({ firstName, lastName, email, password: hashed });
        const token = signToken(user._id);

        res.status(201).json({
            token,
            user: {
                id: user._id, firstName: user.firstName, lastName: user.lastName,
                email: user.email, contact: user.contact, dob: user.dob,
                bio: user.bio, role: user.role,
            },
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

/* ─── POST /api/auth/login ─── */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: 'Email and password required' });

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password)))
            return res.status(401).json({ message: 'Invalid email or password' });

        const token = signToken(user._id);

        res.json({
            token,
            user: {
                id: user._id, firstName: user.firstName, lastName: user.lastName,
                email: user.email, contact: user.contact, dob: user.dob,
                bio: user.bio, role: user.role,
            },
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

/* ─── GET /api/auth/me ─── */
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

/* ─── PUT /api/auth/profile ─── */
router.put('/profile', authMiddleware, async (req, res) => {
    try {
        const { firstName, lastName, contact, dob, bio } = req.body;
        const user = await User.findByIdAndUpdate(
            req.userId,
            { firstName, lastName, contact, dob, bio },
            { new: true, runValidators: true }
        ).select('-password');
        res.json({ user });
    } catch (err) {
        console.error('Profile update error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = { router, authMiddleware };
