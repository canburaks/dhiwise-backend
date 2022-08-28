/**
 * collectionRoutes.js
 * @description :: CRUD API routes for collection
 */

const express = require('express');
const router = express.Router();
const collectionController = require('../../controller/admin/collectionController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
router.route('/admin/collection/create').post(collectionController.addCollection);
router.route('/admin/collection/list').post(collectionController.findAllCollection);
router.route('/admin/collection/count').post(collectionController.getCollectionCount);
router.route('/admin/collection/softDeleteMany').put(collectionController.softDeleteManyCollection);
router.route('/admin/collection/addBulk').post(collectionController.bulkInsertCollection);
router.route('/admin/collection/updateBulk').put(collectionController.bulkUpdateCollection);
router.route('/admin/collection/deleteMany').post(collectionController.deleteManyCollection);
router.route('/admin/collection/softDelete/:id').put(collectionController.softDeleteCollection);
router.route('/admin/collection/partial-update/:id').put(collectionController.partialUpdateCollection);
router.route('/admin/collection/update/:id').put(collectionController.updateCollection);    
router.route('/admin/collection/:id').get(collectionController.getCollection);
router.route('/admin/collection/delete/:id').delete(collectionController.deleteCollection);

module.exports = router;
