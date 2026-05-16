// server/models/LegalBlock.js
const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const LegalBlock = sequelize.define('LegalBlock', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    sectionId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
        // e.g. "Mandatory Profile Verification"
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true
        // Lucide icon name e.g. "UserCheck", "MessageSquare"
    },
    iconColor: {
        type: DataTypes.STRING,
        defaultValue: '#E85D8A'
    },
    type: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            isIn: [['paragraph', 'bullets', 'table', 'contact']]
        }
    },
    content: {
        type: DataTypes.JSONB,
        allowNull: false
        // shape varies by type — see JSONB Schemas below
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
    tableName: 'legal_blocks',
    timestamps: true
})

module.exports = LegalBlock