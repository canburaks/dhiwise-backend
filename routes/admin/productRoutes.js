/**
 * productRoutes.js
 * @description :: CRUD API routes for product
 */

const express = require('express');
const router = express.Router();
const productController = require('../../controller/admin/productController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
router.route('/admin/product/create').post(productController.addProduct);
router.route('/admin/product/list').post(productController.findAllProduct);
router.route('/admin/product/count').post(productController.getProductCount);
router.route('/admin/product/softDeleteMany').put(productController.softDeleteManyProduct);
router.route('/admin/product/addBulk').post(productController.bulkInsertProduct);
router.route('/admin/product/updateBulk').put(productController.bulkUpdateProduct);
router.route('/admin/product/deleteMany').post(productController.deleteManyProduct);
router.route('/admin/product/softDelete/:id').put(productController.softDeleteProduct);
router.route('/admin/product/partial-update/:id').put(productController.partialUpdateProduct);
router.route('/admin/product/update/:id').put(productController.updateProduct);    
router.route('/admin/product/:id').get(productController.getProduct);
router.route('/admin/product/delete/:id').delete(productController.deleteProduct);

module.exports = router;
