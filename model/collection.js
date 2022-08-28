/**
 * collection.js
 * @description :: sequelize model of database table collection
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Collection = sequelize.define('collection',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  handle:{ type:DataTypes.STRING },
  title:{ type:DataTypes.STRING },
  metaTitle:{ type:DataTypes.STRING },
  description:{ type:DataTypes.STRING },
  metaDescription:{ type:DataTypes.STRING },
  body:{ type:DataTypes.STRING },
  isDeleted:{ type:DataTypes.BOOLEAN },
  isActive:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER }
}
,{
  hooks:{
    beforeCreate: [
      async function (collection,options){
        collection.isActive = true;
        collection.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (collection,options){
        if (collection !== undefined && collection.length) { 
          for (let index = 0; index < collection.length; index++) { 
        
            const element = collection[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Collection.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Collection);
sequelizePaginate.paginate(Collection);
module.exports = Collection;
