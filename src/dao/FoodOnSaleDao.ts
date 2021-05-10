import {pool} from "../config/DaoConfig";
import {FoodOnSale} from "../model/FoodOnSale";
import {FoodSale} from "../model/Table";
import * as FoodSaleDao from "./FoodSaleDao"
import * as IngredientsDao from "./IngredientsDao"
import {PoolConnection} from "mariadb";

export async function getAll() {

    const conn = await pool.getConnection();

    let foodOnSales:FoodOnSale[] = await conn.query("select * from FoodBase");

    for (let i = 0; i < foodOnSales.length; i++) {
        foodOnSales[i].ingredients = (await IngredientsDao.getNameByFoodBase_id(foodOnSales[i].FoodBase_id,conn))
            .map(value => value.name);
        foodOnSales[i].style_size_price = {};
        let detailedFoods:FoodSale[] = await FoodSaleDao.getByFoodBaseId(foodOnSales[i].FoodBase_id);
        fill_style_size_price(detailedFoods,foodOnSales[i]);
    }

    conn.release();
    return foodOnSales;
}


export async function getAllByCategory(category: string,conn?:PoolConnection) {

    let isParam = true;

    if (conn == undefined) {
        conn = await pool.getConnection();
        isParam = false;
    }


    let foodOnSales:FoodOnSale[] = await conn.query(`select * from FoodBase where category='${category}'`);

    for (let i = 0; i < foodOnSales.length; i++) {

        foodOnSales[i].ingredients = (await IngredientsDao.getNameByFoodBase_id(foodOnSales[i].FoodBase_id,conn))
            .map(value => value.name);
        foodOnSales[i].style_size_price = {};
        let detailedFoods:FoodSale[] = await FoodSaleDao.getByFoodBaseId(foodOnSales[i].FoodBase_id);
        fill_style_size_price(detailedFoods,foodOnSales[i]);
    }

    if (!isParam)
        conn.release();

    return foodOnSales;
}


function fill_style_size_price(detailedFoods: FoodSale[], foodOnSale: FoodOnSale) {

    detailedFoods.forEach(value => {
        if (foodOnSale.style_size_price[value.style] == undefined)
            foodOnSale.style_size_price[value.style] = {};
        foodOnSale.style_size_price[value.style][value.size] = {price:value.price,id:value.FoodSale_id}
    });
}
