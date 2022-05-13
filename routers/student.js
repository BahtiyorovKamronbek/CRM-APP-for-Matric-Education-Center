const router = require("express").Router()
const Students = require("../controllers/student.js")

router.route("/user/students")
      .get( Students.get )
      .post( Students.post )
      .delete( Students.delete )
      .put( Students.put )
router.route("/user/students/:id")
      .get( Students.get )    
      .delete( Students.delete )

module.exports = router
