import {pool} from "../config/DaoConfig";
import {PoolConnection} from "mariadb";

export async function getAllFoodCategory(conn?:PoolConnection) {

    let isParam = true;

    if (conn == undefined) {
        conn = await pool.getConnection();
        isParam = false;
    }

    const categories:string[] = (await conn.query("select distinct category from FoodBase"))
        .map(value => value.category);

    if (!isParam)
        conn.release();

    return categories;
}
