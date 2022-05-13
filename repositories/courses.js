const pg = require("../utils/pg")

module.exports = class Courses {
  static async post( { name ,date } ){
    try {
      let courses = await pg(true,"select * from courses where name = $1",name)
      if( courses ) throw new Error("Bu turdagi kurs mavjud")
      let post_course = await pg(true,"insert into courses(name,date) values($1,$2) returning *",name,date)
      if( !post_course ) throw new Error("Xatolik")
      return post_course
    } catch (e) {
      return { error : e.message }
    }
  }
  static async get( {id} ){
    try{

        if(id){
        
          let courses = await pg(true,`select * from courses where id=$1`,(id))
          if( !courses ) throw new Error( "Topilmadi" )
          return courses
        }else{

          let courses = await pg(false,"select * from courses")
          return courses
        }


    }catch(e){
      return { error : e.message }
    }
  }
  static async put({id,name,date}){
    try {
      let course = await pg(true,"select * from courses where id=$1",id)
      if(!course) throw new Error("Topilmadi")
      let edited_course = await pg(true,`with old_data as (
        select * from courses where id=$1
      )update courses set
      name = (
        case
            when length($2) > 0 then $2
            else o.name
        end
      ),
      date = (
        case
            when length($3) >0 then $3::date
            else o.date
        end
      )from old_data as o
      where courses.id=$1
      returning courses.*
      `,id,name,date)
      if(!edited_course) throw new Error("Xatolik")
      else return edited_course
    } catch (e) {
      return { error : e.message }
    }
  }
  static async delete(id){
    try {
        let deleted_course = await pg(true,"delete from courses where id=$1 returning *",id)
        if(!deleted_course) throw new Error("Xatolik")
        else return deleted_course
    } catch (e) {
       return { error: e.message }
    }
  }
}
