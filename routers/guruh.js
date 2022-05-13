const router = require('express').Router()
const Guruh = require('../controllers/guruh')
router.route("/guruh")
      .get(Guruh.get)
      .post(Guruh.post)
      .put(Guruh.put)
      .delete(Guruh.delete)
router.route("/guruh/:id")
      .get(Guruh.get)
      .delete(Guruh.delete)
module.exports = router
// 13.48.137.108:5432
