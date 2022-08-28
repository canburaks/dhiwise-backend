/**
 * imageRoutes.js
 * @description :: CRUD API routes for image
 */

const express = require('express');
const router = express.Router();
const imageController = require('../../controller/admin/imageController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
router.route('/admin/image/create').post(imageController.addImage);
router.route('/admin/image/list').post(imageController.findAllImage);
router.route('/admin/image/count').post(imageController.getImageCount);
router.route('/admin/image/softDeleteMany').put(imageController.softDeleteManyImage);
router.route('/admin/image/addBulk').post(imageController.bulkInsertImage);
router.route('/admin/image/updateBulk').put(imageController.bulkUpdateImage);
router.route('/admin/image/deleteMany').post(imageController.deleteManyImage);
router.route('/admin/image/softDelete/:id').put(imageController.softDeleteImage);
router.route('/admin/image/partial-update/:id').put(imageController.partialUpdateImage);
router.route('/admin/image/update/:id').put(imageController.updateImage);    
router.route('/admin/image/:id').get(imageController.getImage);
router.route('/admin/image/delete/:id').delete(imageController.deleteImage);

module.exports = router;
