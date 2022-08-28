/**
 * collectionController.js
 * @description :: exports action methods for collection.
 */

const Collection = require('../../model/collection');
const collectionSchemaKey = require('../../utils/validation/collectionValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Collection in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Collection. {status, message, data}
 */ 
const addCollection = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      collectionSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
        
    let createdCollection = await dbService.createOne(Collection,dataToCreate);
    return  res.success({ data :createdCollection });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Collection in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Collections. {status, message, data}
 */
const bulkInsertCollection = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      let createdCollection = await dbService.createMany(Collection,dataToCreate); 
      return  res.success({ data :{ count :createdCollection.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Collection from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Collection(s). {status, message, data}
 */
const findAllCollection = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundCollection;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      collectionSchemaKey.findFilterKeys,
      Collection.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundCollection = await dbService.count(Collection, query);
      if (!foundCollection) {
        return res.recordNotFound();
      } 
      foundCollection = { totalRecords: foundCollection };
      return res.success({ data :foundCollection });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundCollection = await dbService.paginate( Collection,query,options);
    if (!foundCollection){
      return res.recordNotFound();
    }
    return res.success({ data:foundCollection }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Collection from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Collection. {status, message, data}
 */
const getCollection = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundCollection = await dbService.findOne(Collection,{ id :id });
    if (!foundCollection){
      return res.recordNotFound();
    }
    return  res.success({ data :foundCollection });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Collection.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getCollectionCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      collectionSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedCollection = await dbService.count(Collection,where);
    if (!countedCollection){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedCollection } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Collection with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Collection.
 * @return {Object} : updated Collection. {status, message, data}
 */
const updateCollection = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      collectionSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedCollection = await dbService.update(Collection,query,dataToUpdate);
    return  res.success({ data :updatedCollection }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Collection with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Collections.
 * @return {Object} : updated Collections. {status, message, data}
 */
const bulkUpdateCollection = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {};
    }
    let updatedCollection = await dbService.update(Collection,filter,dataToUpdate);
    if (!updatedCollection){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedCollection.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Collection with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Collection.
 * @return {Object} : updated Collection. {status, message, data}
 */
const partialUpdateCollection = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      collectionSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedCollection = await dbService.update(Collection, query, dataToUpdate);
    if (!updatedCollection) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedCollection });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Collection from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Collection.
 * @return {Object} : deactivated Collection. {status, message, data}
 */
const softDeleteCollection = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = { isDeleted: true, };
    let result = await dbService.update(Collection, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Collection from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Collection. {status, message, data}
 */
const deleteCollection = async (req, res) => {
  const result = await dbService.deleteByPk(Collection, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Collection in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyCollection = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedCollection = await dbService.destroy(Collection,query);
    return res.success({ data :{ count :deletedCollection.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Collection from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Collection.
 * @return {Object} : number of deactivated documents of Collection. {status, message, data}
 */
const softDeleteManyCollection = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    const options = {};
    let updatedCollection = await dbService.update(Collection,query,updateBody, options);
    if (!updatedCollection) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedCollection.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addCollection,
  bulkInsertCollection,
  findAllCollection,
  getCollection,
  getCollectionCount,
  updateCollection,
  bulkUpdateCollection,
  partialUpdateCollection,
  softDeleteCollection,
  deleteCollection,
  deleteManyCollection,
  softDeleteManyCollection,
};
