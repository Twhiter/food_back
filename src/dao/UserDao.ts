import {User} from "../model/Table";
import {pool} from "../config/DaoConfig";
import {UserRegist} from "../model/UserRegist";



export async function getById(id:number) {
        const conn = await pool.getConnection();

        const rs:User[] = await conn.query("select * from User where user_id=" + id);

        conn.release();


        return rs;
}


export async function getByPhone(phone:string) {


    const conn = await pool.getConnection();

    const rs:User[] = await conn.query(`select * from User where phone='${phone}'`)

    conn.release()

    return rs;
}

export async function getByUsername(username: string) {
    const conn = await pool.getConnection();

    const rs:User[] = await conn.query(`select * from User where username='${username}'`)

    conn.release()

    return rs;
}

export async function addUser(user: UserRegist) {

    const conn = await pool.getConnection();

    try {
        await conn.query("insert into User(username, phone, password) values (?,?,?)",[user.username,user.phone,user.password]);
    } catch (e) {
        throw e;
    }finally {
        conn.release();
    }


}


