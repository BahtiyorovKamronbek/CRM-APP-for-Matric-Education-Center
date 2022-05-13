const router = require("express").Router()
const Courses = require("../controllers/courses")

router.route("/courses")
      .post( Courses.post )
      .get( Courses.get )
      .put( Courses.put )
      .delete( Courses.delete )
router.route("/courses/:id")
      .get( Courses.get )
      .delete( Courses.delete )

module.exports = router
