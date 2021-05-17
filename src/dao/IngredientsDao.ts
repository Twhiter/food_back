import {PoolConnection} from "mariadb";
import {pool} from "../config/DaoConfig";
import {Ingredient} from "../model/Table";

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

export async function getAll() {

    const conn = await pool.getConnection();

    const ingredients:Ingredient[] = await conn.query("select name from Ingredient");

    conn.release()

    return ingredients.map(value => value.name);
}
