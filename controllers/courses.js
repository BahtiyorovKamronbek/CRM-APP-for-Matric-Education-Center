const model = require('../repositories/courses')
const jwt = require('../utils/jwt')


module.exports = class Courses{
  static async post(req,res){
    try {
      let role = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[0];
      let id = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[1];
      if(!['1','2','4'].includes(role)) throw new Error("Sizda bunday huquq yo'q")

      let post_course = await model.post(req.body)
      if( post_course.error ) throw new Error( post_course.error )
      res.status(201)
         .json({
          message : "Qo'shildi",
          data : post_course,
          status : 201
      })
    } catch (e) {
      res.status(400)
         .json({
           message : e.message,
           data : null ,
           status : 400
         })
    }
  }
  static async get(req,res){

    try {
      
      let get_courses = await model.get(req.params)
      if( get_courses.error ) throw new Error( get_courses.error )
      res.status(200).json({
        message :  "Kurslar",
        data    :  get_courses,
        status  :  200
      })
    } catch (e) {
      res.status(404).json({
           message : e.message,
           data : null,
           status : 404
         })
    }
  }
  static async put(req,res){
    try{
      let role = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[0];
      let id = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[1];
      if(!['1','2','4'].includes(role)) throw new Error("Sizda bunday huquq yo'q")

      let edit_course = await model.put(req.body)
      if( edit_course.error ) throw new Error( edit_course.error )
      res.status(200)
         .json({
           message : "O'zgartirldi",
           data : edit_course,
           status : 200
         })
    }catch(e){
      res.status(304).json({
           message : e.message,
           data : null,
           status : 304
         })
    }
  }
  static async delete(req,res){
    try {
      let role = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[0];
      let id = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[1];
      if(!['1','2','4'].includes(role)) throw new Error("Sizda bunday huquq yo'q")

        let target = req.body.id || req.params.id
        let delete_course = await model.delete(target)
        if(delete_course.error) throw new Error(delete_course)
        res.status(200)
           .json({
             message : "O'chirildi",
             data : delete_course,
             status : 200
           })

    } catch (e) {
      res.status(404).json({
           message : e.message,
           data : null,
           status : 304
         })
    }
  }
}
