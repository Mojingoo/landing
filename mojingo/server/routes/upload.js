// server/routes/upload.js
const express = require('express')
const router = express.Router()
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const authMiddleware = require('../middleware/auth')

// configure cloudinary in .env:
// CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET

const storage = multer.memoryStorage()
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }) // 5MB limit

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// POST /api/upload/image
// Returns the hosted image URL — used by TipTap editor
router.post('/image', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'mojingo/blog' },
                (err, result) => err ? reject(err) : resolve(result)
            )
            stream.end(req.file.buffer)
        })
        res.json({ url: result.secure_url })
    } catch (err) {
        res.status(500).json({ error: 'Image upload failed' })
    }
})

module.exports = router