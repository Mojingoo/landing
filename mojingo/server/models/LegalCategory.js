// server/models/LegalCategory.js
const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const LegalCategory = sequelize.define('LegalCategory', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    slug: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            isIn: [['security', 'terms', 'privacy', 'child-safety', 'cookies']]
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
        // e.g. "Security Policy & Safety Statement"
    },
    order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'legal_categories',
    timestamps: true
})

module.exports = LegalCategory