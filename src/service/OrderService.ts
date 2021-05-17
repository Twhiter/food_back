import {PayOrder} from "../model/PayOrder";
import * as OrderDao from "../dao/OrderDao"

export function AddOrder(payOrder:PayOrder) {
    return OrderDao.AddOrder(payOrder);
}

export function OrderDetail(order_id:number) {
    return OrderDao.Detail(order_id);
}


export function getByUserId(user_id: number) {
    return OrderDao.getByUserId(user_id);
}

export function  getById(order_id:number) {
    return OrderDao.getById(order_id);
}

export function getAll() {
    return OrderDao.getAll();
}


