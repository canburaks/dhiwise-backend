/**
 * index.js
 * @description :: exports all the models and its relationships among other models
 */

const dbConnection = require('../config/dbConnection');
const db = {};
db.sequelize = dbConnection;

db.variant = require('./variant');
db.artist = require('./artist');
db.tag = require('./tag');
db.collection = require('./collection');
db.image = require('./image');
db.product = require('./product');
db.user = require('./user');
db.userAuthSettings = require('./userAuthSettings');
db.userTokens = require('./userTokens');
db.role = require('./role');
db.projectRoute = require('./projectRoute');
db.routeRole = require('./routeRole');
db.userRole = require('./userRole');

db.variant.belongsTo(db.product, {
  foreignKey: 'product',
  as: '_product',
  targetKey: 'handle' 
});
db.product.hasOne(db.variant, {
  foreignKey: 'product',
  sourceKey: 'handle' 
});
db.artist.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.artist, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.artist.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.artist, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.tag.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.tag, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.tag.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.tag, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.collection.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.collection, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.collection.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.collection, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.image.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.image, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.image.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.image, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.product.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.product, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.product.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.product, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.user.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.user, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.user.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.user, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.userAuthSettings.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasMany(db.userAuthSettings, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.userAuthSettings.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userAuthSettings, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.userAuthSettings.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userAuthSettings, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.userTokens.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasMany(db.userTokens, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.userTokens.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userTokens, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.userTokens.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userTokens, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.userRole.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasMany(db.userRole, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.routeRole.belongsTo(db.role, {
  foreignKey: 'roleId',
  as: '_roleId',
  targetKey: 'id' 
});
db.role.hasMany(db.routeRole, {
  foreignKey: 'roleId',
  sourceKey: 'id' 
});
db.userRole.belongsTo(db.role, {
  foreignKey: 'roleId',
  as: '_roleId',
  targetKey: 'id' 
});
db.role.hasMany(db.userRole, {
  foreignKey: 'roleId',
  sourceKey: 'id' 
});
db.routeRole.belongsTo(db.projectRoute, {
  foreignKey: 'routeId',
  as: '_routeId',
  targetKey: 'id' 
});
db.projectRoute.hasMany(db.routeRole, {
  foreignKey: 'routeId',
  sourceKey: 'id' 
});

module.exports = db;