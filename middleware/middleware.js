const jwt = require('../utils/jwt')
const pg = require("../utils/pg")
'user strict'
module.exports = class MiddleWare {
  static async middle(req,res,next){
   try {

       if(req.url === '/login') return next()
       if(req.method=='GET' && ( req.url.split('/').includes('courses') )) return  next()
       if(req.method!=='DELETE' && req.url.split('/').includes('info_from_client')) return next()
       if(req.url.split('/').includes('chat') ) return next()
       if(req.headers.cookie) return next()
       else throw new Error("Siz tizimga kirmagansiz")


   } catch (e) {
      res.status(500).json({
        status:500,
        message : e.message,
        data : null
      })
   }
  }
}
