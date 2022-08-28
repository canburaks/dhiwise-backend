/**
 * variantRoutes.js
 * @description :: CRUD API routes for variant
 */

const express = require('express');
const router = express.Router();
const variantController = require('../../controller/admin/variantController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
router.route('/admin/variant/create').post(variantController.addVariant);
router.route('/admin/variant/list').post(variantController.findAllVariant);
router.route('/admin/variant/count').post(variantController.getVariantCount);
router.route('/admin/variant/softDeleteMany').put(variantController.softDeleteManyVariant);
router.route('/admin/variant/addBulk').post(variantController.bulkInsertVariant);
router.route('/admin/variant/updateBulk').put(variantController.bulkUpdateVariant);
router.route('/admin/variant/deleteMany').post(variantController.deleteManyVariant);
router.route('/admin/variant/softDelete/:id').put(variantController.softDeleteVariant);
router.route('/admin/variant/partial-update/:id').put(variantController.partialUpdateVariant);
router.route('/admin/variant/update/:id').put(variantController.updateVariant);    
router.route('/admin/variant/:id').get(variantController.getVariant);
router.route('/admin/variant/delete/:id').delete(variantController.deleteVariant);

module.exports = router;
