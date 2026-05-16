// server/models/LegalSection.js
const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const LegalSection = sequelize.define('LegalSection', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    categoryId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    parentId: {
        type: DataTypes.UUID,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
        // e.g. "Building a Community of Trust"
    },
    intro: {
        type: DataTypes.TEXT,
        allowNull: true
        // paragraph directly under the section title
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true
        // Lucide icon name e.g. "Users", "Shield", "FileText"
    },
    iconColor: {
        type: DataTypes.STRING,
        defaultValue: '#E85D8A'
        // hex color for the icon
    },
    bgColor: {
        type: DataTypes.STRING,
        defaultValue: '#FFF5F7'
        // card background hex e.g. "#FFF5F7" (pink), "#F0FFF4" (green)
    },
    order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'legal_sections',
    timestamps: true
})

module.exports = LegalSection