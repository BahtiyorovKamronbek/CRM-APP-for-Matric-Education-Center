const router = require("express").Router()
const Info_From_Client = require('../controllers/info_from_client')
router.route('/info_from_client')
      .post( Info_From_Client.post_info_from_client )
      .get ( Info_From_Client.get_info_from_client )
      .delete( Info_From_Client.delete_info_from_client )
      
router.route('/info_from_client/:id')
      .get( Info_From_Client.get_info_from_client )
      .delete( Info_From_Client.delete_info_from_client )
module.exports = router
