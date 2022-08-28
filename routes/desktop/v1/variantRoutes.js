/**
 * variantRoutes.js
 * @description :: CRUD API routes for variant
 */

const express = require('express');
const router = express.Router();
const variantController = require('../../../controller/desktop/v1/variantController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/desktop/api/v1/variant/create').post(auth(PLATFORM.DESKTOP),variantController.addVariant);
router.route('/desktop/api/v1/variant/list').post(auth(PLATFORM.DESKTOP),variantController.findAllVariant);
router.route('/desktop/api/v1/variant/count').post(auth(PLATFORM.DESKTOP),variantController.getVariantCount);
router.route('/desktop/api/v1/variant/softDeleteMany').put(auth(PLATFORM.DESKTOP),variantController.softDeleteManyVariant);
router.route('/desktop/api/v1/variant/addBulk').post(auth(PLATFORM.DESKTOP),variantController.bulkInsertVariant);
router.route('/desktop/api/v1/variant/updateBulk').put(auth(PLATFORM.DESKTOP),variantController.bulkUpdateVariant);
router.route('/desktop/api/v1/variant/deleteMany').post(auth(PLATFORM.DESKTOP),variantController.deleteManyVariant);
router.route('/desktop/api/v1/variant/softDelete/:id').put(auth(PLATFORM.DESKTOP),variantController.softDeleteVariant);
router.route('/desktop/api/v1/variant/partial-update/:id').put(auth(PLATFORM.DESKTOP),variantController.partialUpdateVariant);
router.route('/desktop/api/v1/variant/update/:id').put(auth(PLATFORM.DESKTOP),variantController.updateVariant);    
router.route('/desktop/api/v1/variant/:id').get(auth(PLATFORM.DESKTOP),variantController.getVariant);
router.route('/desktop/api/v1/variant/delete/:id').delete(auth(PLATFORM.DESKTOP),variantController.deleteVariant);

module.exports = router;
