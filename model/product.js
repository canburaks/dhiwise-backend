/**
 * product.js
 * @description :: sequelize model of database table product
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Product = sequelize.define('product',{
  id:{
    type:DataTypes.STRING,
    primaryKey:true
  },
  handle:{
    type:DataTypes.STRING,
    unique:true,
    lowercase:true,
    validate:{ len:[3,128] },
    primaryKey:true,
    allowNull:false
  },
  title:{
    type:DataTypes.STRING,
    unique:false,
    lowercase:false,
    validate:{ len:[3,128] },
    primaryKey:false,
    allowNull:true
  },
  metaTitle:{
    type:DataTypes.STRING,
    unique:false,
    lowercase:false,
    validate:{ len:[5,96] },
    primaryKey:false,
    allowNull:true
  },
  description:{
    type:DataTypes.STRING,
    unique:false,
    lowercase:false,
    validate:{ len:[10000] },
    primaryKey:false,
    allowNull:true
  },
  metaDescription:{
    type:DataTypes.STRING,
    unique:false,
    lowercase:false,
    validate:{ len:[255] },
    primaryKey:false,
    allowNull:true
  },
  body:{
    type:DataTypes.TEXT,
    unique:false,
    lowercase:false,
    primaryKey:false,
    allowNull:true
  },
  hasOnlyDefaultVariant:{
    type:DataTypes.BOOLEAN,
    defaultValue:false,
    allowNull:false,
    primaryKey:false
  },
  translations:{ type:DataTypes.STRING },
  options:{ type:DataTypes.ARRAY(DataTypes.STRING) },
  metafields:{ type:DataTypes.JSON },
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
      async function (product,options){
        product.isActive = true;
        product.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (product,options){
        if (product !== undefined && product.length) { 
          for (let index = 0; index < product.length; index++) { 
        
            const element = product[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Product.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Product);
sequelizePaginate.paginate(Product);
module.exports = Product;
