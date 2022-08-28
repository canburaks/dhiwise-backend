/**
 * variant.js
 * @description :: sequelize model of database table variant
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Variant = sequelize.define('variant',{
  id:{
    type:DataTypes.STRING,
    primaryKey:true
  },
  sku:{
    type:DataTypes.STRING,
    unique:true,
    lowercase:false,
    primaryKey:false,
    allowNull:true
  },
  title:{ type:DataTypes.STRING },
  quantity:{ type:DataTypes.INTEGER },
  price:{ type:DataTypes.FLOAT },
  isDeleted:{ type:DataTypes.BOOLEAN },
  isActive:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  product:{ type:DataTypes.STRING }
}
,{
  hooks:{
    beforeCreate: [
      async function (variant,options){
        variant.isActive = true;
        variant.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (variant,options){
        if (variant !== undefined && variant.length) { 
          for (let index = 0; index < variant.length; index++) { 
        
            const element = variant[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Variant.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  delete values.sku;
  return values;
};
sequelizeTransforms(Variant);
sequelizePaginate.paginate(Variant);
module.exports = Variant;
