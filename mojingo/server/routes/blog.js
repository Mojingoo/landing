const express = require('express')
const { BlogPost } = require('../models')
const protect = require('../middleware/authMiddleware')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const router = express.Router()

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'blog')
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp|svg/
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
        const mimetype = allowedTypes.test(file.mimetype) || file.mimetype === 'image/svg+xml'
        if (extname && mimetype) return cb(null, true)
        cb(new Error('Only images (jpeg, jpg, png, webp, svg) are allowed'))
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
})

// Multer error handling middleware
function handleUpload(req, res, next) {
    upload.single('coverImage')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.error('Multer error:', err)
            return res.status(400).json({ message: `Upload error: ${err.message}` })
        }
        if (err) {
            console.error('Upload error:', err)
            return res.status(400).json({ message: err.message })
        }
        next()
    })
}

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

router.get('/:slug', async (req, res) => {
    try {
        const post = await BlogPost.findOne({
            where: { slug: req.params.slug, published: true }
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
router.post('/', protect, handleUpload, async (req, res) => {
    try {
        const { title, slug, excerpt, content, category, author, published } = req.body
        let coverImage = req.body.coverImage // can be a string from frontend if no file uploaded

        if (req.file) {
            coverImage = `/uploads/blog/${req.file.filename}`
        }

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
            published: published === 'true' || published === true,
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
router.put('/:id', protect, handleUpload, async (req, res) => {
    try {
        const post = await BlogPost.findByPk(req.params.id)
        if (!post) return res.status(404).json({ message: 'Post not found' })

        const updateData = { ...req.body }

        if (req.file) {
            updateData.coverImage = `/uploads/blog/${req.file.filename}`
        }

        // Handle published boolean from FormData
        if (updateData.published !== undefined) {
            updateData.published = updateData.published === 'true' || updateData.published === true
        }

        await post.update(updateData)
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