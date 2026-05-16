const express = require('express')
const router = express.Router()
const { LegalCategory, LegalSection, LegalBlock } = require('../models')
const authMiddleware = require('../middleware/authMiddleware')

// ─── PUBLIC ROUTES ───────────────────────────────────────────────

// GET /api/legal
// Returns all categories with nested sections and blocks
router.get('/', async (req, res) => {
    try {
        const categories = await LegalCategory.findAll({
            where: {},
            order: [
                ['order', 'ASC'],
                [{ model: LegalSection, as: 'sections' }, 'order', 'ASC'],
                [{ model: LegalSection, as: 'sections' }, { model: LegalBlock, as: 'blocks' }, 'order', 'ASC'],
                [{ model: LegalSection, as: 'sections' }, { model: LegalSection, as: 'subSections' }, 'order', 'ASC'],
                [{ model: LegalSection, as: 'sections' }, { model: LegalSection, as: 'subSections' }, { model: LegalBlock, as: 'blocks' }, 'order', 'ASC']
            ],
            include: [{
                model: LegalSection,
                as: 'sections',
                where: { isActive: true, parentId: null },
                required: false,
                include: [{
                    model: LegalSection,
                    as: 'subSections',
                    where: { isActive: true },
                    required: false,
                    include: [{
                        model: LegalBlock,
                        as: 'blocks',
                        where: { isActive: true },
                        required: false
                    }]
                }, {
                    model: LegalBlock,
                    as: 'blocks',
                    where: { isActive: true },
                    required: false
                }]
            }]
        })
        res.json(categories)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// GET /api/legal/:slug
// Returns single category (e.g. "privacy")
router.get('/:slug', async (req, res) => {
    try {
        const category = await LegalCategory.findOne({
            where: { slug: req.params.slug },
            include: [{
                model: LegalSection,
                as: 'sections',
                where: { isActive: true, parentId: null },
                required: false,
                order: [['order', 'ASC']],
                include: [{
                    model: LegalSection,
                    as: 'subSections',
                    where: { isActive: true },
                    required: false,
                    order: [['order', 'ASC']],
                    include: [{
                        model: LegalBlock,
                        as: 'blocks',
                        where: { isActive: true },
                        required: false,
                        order: [['order', 'ASC']]
                    }]
                }, {
                    model: LegalBlock,
                    as: 'blocks',
                    where: { isActive: true },
                    required: false,
                    order: [['order', 'ASC']]
                }]
            }]
        })
        if (!category) return res.status(404).json({ error: 'Category not found' })
        res.json(category)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// ─── ADMIN ROUTES (JWT protected) ────────────────────────────────

// SECTIONS
router.post('/sections', authMiddleware, async (req, res) => {
    try {
        const section = await LegalSection.create(req.body)
        res.status(201).json(section)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

router.put('/sections/:id', authMiddleware, async (req, res) => {
    try {
        const section = await LegalSection.findByPk(req.params.id)
        if (!section) return res.status(404).json({ error: 'Section not found' })
        await section.update(req.body)
        res.json(section)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

router.delete('/sections/:id', authMiddleware, async (req, res) => {
    try {
        const section = await LegalSection.findByPk(req.params.id)
        if (!section) return res.status(404).json({ error: 'Section not found' })
        await section.destroy()
        res.json({ message: 'Deleted' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// BLOCKS
router.post('/blocks', authMiddleware, async (req, res) => {
    try {
        const block = await LegalBlock.create(req.body)
        res.status(201).json(block)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

router.put('/blocks/:id', authMiddleware, async (req, res) => {
    try {
        const block = await LegalBlock.findByPk(req.params.id)
        if (!block) return res.status(404).json({ error: 'Block not found' })
        await block.update(req.body)
        res.json(block)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

router.delete('/blocks/:id', authMiddleware, async (req, res) => {
    try {
        const block = await LegalBlock.findByPk(req.params.id)
        if (!block) return res.status(404).json({ error: 'Block not found' })
        await block.destroy()
        res.json({ message: 'Deleted' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// REORDER (bulk update order field)
router.put('/reorder/sections', authMiddleware, async (req, res) => {
    // req.body = [{ id, order }, { id, order }, ...]
    try {
        await Promise.all(req.body.map(({ id, order }) =>
            LegalSection.update({ order }, { where: { id } })
        ))
        res.json({ message: 'Reordered' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.put('/reorder/blocks', authMiddleware, async (req, res) => {
    try {
        await Promise.all(req.body.map(({ id, order }) =>
            LegalBlock.update({ order }, { where: { id } })
        ))
        res.json({ message: 'Reordered' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router