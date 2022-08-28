/**
 * variantValidation.js
 * @description :: validate each post and put request as per variant model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of variant */
exports.schemaKeys = joi.object({
  sku: joi.string().allow(null).allow(''),
  title: joi.string().allow(null).allow(''),
  quantity: joi.number().integer().allow(0),
  price: joi.number().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  product: joi.string().allow(null).allow('')
}).unknown(true);

/** validation keys and properties of variant for updation */
exports.updateSchemaKeys = joi.object({
  sku: joi.string().allow(null).allow(''),
  title: joi.string().allow(null).allow(''),
  quantity: joi.number().integer().allow(0),
  price: joi.number().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  product: joi.string().allow(null).allow(''),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of variant for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      sku: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      title: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      quantity: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      price: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      product: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
