/**
 * tagRoutes.js
 * @description :: CRUD API routes for tag
 */

const express = require('express');
const router = express.Router();
const tagController = require('../../../controller/desktop/v1/tagController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/desktop/api/v1/tag/create').post(auth(PLATFORM.DESKTOP),tagController.addTag);
router.route('/desktop/api/v1/tag/list').post(auth(PLATFORM.DESKTOP),tagController.findAllTag);
router.route('/desktop/api/v1/tag/count').post(auth(PLATFORM.DESKTOP),tagController.getTagCount);
router.route('/desktop/api/v1/tag/softDeleteMany').put(auth(PLATFORM.DESKTOP),tagController.softDeleteManyTag);
router.route('/desktop/api/v1/tag/addBulk').post(auth(PLATFORM.DESKTOP),tagController.bulkInsertTag);
router.route('/desktop/api/v1/tag/updateBulk').put(auth(PLATFORM.DESKTOP),tagController.bulkUpdateTag);
router.route('/desktop/api/v1/tag/deleteMany').post(auth(PLATFORM.DESKTOP),tagController.deleteManyTag);
router.route('/desktop/api/v1/tag/softDelete/:id').put(auth(PLATFORM.DESKTOP),tagController.softDeleteTag);
router.route('/desktop/api/v1/tag/partial-update/:id').put(auth(PLATFORM.DESKTOP),tagController.partialUpdateTag);
router.route('/desktop/api/v1/tag/update/:id').put(auth(PLATFORM.DESKTOP),tagController.updateTag);    
router.route('/desktop/api/v1/tag/:id').get(auth(PLATFORM.DESKTOP),tagController.getTag);
router.route('/desktop/api/v1/tag/delete/:id').delete(auth(PLATFORM.DESKTOP),tagController.deleteTag);

module.exports = router;
