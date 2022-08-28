/**
 * artistRoutes.js
 * @description :: CRUD API routes for artist
 */

const express = require('express');
const router = express.Router();
const artistController = require('../../controller/admin/artistController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
router.route('/admin/artist/create').post(artistController.addArtist);
router.route('/admin/artist/list').post(artistController.findAllArtist);
router.route('/admin/artist/count').post(artistController.getArtistCount);
router.route('/admin/artist/softDeleteMany').put(artistController.softDeleteManyArtist);
router.route('/admin/artist/addBulk').post(artistController.bulkInsertArtist);
router.route('/admin/artist/updateBulk').put(artistController.bulkUpdateArtist);
router.route('/admin/artist/deleteMany').post(artistController.deleteManyArtist);
router.route('/admin/artist/softDelete/:id').put(artistController.softDeleteArtist);
router.route('/admin/artist/partial-update/:id').put(artistController.partialUpdateArtist);
router.route('/admin/artist/update/:id').put(artistController.updateArtist);    
router.route('/admin/artist/:id').get(artistController.getArtist);
router.route('/admin/artist/delete/:id').delete(artistController.deleteArtist);

module.exports = router;
