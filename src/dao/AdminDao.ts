import {pool} from "../config/DaoConfig";
import {Admin} from "../model/Table";

export async function GetByUsername(username: string) {


    const conn = await pool.getConnection()

    let t:Admin[] = await conn.query("select * from Admin where username=?", [username]);

    conn.release()

    if (t.length === 0)
        return undefined;
    else
        return t[0];
}
