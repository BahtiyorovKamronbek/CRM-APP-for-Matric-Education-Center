const router = require("express").Router()
const Tolov = require("../controllers/tolov.js")
router.route('/tolov')
      .post(Tolov.post)
      .get(Tolov.get)
      .put(Tolov.put)
      .delete(Tolov.delete)
router.route("/tolov/:id")
      .get(Tolov.get)
      .delete(Tolov.delete)

module.exports = router