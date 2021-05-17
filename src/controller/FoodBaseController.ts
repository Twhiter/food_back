import {Middleware} from "koa";
import {Response} from "../utility/Response";
import * as FoodAreaService from "../service/FoodAreaService";
import * as FoodBaseService from "../service/FoodBaseService"
import * as FileService from "../service/FileService"


export const modifyFood:Middleware = async ctx => {

    let response:Response = {msg:"",data:undefined,status:0};

    try {
        await FoodBaseService.modifyFood(ctx.request.body);
        response.data = true;
    }catch (e) {
        console.log(e);
        response.status = -1;
        response.msg = "database error, please use it later on";
    }

    ctx.body = JSON.stringify(response);

}

export const deleteFoodBase:Middleware = async ctx => {


    let response:Response = {msg:"",data:undefined,status:0};

    try {
        await FoodBaseService.deleteFood(Number(ctx.params["FoodBase_id"]));
        response.data = true;
    }catch (e) {
        console.log(e);
        response.status = -1;
        response.msg = "database error, please use it later on";
    }

    ctx.body = JSON.stringify(response);
}

export const addFood:Middleware = async ctx => {


    let response:Response = {msg:"",data:undefined,status:0};

    try {

        let data:{
            name:string,
            category:string,
            fileName:string,
            image:string
        } = ctx.request.body;

        data.image = FileService.addImg(data.fileName,data.image);
        await FoodBaseService.add(data);
        response.data = true;
    }catch (e) {
        console.log(e);
        response.status = -1;
        response.msg = "database error, please use it later on";
    }

    ctx.body = JSON.stringify(response);




}
