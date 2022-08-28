/**
 * artistValidation.js
 * @description :: validate each post and put request as per artist model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of artist */
exports.schemaKeys = joi.object({
  handle: joi.string().required().case('lower'),
  name: joi.string().allow(null).allow(''),
  title: joi.string().max(128).allow(null).allow(''),
  metaTitle: joi.string().max(96).allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  metaDescription: joi.string().max(240).allow(null).allow(''),
  born: joi.date().options({ convert: true }).allow(null).allow(''),
  died: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of artist for updation */
exports.updateSchemaKeys = joi.object({
  handle: joi.string().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }).case('lower'),
  name: joi.string().allow(null).allow(''),
  title: joi.string().max(128).allow(null).allow(''),
  metaTitle: joi.string().max(96).allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  metaDescription: joi.string().max(240).allow(null).allow(''),
  born: joi.date().options({ convert: true }).allow(null).allow(''),
  died: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of artist for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      handle: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      title: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      metaTitle: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      metaDescription: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      born: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      died: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
