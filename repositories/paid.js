const pg = require('../utils/pg')

module.exports = class Paid {
    static async post({turi,userId,amount,term}){
        try{
            let date = new Date()
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let dt = date.getDate();
            let vaqt = (year+"-"+month+"-"+dt)

            let userid = await pg(true,"select * from users where id=$1",userId)
            if(!userid) throw new Error("Bunday user mavjud emas")
            let post_paid = await pg(true,"insert into paid(tolov_tizimi,user_id,date,amount,term) values($1,$2,$3,$4,$5) returning *",+turi,+userId,vaqt,amount,term)
            if(post_paid) return post_paid
            else throw new Error("Xatolik")
        }catch (e) {
            return { error : e.message }
        }
    }
    static async get(id){
        try{
            if(id){
                let get_paid = await pg(true,"select * from paid where id=$1",id)
                if(!get_paid) throw new Error("Topilmadi")
                return get_paid
            }else{
                let get_paids = await pg(false,"select * from paid")
                return get_paids
            }
        }catch (e) {
            return { error : e.message }
        }
    }
    static async put({id,turi,userId,amount,term,debt}){
        try{
            let paid = await pg(true,"select * from paid where id=$1",id)
            if(!paid) throw new Error("Bunday IDli tolov topilmadi")
            let edited_paid = await pg(true,`
                with old_data as (
                select * from paid where id=$1
                )update paid set
                tolov_tizimi = (
                     case
                         when $2>0 then $2
                         else o.tolov_tizimi
                     end
                ),
                user_id = (
                     case
                         when $3 > 0 then $3
                         else o.user_id
                     end
                ),
                amount = (
                     case
                         when $4> 0 then $4
                         else o.amount
                     end
                ),
                term = (
                     case
                         when length($5) > 0 then $5::date
                         else o.term
                     end
                ),
                debt = (
                     case
                         when $6 > 0 then $6
                         else o.debt
                     end
                )from old_data as o
                where paid.id = $1
                returning paid.*
            `,(id),(turi),(userId),(amount),term,(debt))
            if(!edited_paid) throw new Error("Xatolik")
            return edited_paid
        }catch (e) {
            return { error : e.message }
        }
    }
    static async delete(id){
      try {
        let paid = await pg(true,"select * from paid where id=$1",id)
        if( !paid ) throw new Error("Bunaqa tolov topilmadi")
        let delete_paid = await pg(true,"delete from paid where id=$1 returning * ",id)
        return delete_paid
      } catch (e) {
        return { error : e.message }
      }
    }
}
