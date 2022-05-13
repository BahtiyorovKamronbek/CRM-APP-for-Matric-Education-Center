const e = require("express")
const model = require("../repositories/participent")
const jwt = require('../utils/jwt')


module.exports = class Participent {
    static async get(req,res){
        try{

            let get_participent = await model.get(req.params.id)
            if( !get_participent ) throw new Error("Check connection")
            if( get_participent.error ) throw new Error( get_participent.error )
            res.status(200)
                .json({
                    message : "Qatnashuvchilar",
                    data : get_participent,
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
    static async post(req,res){
        try{

            let post_participent = await model.post( req.body )
            if( !post_participent ) throw new Error("Check connection")
            if( post_participent.error ) throw new Error( post_participent.error )
            res.status(201)
               .json({
                   message : "Qo'shildi",
                   data : post_participent,
                   status : 201
               })

        }catch(e){
            res.status(404)
                .json({
                    message : e.message,
                    data : null,
                    status : 404
                })
        }
    }
    static async put(req,res){
        try{
           
            let edit_participent = await model.put(req.body)
            if( edit_participent.error ) throw new Error( edit_participent.error )
            res.status(200)
               .json({
                   message : "O'zgartirildi",
                   data : edit_participent,
                   status : 200
               })

        }catch(e){
            res.status(404)
                .json({
                    message : e.message,
                    data : null,
                    status : 404
                })
        }
    }
    static async delete(req,res){
        try{

            let target = req.params.id || req.body.id
            let delete_participent = await model.delete(target)
            if( delete_participent.error ) throw new Error( delete_participent.error )
            res.status(200)
               .json({
                   message : "O'chirildi",
                   data : delete_participent,
                   status : 200
               })
        }catch(e){
            res.status(404)
            .json({
                message : e.message,
                data : null,
                status : 404
            })
        }
    }
}