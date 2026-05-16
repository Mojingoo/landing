const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const protect = require('../middleware/authMiddleware')
const router = express.Router()

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const admin = await Admin.findOne({ email })
        if (!admin) return res.status(401).json({ message: 'Invalid credentials' })

        const isMatch = await bcrypt.compare(password, admin.password)
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })

        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.json({ token, email: admin.email })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

// GET /api/auth/me  (verify token is still valid)
router.get('/me', protect, (req, res) => {
    res.json({ id: req.admin.id, email: req.admin.email })
})

module.exports = router