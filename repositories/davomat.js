const pg = require('../utils/pg')
module.exports = class Davomat {
    static async get(id){
        try{
            if(id){
                let davomat = await pg(true,"select * from attendance where id=$1",id)
                if(davomat) return davomat
                else throw new Error("Topilmadi")
            }else{
                let davomatlar = await pg(false,"select * from attendance")
                return davomatlar
            }
        }catch (e) {
            return { error : e.message }
        }
    }
    static async post({groupId}){
        try{
              if(!groupId) throw new Error("Guruh IDi kiritilmagan")
              let counter = 0
              let date = new Date()
              let year = date.getFullYear();
              let month = date.getMonth()+1;
              let dt = date.getDate();
              let vaqt = (year+"-"+month+"-"+dt)
              let group = await pg(true,"select * from groups where id=$1",groupId)
              if(!group) throw  new Error("Bunday guruh mavjud emas")
              let teacher = await pg(true,"select * from users where role=4 and group_id=$1",groupId)
              let students = await pg(false,"select * from users where role=5 and group_id=$1",groupId)

              for(let i of students){
                  let post_davomat = await pg(true,"insert into attendance(group_id,teacher_id,student_id,date) values($1,$2,$3,$4) returning *",groupId,teacher.id,i.id,vaqt)

                  if(post_davomat){
                      counter++
                  }
              }
              let davomat = await pg(false,"select * from attendance where date=$1",vaqt)
              if(students.length==counter) return davomat
              else throw new Error("Xatoli")
        }catch (e) {
            return { error : e.message }
        }
    }
    static async put({id,participate,ball}){
        try{

             let update_davomat = await pg(true,`
             with old_data as(
                 select * from attendance where id=$1
             )update attendance set
             participate = (
                case 
                    when (o.participate=true and $2=1) then false
                    when (o.participate=false and $2=1) then true
                    else o.participate
                end
             ),
             ball = (
                case 
                    when $3>0 then $3
                    else o.ball
                end 
             )from old_data as o
             where attendance.id=$1
             returning attendance.*
             `,id,participate,ball)
            if(update_davomat) return update_davomat
            else throw new Error("Xatolik")
        }catch (e) {
            return { error:e.message }
        }
    }
    static async delete({id,groupId}){
        try{
            if(id) {
                let delete_davomat = await pg(true, "delete from attendance where id=$1 returning *", id)
                if (delete_davomat) return delete_davomat
                else throw new Error("Xatolik")
            }else if(groupId){
                let delete_davomat = await pg(false,"delete from attendance where group_id=$1 returning *",groupId)
                if(delete_davomat.length) return delete_davomat
                else throw new Error("Xatolik")
            }
        }catch (e) {
            return { error : e.message }
        }
    }
}