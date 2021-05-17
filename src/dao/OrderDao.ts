import {PayOrder} from "../model/PayOrder";
import {pool} from "../config/DaoConfig";
import {Order, SimpleOrder} from "../model/Table";
import {OrderDetail} from "../model/Order";


export async function AddOrder(payOrder:PayOrder) {

    const conn = await pool.getConnection();

    await conn.beginTransaction();
    try {
        const res: { affectedRows: number, insertId: number, warningStatus: number }
            = await conn.query("insert into `Order`(address_id,total) values (?,?)", [payOrder.address_id, payOrder.total])

        await conn.batch("insert into OrderContaining (FoodSale_id, order_id, number) VALUES (?,?,?)",
            payOrder.items.map(value => [value.FoodSale_id, res.insertId,value.number]));
        await conn.commit()
    }catch (e) {
        console.log(e);
        await conn.rollback();
        conn.release()
        throw e;
    }
    finally {
        conn.release()
    }

}

export async function Detail(order_id:number) {

    const conn = await pool.getConnection()

    const detail:OrderDetail[] = await conn
        .query("select FoodBase_id,size,style,price,order_id,number,`image`,name from " +
            "FoodSale natural join OrderContaining natural join FoodBase where order_id=" + order_id);

    conn.release()
    return detail;

}

export async function getByUserId(user_id:number) {

    const conn = await pool.getConnection()

    const simpleOrder:SimpleOrder[] = await conn.query("select * from SimpleOrder where user_id=" + user_id);

    conn.release()

    return simpleOrder.map(value => ({...value,}));
}

export async function getById(order_id: number) {
    const conn = await pool.getConnection()

    const order:Order = (await conn.query("select * from `Order` where order_id=" + order_id))[0];

    conn.release()

    return order;
}

export async function getAll() {
    const conn = await pool.getConnection()

    const order:SimpleOrder[] = await conn.query("select * from `SimpleOrder`");

    conn.release()

    return order.map(value => ({...value,password:undefined}));
}
