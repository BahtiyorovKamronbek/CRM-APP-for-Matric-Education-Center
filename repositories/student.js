const pg = require("../utils/pg")


module.exports = class Students {
   static async get(id){
     try {

       if(id){
         if( isNaN(id) ) throw new Error("ID raqam bo'lishi kerak")
         let student = await pg(true,"select * from users where (id=$1 and role=5)",+id)
         if(!student) throw new Error("Bunday o'quvchi mavjud emas")
         return student
       }else{
         let students = await pg(false,"select * from users where role=5")
         
         return students
       }

     } catch (e) {
        return { error : e.message}
     }
   }
   static async post({name,lastname,phone1,age,phone2,groupId,directionId,password}){
        try {
            let student = await pg(true,"select * from users where (name=$1 and password=$2 )",name,password)
           
            if(student) throw new Error("Bu o'quvchi mavjud")
            let post_student = await pg(true,`insert into users(
              name,lastname,password,age,phone1,phone2,group_id,direction_id,role)
              values($1,$2,$3,$4,$5,$6,$7,$8,5)
              returning *
            `,name,lastname,password,age,phone1,phone2,groupId,directionId)
            if(!post_student) throw new Error("Xatolik")
            return post_student
        } catch (e) {
            return { error : e.message }
        }
   }
   static async delete(id){
     try {
            if(!id) throw new Error("ID kiritilmagan!")
            if(isNaN(id)) throw new Error("ID raqam bo'lishi kerak")
            let student = await pg(true,"select * from users where (id=$1 and role=5)",id)
            if(!student) throw new Error("Bunday o'quvchi topilmadi")

            let deleted_student = await pg(true,"delete from users where id=$1 returning *",id)
            if(!deleted_student) throw new Error("Xatolik")
            return deleted_student
     } catch (e) {
         return { error : e.message }
     }
   }
   static async put({id,name,lastname,age,role,archive,phone1,phone2,directionId,groupId,password}){
     try{
        if(!id) throw new Error("ID kiritilmagan")
        if(role==1) throw new Error("Bunday role ni hech kimga bera olmaysiz") 
        let student = await pg(true,"select * from users where (id=$1 and role=5)",id)
        if(!student) throw new Error("Bunday o'quvchi topilmadi")
        let edited_student = await pg(true,`
        
        with old_data as(
          select * from users where id=$1
        )update users set
        name = (
          case
              when length($2)>1 then $2
              else o.name
          end
      ),
      lastname = (
          case
              when length($3)>1 then $3
              else o.lastname
          end
      ),
      password = (
          case
              when length($4)>8 then $4
              else o.password
          end
      ),
      phone1 = (
          case
               when length($5)=12 then $5
               else o.phone1
          end
      ),
      phone2 = (
          case
               when length($6)=12 then $6
               else o.phone2
          end
      ),
      role = (
          case
              when $7<>1 then $7
              else o.role
          end
      ),
      group_id = (
          case
              when $8>0 then $8
              else o.group_id
          end
      ),
      archive = (
          case
              when ($9=true or $9=false) then $9
              else o.archive
          end

      ),
      direction_id = (
        case
              when $10>0 then $10
              else o.direction_id
          end
      ),
      age = (
        case 
           when $11>0 then $11
           else o.age
        end
      )
      from old_data as o
      where users.id = $1
      returning users.*

        `,id,name,lastname,password,phone1,phone2,role,groupId,archive,directionId,age)
        if(!edited_student) throw new Error("Xatolik")
        return edited_student
     }catch(e){
       return { error : e.message }
     }
   }
}
