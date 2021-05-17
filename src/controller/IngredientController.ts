import {Middleware} from "koa";
import {Response} from "../utility/Response";
import * as IngredientService from "../service/IngredientService"

export const GetAll:Middleware = async ctx => {


    let response:Response = {msg:"",data:undefined,status:0};

    try {
        response.data = await IngredientService.getAll();
    }catch (e) {
        console.log(e);
        response.status = -1;
        response.msg = "database error, please use it later on";
    }

    ctx.body = JSON.stringify(response);
}
