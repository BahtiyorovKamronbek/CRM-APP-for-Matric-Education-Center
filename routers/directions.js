const router = require('express').Router()
const Directions = require('../controllers/direction')
router.route('/directions')
      .get(Directions.get)
      .put(Directions.put)
      .post(Directions.post)
      .delete(Directions.delete)
router.route('/directions/:id')
      .get(Directions.get)
      .delete(Directions.delete)

module.exports = router
