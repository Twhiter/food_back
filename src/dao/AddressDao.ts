import {pool} from "../config/DaoConfig";
import {Address} from "../model/Table";

export async function getByUser_id(user_id:number) {

    const conn = await pool.getConnection();
    const address:Address[] = await conn.query("select * from Address where user_id=?",[user_id]);
   conn.release();

   return address;
}
