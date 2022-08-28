/**
 * index route file of desktop platform.
 * @description: exports all routes of desktop platform.
 */
const express =  require('express');
const router =  express.Router();
router.use('/desktop/auth',require('./auth'));
router.use(require('./variantRoutes'));
router.use(require('./artistRoutes'));
router.use(require('./tagRoutes'));
router.use(require('./collectionRoutes'));
router.use(require('./imageRoutes'));
router.use(require('./productRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
