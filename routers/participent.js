const router = require("express").Router()
const Pariticepents = require("../controllers/participents.js")

router.route("/pariticepents")
      .get(Pariticepents.get)
      .post(Pariticepents.post)
      .put(Pariticepents.put)
      .delete(Pariticepents.delete)
router.route("/pariticepents/:id")
      .get(Pariticepents.get)
      .delete(Pariticepents.delete)

module.exports = router
