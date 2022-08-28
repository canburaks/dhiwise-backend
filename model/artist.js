/**
 * artist.js
 * @description :: sequelize model of database table artist
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Artist = sequelize.define('artist',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  handle:{
    type:DataTypes.STRING,
    unique:true,
    lowercase:true,
    validate:{ len:[64] },
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
  born:{ type:DataTypes.DATE },
  died:{ type:DataTypes.DATE },
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
      async function (artist,options){
        artist.isActive = true;
        artist.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (artist,options){
        if (artist !== undefined && artist.length) { 
          for (let index = 0; index < artist.length; index++) { 
        
            const element = artist[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Artist.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Artist);
sequelizePaginate.paginate(Artist);
module.exports = Artist;
