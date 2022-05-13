const { del } = require('express/lib/application')
const pg = require('../utils/pg')
module.exports = class Guruh {
    static async get(guruhId,userId) {
        try {
            let user = await pg(true,"select * from users where id=$1",userId)
            
            if(!user) throw new Error("Bunday foydalanuvchi yo'q")
            
            if (guruhId) {
                if(+user.role==4){
                    let guruhlar = await pg(false,"select * from groups where (teacher_id=$1 and  active=true)",userId)
                    if(!guruhlar.length) throw new Error("Sizda guruhlar yo'q")
                    let guruh = guruhlar.find(f => f.group_id==guruhId)
                    if(!guruh) throw new Error("Bunday guruh mavjud emas")
                    let teacher = await pg(true,"select * from users where id=$1",guruh.teacher_id)
                    let direction = await pg(true,"select * from direction where id=$1",guruh.direction_id)
                    guruh.teacher = teacher.name
                    guruh.direction = direction.name
                    delete guruh.teacher_id,guruh.direction_id

                    return guruh
                }else{
                    let guruh = await pg(true,"select * from groups where id=$1",guruhId)
                    if(!guruh) throw new Error("Bunday guruh mavjud emas")
                    let teacher = await pg(true,"select * from users where id=$1",guruh.teacher_id)
                    let direction = await pg(true,"select * from direction where id=$1",guruh.direction_id)
                    guruh.teacher = teacher.name
                    guruh.direction = direction.name
                    delete guruh.teacher_id
                    delete guruh.direction_id
                    return guruh
                }
            } else {
                
                if(+user.role==4){
                    
                    let guruhlar = await pg(false,"select * from groups where (teacher_id=$1 and active = true)",userId)
                    if(!guruhlar.length) throw new Error("Sizda hozircha guruhlar yo'q")
                    
                    let directions = await pg(false,"select * from direction")
                    guruhlar =  guruhlar.map( element => {
                        
                       
                       element.teacher = user.name +" " +user.lastname
                       let direction = directions.find(el => el.id==element.direction_id)
                       element.direction = direction.name
                       delete element.teacher_id
                       delete element.direction_id
                       
                       return element
                       
                    })
                    
                    
                    return guruhlar
                    
                }else{
                    let guruhlar = await pg(false,"select * from groups")
                    let teachers = await pg(false,"select * from users where role=4")
                    
                    let directions = await pg(false,"select * from direction")
                    guruhlar =  guruhlar.map( element => {
                        
                       let teacher = teachers.find(el => el.id==element.teacher_id)
                       element.teacher = teacher.name +" " +teacher.lastname
                       let direction = directions.find(el => el.id==element.direction_id)
                       element.direction = direction.name
                       delete element.teacher_id
                       delete element.direction_id
                       
                       return element
                       
                    })
                    
                    
                    return guruhlar
                }

                
            }

        } catch (e) {
            return {error: e.message}
        }
    }

    static async post({name, teacherId, directionId}) {
        try {
            let date = new Date()
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let dt = date.getDate();
            let vaqt = (year+"-"+month+"-"+dt)
            
                        
            let group = await pg(true,"select * from groups where name=$1",name)
            if(group) throw new Error("Bunday nomdagi guruh mavjud")
            let teacher = await pg(true,"select * from users where (id=$1 and role=4)",teacherId)
            if(!teacher) throw new Error("Bunday o'qituvchi yo'q")
            
            let direction = await pg(true,"select * from direction where id=$1",directionId)
            if(!direction) throw new Error("Bunday yo'nalish ochilmagan")

            let post_guruh = await pg(true, `insert into groups(name,teacher_id,direction_id,create_at) values($1,$2,$3,$4) returning *`, name, teacherId, directionId, vaqt)
            
            if (post_guruh) {
                let update_teacher = await pg(true,"update users set group_id= $1 where id=$2 returning *",post_guruh.id,teacherId)
                if(!update_teacher) throw new Error("Xatoli")
                post_guruh.teacher = teacher.name +" "+teacher.lastname
                post_guruh.direction = direction.name
                delete post_guruh.teacher_id
                delete post_guruh.direction_id
                delete post_guruh.deleted_at 
                delete post_guruh.active
                delete post_guruh.create_at
                return post_guruh
            } else throw new Error("Xatolik")
        } catch (e) {
            return {error: e.message}
        }
    }

    static async put({id, name, teacherId, deletedAt, active,directionId}) {
        try {
            if (!id) throw new Error("ID kiritilmagan")
            let updated_guruh = await pg(true, `
         with old_data as (
         select * from groups where id=$1
         )update groups set 
         name = (
              case 
                  when length($2)>0 then $2
                  else o.name
              end 
         ),
         teacher_id = (
             case 
                 when $3>0 then $3
                 else o.teacher_id
             end
         ),
         direction_id = (
             case 
                 when $4>0 then $4
                 else o.direction_id
             end
         ),
        deleted_at = (
             case
                 when length($5)>0 then $5::timestamp
                 else o.deleted_at
             end
       ),
       active = (
             case 
                 when ($6=1 and o.active=true) then false 
                 when ($6=1 and o.active=false) then true
                 else o.active
             end
       )
       from old_data as o
       where groups.id = $1
       returning groups.*
         `, id, name,teacherId,directionId,deletedAt,active)
            if (updated_guruh) {
                let teacher = await pg(true,"select * from users where id=$1",updated_guruh.teacher_id)
                
                let direction = await pg(true,"select * from direction where id=$1",updated_guruh.direction_id)
                updated_guruh.teacher = teacher.name + " " +  teacher.lastname
                updated_guruh.direction = direction.name 
                delete updated_guruh.teacher_id
                delete updated_guruh.direction_id
                return updated_guruh
            } else throw new Error("O'zgartirilmadi")
        } catch (e) {
            return {error: e.message}
        }
    }
    static async delete(id){
        try{
            let date = new Date()
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let dt = date.getDate();
            let vaqt = (year+"-"+month+"-"+dt)
            let deleted_group = await pg(true,`update groups set deleted_at=$2 ,active=$3 where id=$1 returning *`,id,vaqt,false)
            if(deleted_group) { 
                let teacher = await pg(true,"select * from users where id=$1",deleted_group.teacher_id)
                let direction = await pg(true,"select * from direction where id=$1",deleted_group.direction_id)
                deleted_group.teacher = teacher.name + " " + teacher.lastname
                deleted_group.direction = direction.name 
                delete deleted_group.teacher_id 
                delete deleted_group.direction_id
                return deleted_group

             }
            else throw new Error("Xatoli")
        }catch (e){
            return { error : e.message }
        }
    }
}
// }
//     ,
//     active = (
// case
// when $5=1 then true
// when $5=0 then false
// else o.active
// end
// )
//     ,
//     deleted_at = (
// case
// when length($5)>0 then $5
// else o.deleted_at
// end
// )
