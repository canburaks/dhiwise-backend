/**
 * imageRoutes.js
 * @description :: CRUD API routes for image
 */

const express = require('express');
const router = express.Router();
const imageController = require('../../../controller/desktop/v1/imageController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/desktop/api/v1/image/create').post(auth(PLATFORM.DESKTOP),imageController.addImage);
router.route('/desktop/api/v1/image/list').post(auth(PLATFORM.DESKTOP),imageController.findAllImage);
router.route('/desktop/api/v1/image/count').post(auth(PLATFORM.DESKTOP),imageController.getImageCount);
router.route('/desktop/api/v1/image/softDeleteMany').put(auth(PLATFORM.DESKTOP),imageController.softDeleteManyImage);
router.route('/desktop/api/v1/image/addBulk').post(auth(PLATFORM.DESKTOP),imageController.bulkInsertImage);
router.route('/desktop/api/v1/image/updateBulk').put(auth(PLATFORM.DESKTOP),imageController.bulkUpdateImage);
router.route('/desktop/api/v1/image/deleteMany').post(auth(PLATFORM.DESKTOP),imageController.deleteManyImage);
router.route('/desktop/api/v1/image/softDelete/:id').put(auth(PLATFORM.DESKTOP),imageController.softDeleteImage);
router.route('/desktop/api/v1/image/partial-update/:id').put(auth(PLATFORM.DESKTOP),imageController.partialUpdateImage);
router.route('/desktop/api/v1/image/update/:id').put(auth(PLATFORM.DESKTOP),imageController.updateImage);    
router.route('/desktop/api/v1/image/:id').get(auth(PLATFORM.DESKTOP),imageController.getImage);
router.route('/desktop/api/v1/image/delete/:id').delete(auth(PLATFORM.DESKTOP),imageController.deleteImage);

module.exports = router;
