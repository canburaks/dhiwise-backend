/**
 * tag.js
 * @description :: sequelize model of database table tag
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Tag = sequelize.define('tag',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  handle:{
    type:DataTypes.STRING,
    unique:true,
    lowercase:true,
    validate:{ len:[2,64] },
    primaryKey:true,
    allowNull:false
  },
  name:{ type:DataTypes.STRING },
  title:{
    type:DataTypes.STRING,
    unique:false,
    lowercase:false,
    validate:{ len:[128] },
    primaryKey:false,
    allowNull:true
  },
  metaTitle:{
    type:DataTypes.STRING,
    unique:false,
    lowercase:false,
    validate:{ len:[96] },
    primaryKey:false,
    allowNull:true
  },
  description:{ type:DataTypes.STRING },
  metaDescription:{
    type:DataTypes.STRING,
    unique:false,
    lowercase:false,
    validate:{ len:[240] },
    primaryKey:false,
    allowNull:true
  },
  body:{ type:DataTypes.TEXT },
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
      async function (tag,options){
        tag.isActive = true;
        tag.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (tag,options){
        if (tag !== undefined && tag.length) { 
          for (let index = 0; index < tag.length; index++) { 
        
            const element = tag[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Tag.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Tag);
sequelizePaginate.paginate(Tag);
module.exports = Tag;
