const pg = require('../utils/pg')

module.exports = class Teachers {
     static async get(id){
       try {

         if(!id){
           let teachers = await pg(false,`select * from users where role=4 and archive = true`)

           return teachers
         }else{
           let teacher = await pg(false,'select * from users where id=$1',id)
           return teacher
         }
       } catch (e) {
          return { error : e.message }
       }
     }
     static async post({name,lastname,phone1,phone2,direction,age,password}){
       try {
         let teachers = await pg(false,`select * from users where archive = true and role=4`)
          let teacher = teachers.find(f => f.name==name && f.password==password)
          if(teacher) throw new Error("Bunday o'qituvchi avvaldan mavjuda!")
          let post_teachers = await pg(false,`insert into users(name,lastname,role,phone1,phone2,password,age,direction_id) values($1,$2,$3,$4,$5,$6,$7,$8) returning *`,
         name,lastname,4,phone1,phone2,password,age,direction
        )
        
          if(post_teachers){ return post_teachers  }
          else throw new Error("Xatolik")
       } catch (e) {
         return { error : e.message }
       }
     }

     static async put({id,name,lastname,phone1,phone2,password,direction}){
       try {

           let update_teacher = await pg(true,`
              with old_data as(
                select * from users where role=4 and archive=true and id=$1
              )update users set
              name = (
                case
                   when length($2)>0 then $2
                   else o.name
                end
              ),
              lastname = (
                case
                    when length($3)>0 then $3
                    else o.lastname
                end
              ),
              phone1= (
                case
                    when length($4)=12 then $4
                    else o.phone1
                end
              ),
              phone2 = (
                case
                    when length($5)=12 then $5
                    else o.phone2
                end
              ),
             password = (
               case
                   when length($6)>5 then $6
                   else o.password
               end
             ),
             direction_id = (
               case
                   when $7>0 then $7
                   else o.direction
               end
             )
             from old_data as o
             where users.id = $1
             returning users.*
             `,id,name,lastname,phone1,phone2,password,direction)

             if(update_teacher) { return update_teacher }
             else throw new Error("Xatolik o'zgaritirilmadi")

       } catch (e) {
           return { error : e.message }
       }
     }
     static async delete(id){
       try {
            let delete_teacher = await pg(true,`update users set archive = false where id=$1 returning *`,id)
            if(delete_teacher)  { return delete_teacher }
            else throw new Error("Xatolik")

       } catch (e) {
            return { error : e.message }
       }
     }
}
