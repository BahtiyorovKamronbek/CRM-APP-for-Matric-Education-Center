const router = require("express").Router()
const AnonymChat = require("../controllers/anonym_chat")
const { route } = require("./student")

router.route("/chat")
      .post(AnonymChat.post)
      .get(AnonymChat.get)
      .delete(AnonymChat.delete)
router.route("chat/:id")
      .get(AnonymChat.get)
      .delete(AnonymChat.delete)


module.exports = router

// freetuts.download