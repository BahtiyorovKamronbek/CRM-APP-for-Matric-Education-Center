const model = require('../repositories/davomat')
const joi = require('../validation/joi')
const jwt = require('../utils/jwt')


module.exports = class Davomat {
    static async get(req,res){
        try{
            let davomat = await model.get(req.params.id)
            if(davomat.error) throw new Error(davomat.error)
            res.status(200).json({
                message:"Davomat",
                data:davomat,
                status:200
            })
        }catch (e){
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
            
            let post_davomat = await model.post(req.body)
            if(post_davomat.error) throw new Error(post_davomat.error)
            res.status(200).json({
                message:"Davomat ochildi",
                data:post_davomat,
                status:200
            })
        }catch (e) {
            res.status(404).json({
                message:e.message,
                data:null,
                status:404
            })
        }
    }
    static async put(req,res){
        try{
            let role = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[0];
            let id = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[1];
            if(!['1','2'].includes(role)) throw new Error("Sizda bunday huquq yo'q")

            let validationResult = await joi.joi1.validate({id:req.body.id,participate:req.body.participate,ball:req.body.ball})
            if (validationResult.error) throw new Error(validationResult.error.details[0].message)
             let update_davomat = await model.put(req.body)
            if(update_davomat.error) throw new Error(update_davomat.error)
            res.status(200).json({
                message:"O'zgartirildi",
                data:update_davomat,
                status:200
            })
        }catch (e){
            res.status(404).json({
                message:e.message,
                data:null,
                status:404
            })
        }
    }
    static async delete(req,res){
        try{
            let role = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[0];
            let id = jwt.verify(req.headers.cookie.split('=')[1],'wieeil').split('|')[1];
            if(!['1','2'].includes(role)) throw new Error("Sizda bunday huquq yo'q")
            let target = req.params.id || req.body.id 

            let delete_davomat = await model.delete(target)
            if( delete_davomat.error ) throw new Error( delete_davomat.error )
            res.status(200).json({
                message:"Muvaffaqiyatli o'chirildi",
                data : delete_davomat,
                status : 200
            })
        }catch (e) {
            res.status(404).json({
                message:e.message,
                data:null,
                status:404
            })
        }
    }
}