import {PoolConnection} from "mariadb";
import {pool} from "../config/DaoConfig";

export async function getNameByFoodBase_id(foodBase_id: number,conn?:PoolConnection) {


    let isParam = true;
    if (conn == undefined) {
        conn = await pool.getConnection();
        isParam = false
    }

    const ingredients:{name:string}[] = await conn.query("select name from FoodContaining where FoodBase_id=" + foodBase_id);

    if (!isParam)
        conn.release();

    return ingredients;
}
