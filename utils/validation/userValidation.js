/**
 * userValidation.js
 * @description :: validate each post and put request as per user model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

const { USER_TYPES } = require('../../constants/authConstant');
const { convertObjectToEnum } = require('../common');  
 
const authConstantDefault = require('../../constants/authConstant');    

/** validation keys and properties of user */
exports.schemaKeys = joi.object({
  password: joi.string().allow(null).allow(''),
  email: joi.string().required().case('lower'),
  name: joi.string().allow(null).allow(''),
  userType: joi.valid(...convertObjectToEnum(authConstantDefault.USER_TYPES)),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  mobileNo: joi.string().allow(null).allow(''),
  username: joi.string().allow(null).allow('')
}).unknown(true);

/** validation keys and properties of user for updation */
exports.updateSchemaKeys = joi.object({
  password: joi.string().allow(null).allow(''),
  email: joi.string().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }).case('lower'),
  name: joi.string().allow(null).allow(''),
  userType: joi.valid(...convertObjectToEnum(authConstantDefault.USER_TYPES)),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  mobileNo: joi.string().allow(null).allow(''),
  username: joi.string().allow(null).allow(''),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of user for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      password: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      email: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      mobileNo: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      username: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
