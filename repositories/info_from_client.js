const pg = require('../utils/pg')
module.exports = class Info_From_Client {
    static async post({ name,phone_number }){
      try {
          let post_info_from_client = await pg(true,"insert into infos_from_clients(name,phone) values($1,$2) returning *",name,phone_number)
          if( !post_info_from_client ) throw new Error("Xatolik")
          return post_info_from_client
      } catch (e) {
          return { error : e.message }
      }
    }
    static async get(id){
      try {

        let get_info_from_client = id ? await pg(true,"select * from infos_from_clients where id=$1",id) : await pg(false,"select * from infos_from_clients")
        if(!get_info_from_client) throw new Error("Xatolik yoki Topilmadi")
        return get_info_from_client
      } catch (e) {
        return { error : e.message }
      }

    }
   static async delete(id){
     try {
       let delete_info_from_client = await pg(true,"delete from infos_from_clients where id=$1 returning *",id)
       if(!delete_info_from_client) throw new Error(delete_info_from_client)
       return delete_info_from_client
     } catch (e) {
       return { error : e.message }
     }
   }
}
