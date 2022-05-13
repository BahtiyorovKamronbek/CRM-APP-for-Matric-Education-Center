const router = require("express").Router()
const Paid = require("../controllers/paid")
router.route("/paid")
      .post(Paid.post)
      .get(Paid.get)
      .put(Paid.put)
      .delete(Paid.delete)
router.route("/paid/:id")
      .get(Paid.get)
      .delete(Paid.delete)

module.exports = router
