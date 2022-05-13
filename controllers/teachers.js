const model = require('../repositories/teachers')
const validate = require('../validation/joi').teacher
const jwt = require('../utils/jwt')
module.exports = class Teachers {
  static async get(req,res){
    try {
      let role = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[0];
      let id = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[1];
      if(!['1','2'].includes(role)) throw new Error("Sizda bunday huquq yo'q")
        let teachers = await model.get(req.params.id)
        if(teachers.error) throw new Error(teachers.error)
        res.status(200).json({
          message:"O'qituvchilar ro'yhati",
          data:teachers,
          status:200
        })

    } catch (e) {
       res.status(404).json({
         message:e.message,
         data:null,
         status:404
       })
    }
  }
  static async post(req,res){
    try {
      let role = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[0];
      let id = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[1];
      if(!['1','2'].includes(role)) throw new Error("Sizda bunday huquq yo'q")
         let validationResult = await  validate.validate({name:req.body.name,age:req.body.age,password:req.body.password, lastname:req.body.lastname, phone1:req.body.phone1, phone2:req.body.phone2,direction:req.body.direction,groupId:req.body.groupId })
         if (validationResult.error) throw new Error(validationResult.error.details[0].message)
         let post_teachers = await model.post(req.body)
         if(post_teachers.error) throw new Error(post_teachers.error)
         res.status(200).json({
           message:"Yangi o'qituvchi muvvafaqiyatli qo'shildi!",
           data:post_teachers,
           status:200
         })
    } catch (e) {

         res.status(404).json({
           message:e.message,
           data:null,
           status:404
         })
    }
  }
  static async put(req,res){
    try {
      let role = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[0];
      let id = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[1];
      if(!['1','2'].includes(role)) throw new Error("Sizda bunday huquq yo'q")
       let update_teacher = await model.put(req.body)
       if(update_teacher.error) throw new Error(update_teacher.error)
       res.status(200).json({
         message:"Muvvafaqiyatli o'zgartirildi",
         data:update_teacher,
         status:200
       })
    } catch (e) {
      res.status(404).json({
        message:e.message,
        data:null,
        status:404
      })
    }
  }
  static async delete(req,res){
    try {
      let role = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[0];
      let id = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[1];
      if(!['1','2'].includes(role)) throw new Error("Sizda bunday huquq yo'q")
       let target = req.body.id || req.params.id

       let delete_teacher = await model.delete(target)
       if(delete_teacher.error) throw new Error(delete_teacher.error)
       res.status(200).json({
         message:"Muvvafaqiyatli O'chirildi",
         data:delete_teacher,
         status:200
       })

    } catch (e) {
      res.status(404).json({
        message:e.message,
        data:null,
        status:404
      })
    }
  }
}
