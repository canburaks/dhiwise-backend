/**
 * collectionRoutes.js
 * @description :: CRUD API routes for collection
 */

const express = require('express');
const router = express.Router();
const collectionController = require('../../../controller/desktop/v1/collectionController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/desktop/api/v1/collection/create').post(auth(PLATFORM.DESKTOP),collectionController.addCollection);
router.route('/desktop/api/v1/collection/list').post(auth(PLATFORM.DESKTOP),collectionController.findAllCollection);
router.route('/desktop/api/v1/collection/count').post(auth(PLATFORM.DESKTOP),collectionController.getCollectionCount);
router.route('/desktop/api/v1/collection/softDeleteMany').put(auth(PLATFORM.DESKTOP),collectionController.softDeleteManyCollection);
router.route('/desktop/api/v1/collection/addBulk').post(auth(PLATFORM.DESKTOP),collectionController.bulkInsertCollection);
router.route('/desktop/api/v1/collection/updateBulk').put(auth(PLATFORM.DESKTOP),collectionController.bulkUpdateCollection);
router.route('/desktop/api/v1/collection/deleteMany').post(auth(PLATFORM.DESKTOP),collectionController.deleteManyCollection);
router.route('/desktop/api/v1/collection/softDelete/:id').put(auth(PLATFORM.DESKTOP),collectionController.softDeleteCollection);
router.route('/desktop/api/v1/collection/partial-update/:id').put(auth(PLATFORM.DESKTOP),collectionController.partialUpdateCollection);
router.route('/desktop/api/v1/collection/update/:id').put(auth(PLATFORM.DESKTOP),collectionController.updateCollection);    
router.route('/desktop/api/v1/collection/:id').get(auth(PLATFORM.DESKTOP),collectionController.getCollection);
router.route('/desktop/api/v1/collection/delete/:id').delete(auth(PLATFORM.DESKTOP),collectionController.deleteCollection);

module.exports = router;
