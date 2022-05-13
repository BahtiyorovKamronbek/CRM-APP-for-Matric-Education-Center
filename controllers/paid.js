const model = require("../repositories/paid")
const jwt = require('../utils/jwt')


module.exports = class Paid {
    static async post(req,res){
        try{
            let post_paid = await model.post(req.body)
            if( post_paid.error ) throw new Error( post_paid.error )
            res.status(200).json({
                message : "Qo'shildi",
                data : post_paid,
                status : 200
            })
        }catch (e) {
            res.status(404).json({
                message : e.message,
                data : null,
                status : 404
            })
        }
    }
    static async get(req,res){
        try{
            let show_paids  = await model.get(req.params.id)
            if(show_paids.error) throw new Error( show_paids.error )
            res.status(200).json({
                message : "To'lovlar",
                data : show_paids,
                status : 200
            })
        }catch (e) {
            res.status(404).json({
                message : e.message,
                data : null,
                status : 404
            })
        }
    }
    static async put(req,res){
        try{
            let edit_paid = await model.put(req.body)
            if( edit_paid.error ) throw new Error( edit_paid.error )
            res.status(200)
                .json({
                    message : "O'zgartirildi",
                    data : edit_paid,
                    status : 200
                })

        }catch (e) {
            res.status(404)
                .json({
                    message : e.message,
                    data : null,
                    status : 404
                })

        }
    }
    static async delete( req,res ){
      try {
        let target = req.params.id || req.body.id
        let delete_paid = await model.delete(target)
        if( delete_paid.error ) throw new Error( delete_paid.error )
        res.status( 200 )
           .json({
             message : "O'chirildi",
             data : delete_paid,
             status : 200
           })

      } catch (e) {
        res.status(404)
            .json({
                message : e.message,
                data : null,
                status : 404
            })
      }
    }
}
