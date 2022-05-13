const pg = require('../utils/pg')

module.exports = class Directions {
  static async get(id){
    try {
      if(!id){
        let directions = await pg(false,'select * from direction')
        return directions
      }else{
        let directions = await pg(false,'select * from direction where id=$1',id)
        return directions
      }
    } catch (e) {
      return { error : e.message }
    }
  }
  static async put({id,name}){
    try {
        if(!name) throw new Error("Hech narsa o'zgartirilmadi")
        let put_direction = await pg(true,`with old_data as (select * from direction where id = $1 )update direction set name =(
          case
             when length($2)>0 then $2
             else o.name
          end
        )
        from old_data as o
        where direction.id = $1
        returning direction.*
        `,id,name)
        if(put_direction){
          return put_direction
        }else throw new Error('Topilmadi')
    } catch (e) {
      return { error : e.message }
    }
  }
  static async post({name}){
    try {
      if(!name) throw new Error("Yo'nalish nomi kiritilmagan")
      let post_direction = await pg(true,`insert into direction(name) values($1) returning *`,name)
      if(post_direction){
        return post_direction
      }else throw new Error("Xatolik")
    } catch (e) {
        return { error: e.message}
    }
  }
  static async delete(id){
    try {
      
       if(!id) throw new Error("Yo'nalish idini kiritmagansiz!")
       let delete_direction = await pg(true,'delete from direction where id=$1 returning *',+id)
       if(delete_direction) {return delete_direction}
       else throw new Error("O'chirilmadi xatolik mavjuda")
    } catch (e) {
       return { error : e.message }
    }
  }
}
