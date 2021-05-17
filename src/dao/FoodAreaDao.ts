import {PoolConnection} from "mariadb";
import {pool} from "../config/DaoConfig";
import {FoodArea} from "../model/FoodArea";
import * as FoodBaseDao from "./FoodBaseDao"
import * as FoodOnSaleDao from "./FoodOnSaleDao"

export async function getAll(con?:PoolConnection) {


    let isParam = true;

    if (con == undefined) {
        isParam = false;
        con = await pool.getConnection();
    }

    const categories = await FoodBaseDao.getAllFoodCategory(con);

    const foodAreaList:FoodArea[] = [];

    for (let category of categories) {

        let items = await FoodOnSaleDao.getAllByCategory(category,con);


        foodAreaList.push({category:category,items:items});
    }

    if (!isParam)
        con.release();


    return foodAreaList;
}
