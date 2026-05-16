const express = require('express')
const { Op } = require('sequelize')
const Contact = require('../models/Contact')
const protect = require('../middleware/authMiddleware')
const router = express.Router()

// POST /api/contacts  (public — form submission)
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email and message are required' })
        }
        const contact = await Contact.create({ name, email, subject, message })
        res.status(201).json({ message: 'Message received', id: contact.id })
    } catch (err) {
        console.error('Create contact error:', err)
        res.status(500).json({ message: 'Server error' })
    }
})

// GET /api/contacts  (admin only)
router.get('/', protect, async (req, res) => {
    try {
        const { search, page = 1, limit = 20 } = req.query
        
        const where = search ? {
            [Op.or]: [
                { name: { [Op.iLike]: `%${search}%` } },
                { email: { [Op.iLike]: `%${search}%` } }
            ]
        } : {}

        const contacts = await Contact.findAll({
            where,
            order: [['createdAt', 'DESC']],
            offset: (page - 1) * limit,
            limit: Number(limit)
        })
        const total = await Contact.count({ where })
        const unreadCount = await Contact.count({ where: { read: false } })
        
        res.json({ 
            contacts, 
            total, 
            unreadCount,
            totalPages: Math.ceil(total / limit),
            page: Number(page) 
        })
    } catch (err) {
        console.error('Get contacts error:', err)
        res.status(500).json({ message: 'Server error' })
    }
})

// PATCH /api/contacts/:id/read  (mark as read)
router.patch('/:id/read', protect, async (req, res) => {
    try {
        await Contact.update({ read: true }, { where: { id: req.params.id } })
        res.json({ message: 'Marked as read' })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

// DELETE /api/contacts/:id  (admin only)
router.delete('/:id', protect, async (req, res) => {
    try {
        await Contact.destroy({ where: { id: req.params.id } })
        res.json({ message: 'Deleted' })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

module.exports = router