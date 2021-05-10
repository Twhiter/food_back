import {PoolConnection} from "mariadb";
import {pool} from "../config/DaoConfig";
import {FoodOnSale} from "../model/FoodOnSale";
import {FoodSale} from "../model/Table";

export async function getByFoodBaseId(foodBase_id: number,conn?:PoolConnection) {

    let isParam = true;
    if (conn ===undefined) {
        isParam = false;
        conn = await pool.getConnection();
    }

    let foodSalesList:FoodSale[] = await conn.query(`select * from FoodSale where FoodBase_id=${foodBase_id}`);

    if (!isParam)
        conn.release();

    return foodSalesList;

}
