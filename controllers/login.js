const joi = require('../validation/joi')
const jwt = require('../utils/jwt')
const model = require('../repositories/login')

module.exports = class SignUp {
  static async login(req,res) {
      try {
        let validationResult = await joi.signup.validate({ username : req.body.username , password : req.body.password })
        if (validationResult.error) throw new Error(validationResult.error.details[0].message)
         let user = await model.login(req.body)
          if( !user ) throw new Error("Check connection")
          if(user.error) throw new Error(user.error)
          if( user.token ){
              res.cookie('token', user.token)
               res.status(200).json({
                   message:"Siz muvvaffaqiyatli kirdingiz!",
                   role : user.role,
                   token : user.token
               })

          }
      } catch (e) {
        res.status(404).json({
          status : 400,
          data:null,
          message:e.message
        })
      }
  }
}
