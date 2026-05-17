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
    },
    metaDescription: {
        type: DataTypes.STRING(160),  // Google truncates at 160 chars
        allowNull: true
    },
    metaTitle: {
        type: DataTypes.STRING(60),   // Google truncates at 60 chars
        allowNull: true
    },
    contentImages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []              // stores uploaded image URLs used in content
    }

}, {
    tableName: 'blog_posts',
    timestamps: true   // adds createdAt and updatedAt automatically
})

module.exports = BlogPost
