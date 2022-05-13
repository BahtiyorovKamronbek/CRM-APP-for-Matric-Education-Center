const joi = require('../validation/joi')
const jwt = require('../utils/jwt')

const model = require('../repositories/user')
module.exports = class User {
  static async join(req,res){
     try {
       
       let token = jwt.verify((req.headers.cookie.split('='))[1]).split('|')[0]
       if(['1','2'].includes(token)){
         if(+token!==1 && req.body.role==1 ) throw new Error("Sizda buni amalga oshirishish uchun huquq yo'q")
         let validationResult = await joi.schema.validate({
           name: req.body.name,
           lastname:  req.body.lastname,
           age: req.body.age,
           phone1: req.body.phone1,
           phone2: req.body.phone2,
           groupId:  req.body.groupId,
           directionId: req.body.directionId,
           password:  req.body.password
         })
          if (validationResult.error) {
       return res.status(400).send(validationResult.error.details[0].message);
       }
        let login = await model.post(req.body)
        if(login.role){

          res.status(200).json({
            message:"Foydalanuvchi muvaffaqiyyatli qo'shildi!",
            data:login
          })
        }else if(login.message){
          res.status(404).json({
            data:null,
            message:login.message
          })
        }
        if(login.error) throw new Error(login.error)



      }else throw new Error("Siz admin emassiz")

     } catch (e) {
       res.status(500).json({
         message:e.message,
         data:null
       })
     }
  }

  static async get (req,res){
      try{
        let role = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[0];
        let id = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[1];
        if(!['1','2','3'].includes(role)) throw new Error("Sizda bunday huquq yo'q")

         let users = await model.get(req.params.id)
         if(!users) throw new Error("Check your connection")
         if( users.error ) throw new Error(users.error)
         res.status(200)
            .json({
               message : "Foydalanuvchi",
               data : users,
               status : 200
            })





      }
      catch (e){
          res.status(404).json({
              data:null,
              message:e.message
          })
      }
  }
  static async update(req,res){
      try {
        let role = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[0];
        let id = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[1];
        if(!['1','2','3'].includes(role)) throw new Error("Sizda bunday huquq yo'q")

          let updated_user = await model.edit_user(req.body)
          if(req.body.role=='1' || req.body.role==1) throw new Error('1 - bu  rolni hech kimga berilmaydi')
          if(updated_user.error) throw new Error(updated_user.error)
          if(updated_user && !updated_user.error) {
              res.json({
                  data:updated_user
              })
          }
      }catch (e){
          res.status(404).json({
              data:null,
              message:e.message
          })
      }
  }
  static async delete(req,res){
      try{
        let role = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[0];
        let id = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[1];
        if(!['1','2','3'].includes(role)) throw new Error("Sizda bunday huquq yo'q")

          let deleted_user = await model.delete(req.params)

          if(deleted_user.error) throw new Error(deleted_user.error)
          else{
             res.status(200).json({
                 data: deleted_user,
                 message: "User muvaffaqiyatli o'chirldi"
             })
          }
      }catch (e){
          res.status(404).json({
              data:null,
              message:e.message
          })
      }
  }
}
