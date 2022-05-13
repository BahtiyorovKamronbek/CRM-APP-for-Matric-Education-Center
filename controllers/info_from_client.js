const joi = require('../validation/joi')
const model = require('../repositories/info_from_client.js')
module.exports = class info_from_client {
  static async post_info_from_client(req,res){
    try{
        let validationResult = joi.info.validate({name:req.body.name,phone_number:req.body.phone_number})
        if (validationResult.error) throw new Error(validationResult.error.details[0].message)
        let post_info_from_client = await model.post( req.body )
        if(post_info_from_client.error) throw new Error(post_info_from_client.error)
        res.status(200)
           .json({
             message : "Ok",
             data : post_info_from_client,
             status : 200
           })
    }catch(e){
       res.status(400)
          .json({
            message : e.message,
            data : null,
            status : 400
          })
    }
  }
  static async get_info_from_client(req,res){
    try{
        let get_info_from_client = await model.get(req.params.id)
        if( get_info_from_client.error ) throw new Error(get_info_from_client.error)
        res.status(200)
           .json({
             message : "Foydalanuvchi malumotlari",
             data : get_info_from_client,
             status : 200
           })
    }catch(e){
      res.status(400)
         .json({
           message : e.message,
           data : null,
           status : 400
         })
    }
  }
  static async delete_info_from_client(req,res){
    try{
       let target = req.params.id || req.body.id
       let delete_info_from_client = await model.delete(target)
       if(delete_info_from_client.error) throw new Error(delete_info_from_client.error)
       res.status(200)
          .json({
            message : "O'chirildi",
            data : delete_info_from_client,
            status : 200
          })
    }catch(e){
      res.status(400)
         .json({
           message : e.message,
           data : null,
           status : 400
         })
    }
  }
}
