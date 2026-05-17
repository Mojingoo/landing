const express = require('express')
const { BlogPost } = require('../models')
const protect = require('../middleware/auth')
const router = express.Router()

// ─────────────────────────────────────────────────────
// PUBLIC — Get all published posts, newest first
// GET /api/blog
// ─────────────────────────────────────────────────────
router.get('/', async (req, res) => {
    try {
        const where = { published: true }
        const { category } = req.query
        if (category && category !== 'all') where.category = category

        const posts = await BlogPost.findAll({
            where,
            order: [['createdAt', 'DESC']],
        })
        res.json(posts)
    } catch (err) {
        console.error('Get blog posts error:', err)
        res.status(500).json({ message: 'Server error' })
    }
})

// ─────────────────────────────────────────────────────
// PRIVATE — Get all posts including drafts (admin)
// GET /api/blog/admin/all
// NOTE: This MUST come before /:slug to avoid route conflict
// ─────────────────────────────────────────────────────
router.get('/admin/all', protect, async (req, res) => {
    try {
        const posts = await BlogPost.findAll({
            order: [['createdAt', 'DESC']],
        })
        res.json(posts)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

// ─────────────────────────────────────────────────────
// PUBLIC — Get single post by slug
// GET /api/blog/:slug
// ─────────────────────────────────────────────────────
router.get('/:slug', async (req, res) => {
    try {
        const post = await BlogPost.findOne({
            where: { slug: req.params.slug, published: true },
        })
        if (!post) return res.status(404).json({ message: 'Post not found' })
        res.json(post)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

// ─────────────────────────────────────────────────────
// PRIVATE — Create post
// POST /api/blog
// ─────────────────────────────────────────────────────
router.post('/', protect, async (req, res) => {
    try {
        const { title, slug, excerpt, content, coverImage, category, author, published } = req.body

        if (!title || !slug || !content) {
            return res.status(400).json({ message: 'Title, slug and content are required' })
        }

        const post = await BlogPost.create({
            title,
            slug,
            excerpt,
            content,
            coverImage,
            category,
            author,
            published: published || false,
        })

        res.status(201).json(post)
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Slug already exists — choose a different one' })
        }
        console.error('Create post error:', err)
        res.status(500).json({ message: 'Server error' })
    }
})

// ─────────────────────────────────────────────────────
// PRIVATE — Update post
// PUT /api/blog/:id
// ─────────────────────────────────────────────────────
router.put('/:id', protect, async (req, res) => {
    try {
        const post = await BlogPost.findByPk(req.params.id)
        if (!post) return res.status(404).json({ message: 'Post not found' })
        await post.update(req.body)
        res.json(post)
    } catch (err) {
        console.error('Update post error:', err)
        res.status(500).json({ message: 'Server error' })
    }
})

// ─────────────────────────────────────────────────────
// PRIVATE — Delete post
// DELETE /api/blog/:id
// ─────────────────────────────────────────────────────
router.delete('/:id', protect, async (req, res) => {
    try {
        const post = await BlogPost.findByPk(req.params.id)
        if (!post) return res.status(404).json({ message: 'Post not found' })
        await post.destroy()
        res.json({ message: 'Deleted successfully' })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

module.exports = router