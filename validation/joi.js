const { required } = require('joi')
const Joi = require('joi')

const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    lastname: Joi.string()
       .alphanum()
       .min(3)
       .max(30)
       .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(8)
        .max(16)
        .required(),

    age: Joi.number()
        .integer()
        .required(),
    phone1:Joi.string()
        .min(12)
        .max(12)
        .required(),
    phone2:Joi.string()
        .min(12)
        .max(12)
        .required(),
    groupId:Joi.number().required(),
    directionId:Joi.number().required(),
    archive:Joi.boolean(),



})
const signup = Joi.object({

    username: Joi.string()
       .alphanum()
       .min(3)
       .max(30)
       .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(8)
        .max(16)
        .required(),


})
const teacher = Joi.object({
  name:Joi.string()
       .min(3)
       .max(30)
       .required(),
  lastname:Joi.string()
       .min(3)
       .max(30)
       .required(),
  phone1:Joi.string()
       .min(12)
       .max(12)
       .required(),
    phone2:Joi.string()
        .min(12)
        .max(12)
        .required(),
  direction: Joi.number()
      .integer()
      .required(),
  groupId:Joi.number()
      ,
  age: Joi.number()
      .integer()
      .required(),
  password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .min(8)
      .max(16)
      .required()
})
const guruh = Joi.object({
  name:Joi.string()
      .required(),
  teacherId:Joi.number()
      .required(),
  directionId:Joi.number()
      .required()


})
const joi1 = Joi.object({
    id:Joi.number().required(),
    participate:Joi.number(),
    ball:Joi.number()

})
const info = Joi.object({
  name:Joi.string().required(),
  phone_number:Joi.string().min(12).max(12).required()
})

module.exports = {
  schema,signup,teacher,guruh,joi1,info
}
