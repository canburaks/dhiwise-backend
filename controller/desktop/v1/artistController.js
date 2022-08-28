/**
 * artistController.js
 * @description :: exports action methods for artist.
 */

const Artist = require('../../../model/artist');
const artistSchemaKey = require('../../../utils/validation/artistValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Artist in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Artist. {status, message, data}
 */ 
const addArtist = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      artistSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Artist,[ 'handle' ],dataToCreate,'INSERT');
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let createdArtist = await dbService.createOne(Artist,dataToCreate);
    return  res.success({ data :createdArtist });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Artist in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Artists. {status, message, data}
 */
const bulkInsertArtist = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Artist,[ 'handle' ],dataToCreate,'BULK_INSERT');
      if (checkUniqueFields.isDuplicate){
        return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
      }
      let createdArtist = await dbService.createMany(Artist,dataToCreate); 
      return  res.success({ data :{ count :createdArtist.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Artist from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Artist(s). {status, message, data}
 */
const findAllArtist = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundArtist;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      artistSchemaKey.findFilterKeys,
      Artist.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundArtist = await dbService.count(Artist, query);
      if (!foundArtist) {
        return res.recordNotFound();
      } 
      foundArtist = { totalRecords: foundArtist };
      return res.success({ data :foundArtist });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundArtist = await dbService.paginate( Artist,query,options);
    if (!foundArtist){
      return res.recordNotFound();
    }
    return res.success({ data:foundArtist }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Artist from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Artist. {status, message, data}
 */
const getArtist = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundArtist = await dbService.findOne(Artist,{ id :id });
    if (!foundArtist){
      return res.recordNotFound();
    }
    return  res.success({ data :foundArtist });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Artist.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getArtistCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      artistSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedArtist = await dbService.count(Artist,where);
    if (!countedArtist){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedArtist } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Artist with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Artist.
 * @return {Object} : updated Artist. {status, message, data}
 */
const updateArtist = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    delete dataToUpdate.addedBy;
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      artistSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Artist,[ 'handle' ],dataToUpdate,'UPDATE', query);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedArtist = await dbService.update(Artist,query,dataToUpdate);
    return  res.success({ data :updatedArtist }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Artist with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Artists.
 * @return {Object} : updated Artists. {status, message, data}
 */
const bulkUpdateArtist = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Artist,[ 'handle' ],dataToUpdate,'BULK_UPDATE', filter);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedArtist = await dbService.update(Artist,filter,dataToUpdate);
    if (!updatedArtist){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedArtist.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Artist with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Artist.
 * @return {Object} : updated Artist. {status, message, data}
 */
const partialUpdateArtist = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      artistSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Artist,[ 'handle' ],dataToUpdate,'UPDATE', query);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedArtist = await dbService.update(Artist, query, dataToUpdate);
    if (!updatedArtist) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedArtist });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Artist from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Artist.
 * @return {Object} : deactivated Artist. {status, message, data}
 */
const softDeleteArtist = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Artist, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Artist from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Artist. {status, message, data}
 */
const deleteArtist = async (req, res) => {
  const result = await dbService.deleteByPk(Artist, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Artist in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyArtist = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedArtist = await dbService.destroy(Artist,query);
    return res.success({ data :{ count :deletedArtist.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Artist from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Artist.
 * @return {Object} : number of deactivated documents of Artist. {status, message, data}
 */
const softDeleteManyArtist = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    const options = {};
    let updatedArtist = await dbService.update(Artist,query,updateBody, options);
    if (!updatedArtist) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedArtist.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addArtist,
  bulkInsertArtist,
  findAllArtist,
  getArtist,
  getArtistCount,
  updateArtist,
  bulkUpdateArtist,
  partialUpdateArtist,
  softDeleteArtist,
  deleteArtist,
  deleteManyArtist,
  softDeleteManyArtist,
};
