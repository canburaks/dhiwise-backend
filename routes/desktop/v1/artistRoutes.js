/**
 * artistRoutes.js
 * @description :: CRUD API routes for artist
 */

const express = require('express');
const router = express.Router();
const artistController = require('../../../controller/desktop/v1/artistController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/desktop/api/v1/artist/create').post(auth(PLATFORM.DESKTOP),artistController.addArtist);
router.route('/desktop/api/v1/artist/list').post(auth(PLATFORM.DESKTOP),artistController.findAllArtist);
router.route('/desktop/api/v1/artist/count').post(auth(PLATFORM.DESKTOP),artistController.getArtistCount);
router.route('/desktop/api/v1/artist/softDeleteMany').put(auth(PLATFORM.DESKTOP),artistController.softDeleteManyArtist);
router.route('/desktop/api/v1/artist/addBulk').post(auth(PLATFORM.DESKTOP),artistController.bulkInsertArtist);
router.route('/desktop/api/v1/artist/updateBulk').put(auth(PLATFORM.DESKTOP),artistController.bulkUpdateArtist);
router.route('/desktop/api/v1/artist/deleteMany').post(auth(PLATFORM.DESKTOP),artistController.deleteManyArtist);
router.route('/desktop/api/v1/artist/softDelete/:id').put(auth(PLATFORM.DESKTOP),artistController.softDeleteArtist);
router.route('/desktop/api/v1/artist/partial-update/:id').put(auth(PLATFORM.DESKTOP),artistController.partialUpdateArtist);
router.route('/desktop/api/v1/artist/update/:id').put(auth(PLATFORM.DESKTOP),artistController.updateArtist);    
router.route('/desktop/api/v1/artist/:id').get(auth(PLATFORM.DESKTOP),artistController.getArtist);
router.route('/desktop/api/v1/artist/delete/:id').delete(auth(PLATFORM.DESKTOP),artistController.deleteArtist);

module.exports = router;
