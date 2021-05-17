import {pool} from "../config/DaoConfig";
import {PoolConnection} from "mariadb";
import {FoodModify} from "../model/FoodModify";

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

export async function modifyFoodBase(info: FoodModify) {


    const conn = await pool.getConnection();

    try{
        await conn.beginTransaction();

        await conn.query("update FoodBase set category=?,name=? where FoodBase_id=?",
            [info.category,info.name,info.FoodBase_id]);

        if (info.ingredients.add.length !== 0)
            await conn.batch("insert into FoodContaining(FoodBase_id, name) VALUES (?,?)",
                info.ingredients.add.map(value => [info.FoodBase_id,value]));

        if (info.ingredients.rm.length !== 0)
            await conn.batch("delete from FoodContaining where FoodBase_id=? and name=?",
                info.ingredients.rm.map(value => [info.FoodBase_id,value]));

        if (info.specification.add.length !== 0)
            await conn.batch("insert into FoodSale( size, style, price, foodbase_id) VALUES(?,?,?,?)",
                info.specification.add.map(value => [value.size,value.style,value.price,info.FoodBase_id]));

        if (info.specification.rm.length !== 0)
            await conn.batch("delete from FoodSale where FoodSale_id=?",
                info.specification.rm.map(value => [value]));

        await conn.commit()
    }catch (e) {
        console.log(e);
        await conn.rollback();
        throw e;
    }finally {
        conn.release();
    }
}


export async function deleteById(FoodBase_id:number) {

    const conn = await pool.getConnection()

    try {
        await conn.query("delete from FoodBase where FoodBase_id=?",[FoodBase_id]);
    } catch (e) {
        throw e
    }finally {
        conn.release()
    }
}

export async function add( info:{category: string, image: string, name: string} ) {


    const conn = await pool.getConnection()

    try {
        await conn.query("insert into FoodBase(category, image, name) VALUES (?,?,?)",
            [info.category,info.image,info.name]);
    } catch (e) {
        throw e
    }finally {
        conn.release()
    }


}
