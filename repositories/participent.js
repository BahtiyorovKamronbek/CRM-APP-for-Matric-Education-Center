const pg = require("../utils/pg")

module.exports = class Participent {
    static async get(id){
        try{
           if( id ){
               let particepent = await pg(true,"select * from participent where id = $1",id )
               if( particepent ) return particepent
               else throw new  Error("Topilmadi")
           }else {
               let participents = await pg(false, "select * from participent")
               if ( participents ) return participents
               else throw new Error("Xatolik")
           }
        }catch (e) {
            return { error : e.message }
        }
    }
    static async post({phone,courseId,name}){
        try{
           let post_participent = await pg(true,"insert into participent(name,course_id,phone) values($1,$2,$3) returning *",name,courseId,phone)
           if( post_participent ) return post_participent
           else throw new Error( "Xatolik" )
        }catch(e){
            return { error : e.message }
        }
    }
    static async put({id,phone,courseId,name}){
        try{
           
           let edited_participent = await pg(true,`
           with old_data as(
               select * from participent where id=$1
           )update participent set
           phone = (
                case 
                   when length($2)=12 then $2
                   else o.phone
                end
           ),
           course_id = (
                case
                    when $3>0 then $3
                    else o.course_id
                end
           ),
           name = (
               case 
                   when length($4)>0 then $4
                   else o.name
                end
           )from old_data as o
           where participent.id=$1
           returning participent.*
           `,id,phone,courseId,name)
           if(!edited_participent) throw new Error("Xatolik")
           else return edited_participent

        }catch(e){
           return { error : e.message }
        }
    }
    static async delete(id){
        try{
           let deleted_participent = await pg(true,"delete from participent where id=$1 returning *",id)
           if(!deleted_participent) throw new Error("Xatolik")
           else return deleted_participent
        }catch(e){
           return { error : e.message }
        }
    }
}