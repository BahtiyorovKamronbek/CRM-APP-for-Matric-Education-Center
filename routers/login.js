const router = require('express').Router()
const Login = require('../controllers/login')
router.route('/login')
      .post(Login.login)

module.exports = router
