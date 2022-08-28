/**
 * imageValidation.js
 * @description :: validate each post and put request as per image model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of image */
exports.schemaKeys = joi.object({
  height: joi.number().integer().allow(0),
  width: joi.number().integer().allow(0),
  altText: joi.string().allow(null).allow(''),
  src: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of image for updation */
exports.updateSchemaKeys = joi.object({
  height: joi.number().integer().allow(0),
  width: joi.number().integer().allow(0),
  altText: joi.string().allow(null).allow(''),
  src: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of image for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      height: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      width: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      altText: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      src: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
