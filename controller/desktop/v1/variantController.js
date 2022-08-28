/**
 * variantController.js
 * @description :: exports action methods for variant.
 */

const Variant = require('../../../model/variant');
const variantSchemaKey = require('../../../utils/validation/variantValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Variant in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Variant. {status, message, data}
 */ 
const addVariant = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      variantSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Variant,[ 'sku' ],dataToCreate,'INSERT');
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let createdVariant = await dbService.createOne(Variant,dataToCreate);
    return  res.success({ data :createdVariant });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Variant in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Variants. {status, message, data}
 */
const bulkInsertVariant = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Variant,[ 'sku' ],dataToCreate,'BULK_INSERT');
      if (checkUniqueFields.isDuplicate){
        return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
      }
      let createdVariant = await dbService.createMany(Variant,dataToCreate); 
      return  res.success({ data :{ count :createdVariant.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Variant from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Variant(s). {status, message, data}
 */
const findAllVariant = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundVariant;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      variantSchemaKey.findFilterKeys,
      Variant.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundVariant = await dbService.count(Variant, query);
      if (!foundVariant) {
        return res.recordNotFound();
      } 
      foundVariant = { totalRecords: foundVariant };
      return res.success({ data :foundVariant });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundVariant = await dbService.paginate( Variant,query,options);
    if (!foundVariant){
      return res.recordNotFound();
    }
    return res.success({ data:foundVariant }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Variant from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Variant. {status, message, data}
 */
const getVariant = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundVariant = await dbService.findOne(Variant,{ id :id });
    if (!foundVariant){
      return res.recordNotFound();
    }
    return  res.success({ data :foundVariant });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Variant.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getVariantCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      variantSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedVariant = await dbService.count(Variant,where);
    if (!countedVariant){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedVariant } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Variant with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Variant.
 * @return {Object} : updated Variant. {status, message, data}
 */
const updateVariant = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      variantSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Variant,[ 'sku' ],dataToUpdate,'UPDATE', query);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedVariant = await dbService.update(Variant,query,dataToUpdate);
    return  res.success({ data :updatedVariant }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Variant with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Variants.
 * @return {Object} : updated Variants. {status, message, data}
 */
const bulkUpdateVariant = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {};
    }

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Variant,[ 'sku' ],dataToUpdate,'BULK_UPDATE', filter);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedVariant = await dbService.update(Variant,filter,dataToUpdate);
    if (!updatedVariant){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedVariant.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Variant with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Variant.
 * @return {Object} : updated Variant. {status, message, data}
 */
const partialUpdateVariant = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      variantSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Variant,[ 'sku' ],dataToUpdate,'UPDATE', query);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedVariant = await dbService.update(Variant, query, dataToUpdate);
    if (!updatedVariant) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedVariant });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Variant from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Variant.
 * @return {Object} : deactivated Variant. {status, message, data}
 */
const softDeleteVariant = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = { isDeleted: true, };
    let result = await dbService.update(Variant, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Variant from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Variant. {status, message, data}
 */
const deleteVariant = async (req, res) => {
  const result = await dbService.deleteByPk(Variant, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Variant in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyVariant = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedVariant = await dbService.destroy(Variant,query);
    return res.success({ data :{ count :deletedVariant.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Variant from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Variant.
 * @return {Object} : number of deactivated documents of Variant. {status, message, data}
 */
const softDeleteManyVariant = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    const options = {};
    let updatedVariant = await dbService.update(Variant,query,updateBody, options);
    if (!updatedVariant) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedVariant.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addVariant,
  bulkInsertVariant,
  findAllVariant,
  getVariant,
  getVariantCount,
  updateVariant,
  bulkUpdateVariant,
  partialUpdateVariant,
  softDeleteVariant,
  deleteVariant,
  deleteManyVariant,
  softDeleteManyVariant,
};
