require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const bcrypt = require('bcryptjs')
const { sequelize, Admin } = require('../models')

const EMAIL = 'info@mojingo.co'
const PASSWORD = 'Mojingo@2026*'

async function run() {
    try {
        await sequelize.authenticate()
        console.log('✅ Database connected')

        await sequelize.sync()
        console.log('✅ Tables synced')

        const existing = await Admin.findOne({ where: { email: EMAIL } })
        if (existing) {
            console.log('⚠️  Admin already exists:', EMAIL)
            return process.exit(0)
        }

        const hashed = await bcrypt.hash(PASSWORD, 12)
        await Admin.create({ email: EMAIL, password: hashed })

        console.log('✅ Admin created successfully')
        console.log('   Email:', EMAIL)
        console.log('   Login at: http://localhost:5173/admin/login')
        process.exit(0)
    } catch (err) {
        console.error('❌ Error creating admin:', err.message)
        process.exit(1)
    }
}

run()