const express = require('express')
const { BlogPost } = require('../models')
const protect = require('../middleware/authMiddleware') // <-- Fixed import!
const router = express.Router()
const multer = require('multer')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Setup Multer (Memory Storage)
const storage = multer.memoryStorage()
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
        fieldSize: 25 * 1024 * 1024  // 25MB limit for text fields (Fixes the large HTML issue!)
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true)
        else cb(new Error('Only image files allowed'))
    }
})

// Helper — upload buffer to Cloudinary, returns secure HTTPS URL
async function uploadToCloudinary(buffer) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'mojingo/blog' },
            (err, result) => err ? reject(err) : resolve(result.secure_url)
        )
        stream.end(buffer)
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

// ─────────────────────────────────────────────────────
// PRIVATE — Create post
// POST /api/blog
// ─────────────────────────────────────────────────────
router.post('/', protect, upload.single('coverImage'), async (req, res) => {
    try {
        const { title, slug, excerpt, content, category, author, published } = req.body

        if (!title || !slug || !content) {
            return res.status(400).json({ message: 'Title, slug and content are required' })
        }

        // If file uploaded → send to Cloudinary, else use URL string from body
        let coverImage = req.body.coverImage || ''
        if (req.file) {
            coverImage = await uploadToCloudinary(req.file.buffer)
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
        console.error('Create post error:', err)
        res.status(500).json({ message: 'Server Error' })
    }
})


// ─────────────────────────────────────────────────────
// PRIVATE — Update post
// PUT /api/blog/:id
// ─────────────────────────────────────────────────────
router.put('/:id', protect, upload.single('coverImage'), async (req, res) => {
    try {
        const post = await BlogPost.findByPk(req.params.id)
        if (!post) return res.status(404).json({ message: 'Post not found' })

        const updateData = { ...req.body }

        // If new file uploaded → send to Cloudinary
        if (req.file) {
            updateData.coverImage = await uploadToCloudinary(req.file.buffer)
        }
        // If no file and no coverImage string in body → keep existing
        else if (!updateData.coverImage) {
            updateData.coverImage = post.coverImage
        }

        // Handle published boolean coming as string from FormData
        if (updateData.published !== undefined) {
            updateData.published = updateData.published === 'true' || updateData.published === true
        }

        await post.update(updateData)
        res.json(post)
    } catch (err) {
        console.error('Update post error:', err)
        res.status(500).json({ message: 'Server Error' })
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