/**
 * tagController.js
 * @description :: exports action methods for tag.
 */

const Tag = require('../../model/tag');
const tagSchemaKey = require('../../utils/validation/tagValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Tag in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Tag. {status, message, data}
 */ 
const addTag = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      tagSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Tag,[ 'handle' ],dataToCreate,'INSERT');
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let createdTag = await dbService.createOne(Tag,dataToCreate);
    return  res.success({ data :createdTag });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Tag in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Tags. {status, message, data}
 */
const bulkInsertTag = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Tag,[ 'handle' ],dataToCreate,'BULK_INSERT');
      if (checkUniqueFields.isDuplicate){
        return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
      }
      let createdTag = await dbService.createMany(Tag,dataToCreate); 
      return  res.success({ data :{ count :createdTag.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Tag from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Tag(s). {status, message, data}
 */
const findAllTag = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundTag;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      tagSchemaKey.findFilterKeys,
      Tag.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundTag = await dbService.count(Tag, query);
      if (!foundTag) {
        return res.recordNotFound();
      } 
      foundTag = { totalRecords: foundTag };
      return res.success({ data :foundTag });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundTag = await dbService.paginate( Tag,query,options);
    if (!foundTag){
      return res.recordNotFound();
    }
    return res.success({ data:foundTag }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Tag from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Tag. {status, message, data}
 */
const getTag = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundTag = await dbService.findOne(Tag,{ id :id });
    if (!foundTag){
      return res.recordNotFound();
    }
    return  res.success({ data :foundTag });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Tag.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getTagCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      tagSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedTag = await dbService.count(Tag,where);
    if (!countedTag){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedTag } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Tag with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Tag.
 * @return {Object} : updated Tag. {status, message, data}
 */
const updateTag = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      tagSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Tag,[ 'handle' ],dataToUpdate,'UPDATE', query);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedTag = await dbService.update(Tag,query,dataToUpdate);
    return  res.success({ data :updatedTag }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Tag with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Tags.
 * @return {Object} : updated Tags. {status, message, data}
 */
const bulkUpdateTag = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {};
    }

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Tag,[ 'handle' ],dataToUpdate,'BULK_UPDATE', filter);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedTag = await dbService.update(Tag,filter,dataToUpdate);
    if (!updatedTag){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedTag.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Tag with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Tag.
 * @return {Object} : updated Tag. {status, message, data}
 */
const partialUpdateTag = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      tagSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Tag,[ 'handle' ],dataToUpdate,'UPDATE', query);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedTag = await dbService.update(Tag, query, dataToUpdate);
    if (!updatedTag) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedTag });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Tag from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Tag.
 * @return {Object} : deactivated Tag. {status, message, data}
 */
const softDeleteTag = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = { isDeleted: true, };
    let result = await dbService.update(Tag, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Tag from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Tag. {status, message, data}
 */
const deleteTag = async (req, res) => {
  const result = await dbService.deleteByPk(Tag, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Tag in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyTag = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedTag = await dbService.destroy(Tag,query);
    return res.success({ data :{ count :deletedTag.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Tag from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Tag.
 * @return {Object} : number of deactivated documents of Tag. {status, message, data}
 */
const softDeleteManyTag = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    const options = {};
    let updatedTag = await dbService.update(Tag,query,updateBody, options);
    if (!updatedTag) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedTag.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addTag,
  bulkInsertTag,
  findAllTag,
  getTag,
  getTagCount,
  updateTag,
  bulkUpdateTag,
  partialUpdateTag,
  softDeleteTag,
  deleteTag,
  deleteManyTag,
  softDeleteManyTag,
};
