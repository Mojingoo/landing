// server/models/index.js
const sequelize = require('../config/db')
const Admin = require('./Admin')
const BlogPost = require('./BlogPost')
const Contact = require('./Contact')
const LegalCategory = require('./LegalCategory')
const LegalSection = require('./LegalSection')
const LegalBlock = require('./LegalBlock')

// Legal associations
LegalCategory.hasMany(LegalSection, { foreignKey: 'categoryId', as: 'sections' })
LegalSection.belongsTo(LegalCategory, { foreignKey: 'categoryId', as: 'category' })

LegalSection.hasMany(LegalSection, { foreignKey: 'parentId', as: 'subSections' })
LegalSection.belongsTo(LegalSection, { foreignKey: 'parentId', as: 'parent' })

LegalSection.hasMany(LegalBlock, { foreignKey: 'sectionId', as: 'blocks' })
LegalBlock.belongsTo(LegalSection, { foreignKey: 'sectionId', as: 'section' })

module.exports = {
    sequelize,
    Admin,
    BlogPost,
    Contact,
    LegalCategory,
    LegalSection,
    LegalBlock
}