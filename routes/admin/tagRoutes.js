/**
 * tagRoutes.js
 * @description :: CRUD API routes for tag
 */

const express = require('express');
const router = express.Router();
const tagController = require('../../controller/admin/tagController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
router.route('/admin/tag/create').post(tagController.addTag);
router.route('/admin/tag/list').post(tagController.findAllTag);
router.route('/admin/tag/count').post(tagController.getTagCount);
router.route('/admin/tag/softDeleteMany').put(tagController.softDeleteManyTag);
router.route('/admin/tag/addBulk').post(tagController.bulkInsertTag);
router.route('/admin/tag/updateBulk').put(tagController.bulkUpdateTag);
router.route('/admin/tag/deleteMany').post(tagController.deleteManyTag);
router.route('/admin/tag/softDelete/:id').put(tagController.softDeleteTag);
router.route('/admin/tag/partial-update/:id').put(tagController.partialUpdateTag);
router.route('/admin/tag/update/:id').put(tagController.updateTag);    
router.route('/admin/tag/:id').get(tagController.getTag);
router.route('/admin/tag/delete/:id').delete(tagController.deleteTag);

module.exports = router;
