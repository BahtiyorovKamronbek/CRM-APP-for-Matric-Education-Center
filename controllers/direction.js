const model = require('../repositories/direction')
const jwt = require('../utils/jwt')


module.exports = class Directions {
  static async get(req,res){
    try {
      let role = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[0];
      let id = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[1];
      if(!['1','2'].includes(role)) throw new Error("Sizda bunday huquq yo'q")

      let directions = await model.get(req.params.id)
      if(directions.error) throw new Error(directions.error)
      res.status(200).json({
        message:"Yo'nalishlar:",
        data:directions,
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

       let directions = await model.put(req.body)
       if(directions.error) throw new Error(directions.error)
       res.status(200).json({
         message:"Yo'nalish nomi muvaffaqiyatli o'zgartirildi!",
         data:directions,
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
    try{
      let role = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[0];
      let id = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[1];
      if(!['1','2'].includes(role)) throw new Error("Sizda bunday huquq yo'q")
      
        let post_direction = await model.post(req.body)
        if(post_direction.error) throw new Error(post_direction.error)
        res.status(200).json({
          message:"Yo'nalish qo'shildi!",
          data:post_direction,
          status:200
        })

    }catch(e){
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
       let delete_direction = await model.delete(target)
       if(delete_direction.error) throw new Error(delete_direction.error)
       res.status(200).json({
         message:"O'chirildi",
         data:delete_direction,
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
