

import * as AdminService from "../service/AdminService"
import {Response} from "../utility/Response";
import {Middleware} from "koa";

export const  Login:Middleware = async ctx => {

    let response:Response = {msg:"",data:undefined,status:0};

    try {

        const data = ctx.request.body;

       response.data = await AdminService.Login(data.username,data.pwd);

    }catch (e) {
        console.log(e)
        response.msg = "error,server error";
        response.status = -1;
    }

    ctx.body = JSON.stringify(response);




}
