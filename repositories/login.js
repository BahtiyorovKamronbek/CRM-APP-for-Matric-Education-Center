const pg = require('../utils/pg')
const jwt = require('../utils/jwt')

module.exports = class SignUp {
  static async login({ username, password }) {
      try {

          let users = await pg(false,`select * from users where archive=true`)
          let user = users.find(u => u.name==username && u.password==password)

          if(!user){
              return { error:"Bunday foydalanuvchi topilmadi" }
          }else{
              let role = {
                  1:"Superadmin",
                  2:"Admin",
                  3:"Buxgalter",
                  4:"O'qituvchi",
                  5:"O'quvchi"
              }
              return {
                  token : jwt.sign( user.role + "|" + user.id ) ,
                  role  : role[user.role]
              }
          }
      } catch (e) {
        console.log(e.message);
      }

  }
}
