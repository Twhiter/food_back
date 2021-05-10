import * as FoodOnSaleService from "../service/FoodOnSaleService"
import {Middleware} from "koa";
import {Response} from "../utility/Response";
import * as FoodBaseService from "../service/FoodBaseService"
import * as FoodAreaService from "../service/FoodAreaService"


export const getAllFoodOnSale:Middleware = async (ctx) => {

    let response:Response = {msg:"",data:undefined,status:0};

    try {
        response.data = await FoodOnSaleService.getAllFoodOnSale();
    }catch (e) {
        console.error(e);
        response.msg = "error loading data,please refresh again";
        response.status = -1;
    }

    ctx.body = JSON.stringify(response);
}


export const getAllFoodByCategory:Middleware = async (ctx) => {

    let response:Response = {msg:"",data:undefined,status:0};

    try {
        response.data = await FoodOnSaleService.getFoodOnSaleByCategory(ctx.params.category);
    }catch (e) {
        console.error(e);
        response.msg = "error loading data,please refresh again";
        response.status = -1;
    }

    ctx.body = JSON.stringify(response);

}


export const getAllFoodCategory:Middleware = async (ctx) => {

    let response:Response = {msg:"",data:undefined,status:0};

    try {
        response.data = await FoodBaseService.getAllFoodCategory();
    }catch (e) {
        console.log(e);
        response.status = -1;
        response.msg = "database error, please use it later on";
    }

    ctx.body = JSON.stringify(response);

}


export const getAllFoodAreas:Middleware = async (ctx) => {

    let response:Response = {msg:"",data:undefined,status:0};

    try {
        response.data = await FoodAreaService.getAll();
    }catch (e) {
        console.log(e);
        response.status = -1;
        response.msg = "database error, please use it later on";
    }

    ctx.body = JSON.stringify(response);
}


