import {Middleware} from "koa";
import {Response} from "../utility/Response";
import {PayOrder} from "../model/PayOrder";
import * as OrderService from "../service/OrderService"


export const AddOrder:Middleware = async ctx => {



    let response:Response = {msg:"",data:undefined,status:0};

    try {

        const payOrder:PayOrder = ctx.request.body;
        await OrderService.AddOrder(payOrder);
    }catch (e) {

        response.msg = "error,server error";
        response.status = -1;

    }

    ctx.body = JSON.stringify(response);
}

export const OrderDetail:Middleware = async ctx => {

    let response:Response = {msg:"",data:undefined,status:0};

    try {

        response.data = await OrderService.OrderDetail(Number(ctx.params['order_id']));

    }catch (e) {
        console.log(e)
        response.msg = "error,server error";
        response.status = -1;
    }

    ctx.body = JSON.stringify(response);

}

export const GetByUser_id:Middleware = async ctx => {

    let response:Response = {msg:"",data:undefined,status:0};

    try {
        response.data = await OrderService.getByUserId(Number(ctx.params['user_id']));

    }catch (e) {
        console.log(e)
        response.msg = "error,server error";
        response.status = -1;
    }

    ctx.body = JSON.stringify(response)
}
