// server/models/BlogPost.js
const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const BlogPost = sequelize.define('BlogPost', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    excerpt: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    coverImage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true
    },
    author: {
        type: DataTypes.STRING,
        allowNull: true
    },
    published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'blog_posts',
    timestamps: true   // adds createdAt and updatedAt automatically
})

module.exports = BlogPost