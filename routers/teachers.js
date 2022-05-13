const router = require('express').Router()
const Teachers = require('../controllers/teachers')
router.route('/teachers')
      .get(Teachers.get)
      .post(Teachers.post)
      .put(Teachers.put)
      .delete(Teachers.delete)
router.route('/teachers/:id')
      .get(Teachers.get)
      .delete(Teachers.delete)

module.exports = router
