/**
 * image.js
 * @description :: sequelize model of database table image
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Image = sequelize.define('image',{
  id:{
    type:DataTypes.STRING,
    primaryKey:true
  },
  height:{ type:DataTypes.INTEGER },
  width:{ type:DataTypes.INTEGER },
  altText:{ type:DataTypes.STRING },
  src:{ type:DataTypes.STRING },
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
      async function (image,options){
        image.isActive = true;
        image.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (image,options){
        if (image !== undefined && image.length) { 
          for (let index = 0; index < image.length; index++) { 
        
            const element = image[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Image.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Image);
sequelizePaginate.paginate(Image);
module.exports = Image;
