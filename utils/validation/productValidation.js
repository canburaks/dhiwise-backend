/**
 * productValidation.js
 * @description :: validate each post and put request as per product model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of product */
exports.schemaKeys = joi.object({
  handle: joi.string().required().case('lower'),
  title: joi.string().min(3).max(128).allow(null).allow(''),
  metaTitle: joi.string().min(5).max(96).allow(null).allow(''),
  description: joi.string().max(10000).allow(null).allow(''),
  metaDescription: joi.string().max(255).allow(null).allow(''),
  body: joi.any(),
  hasOnlyDefaultVariant: joi.boolean().required(),
  translations: joi.string().allow(null).allow(''),
  options: joi.any(),
  metafields: joi.object(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of product for updation */
exports.updateSchemaKeys = joi.object({
  handle: joi.string().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }).case('lower'),
  title: joi.string().min(3).max(128).allow(null).allow(''),
  metaTitle: joi.string().min(5).max(96).allow(null).allow(''),
  description: joi.string().max(10000).allow(null).allow(''),
  metaDescription: joi.string().max(255).allow(null).allow(''),
  body: joi.any(),
  hasOnlyDefaultVariant: joi.boolean().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  translations: joi.string().allow(null).allow(''),
  options: joi.any(),
  metafields: joi.object(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of product for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      handle: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      title: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      metaTitle: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      metaDescription: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      body: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      hasOnlyDefaultVariant: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      translations: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      options: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      metafields: joi.alternatives().try(joi.array().items(),joi.object(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
