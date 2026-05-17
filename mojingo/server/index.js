const express = require('express')
const cors = require('cors')
require('dotenv').config()

const sequelize = require('./config/db')
const app = express()

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json())
app.use('/uploads', express.static('uploads'))

//Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))
app.use('/api/blog', require('./routes/blog'))
app.use('/api/legal', require('./routes/legal'))
app.use('/api/upload', require('./routes/upload'))

//Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

//Start
const { LegalCategory } = require('./models')

const LEGAL_CATEGORIES = [
    { slug: 'security', title: 'Security Policy & Safety Statement', order: 1 },
    { slug: 'terms', title: 'Terms of Service', order: 2 },
    { slug: 'privacy', title: 'Privacy Policy', order: 3 },
    { slug: 'child-safety', title: 'Child Safety Policy', order: 4 },
    { slug: 'cookies', title: 'Cookies Policy', order: 5 },
]

const PORT = process.env.PORT || 5000

sequelize
    .authenticate()
    .then(async () => {
        console.log('✅ PostgreSQL connected — AWS RDS')


        try {
            await sequelize.sync({ alter: true })
            console.log('✅ All tables synced')
        } catch (syncErr) {
            console.warn('⚠️  sync({ alter: true }) failed:', syncErr.message)
            console.log('   Retrying with force-safe sync...')
            // Fall back to a basic sync that only creates missing tables/columns
            await sequelize.sync()
            console.log('✅ Tables synced (basic mode)')
        }

        // Seed fixed legal categories (idempotent — safe to run every time)
        for (const cat of LEGAL_CATEGORIES) {
            const [record, created] = await LegalCategory.findOrCreate({ where: { slug: cat.slug }, defaults: cat })
            // Update order if it changed (e.g. new category inserted in the middle)
            if (!created && record.order !== cat.order) {
                await record.update({ order: cat.order })
            }
        }
        console.log('✅ Legal categories seeded')

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`✅ Server running on ${PORT}`)
        })
    })
    .catch(err => {
        console.error('❌ Failed to connect to database:', err.message)
        process.exit(1)
    })