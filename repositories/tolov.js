const pg = require('../utils/pg')

module.exports = class Tolov{
    static async post({name}){
        try{
            let tolov_turlari = await pg(false,"select * from tolov_tizimlari")
            let result = tolov_turlari.find(f => f.name == name)
            if(result) throw new Error("Mavjud tolov turi")
            let post_tolov = await pg(true,'insert into tolov_tizimlari(name) values($1) returning *',name)
            if(post_tolov) return post_tolov
            else throw new Error("Xatolik")
        }catch (e) {
            return { error : e.message }
        }
    }
    static async get(id){
        try{
            if(id){
                let tolov_turi = await pg(true,"select * from tolov_tizimlari where id=$1",id)
                if(tolov_turi) return tolov_turi
                else throw new Error("Topilmadi")
            }else{
                let tolov_turlari = await pg(false,"select * from tolov_tizimlari")
                return tolov_turlari
            }
        }catch (e) {
            return { error : e.message }
        }
    }
    static async put({ id,name }){
        try{
            let update_tolov = await pg(true,`with old_data as(
            select * from tolov_tizimlari where id=$1)
            update tolov_tizimlari set 
            name = (
                 case 
                     when length($2) > 0 then $2
                     else o.name
                 end
            ) from old_data as o
             where tolov_tizimlari.id = $1
             returning tolov_tizimlari.*
            `,id,name)
            if( update_tolov ) return update_tolov
            else throw new Error("Xatolik")
        }catch (e) {
            return { error : e.message }
        }
    }
    static async delete(id){
        try{

            let delete_tolov = await pg(true,"delete from tolov_tizimlari where id=$1 returning *",+id)
            console.log(delete_tolov)
            if( delete_tolov ) return  delete_tolov
            else throw new Error("Xatolik")
        }catch (e) {
            return { error : e.message }
        }
    }

}