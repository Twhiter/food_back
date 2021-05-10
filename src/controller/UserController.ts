import * as UserService from "../service/UserService"
import {Middleware} from "koa";
import {Response} from "../utility/Response";
import {User} from "../model/Table";
import {UserRegist} from "../model/UserRegist";

export const Login:Middleware = async ctx => {

    let response:Response = {msg:"",data:undefined,status:0};

    try {

        let params = ctx.request.body;


        let isOK: boolean;
        let userInfo:User;

        if (params.account == undefined) {
            response.status = -1;
            response.msg = "page error,please refresh page !";
        } else {
            if (Number.isNaN(Number(params.account)))
                [isOK,userInfo] = await UserService.LoginByUsername(params.account,params.password);
            else
                [isOK,userInfo] = await UserService.LoginByPhone(params.account,params.password);

            let token = "";
            response.data = {
                isOk : isOK,
                token:token,
                userInfo:userInfo == undefined?undefined:{
                    user_id:userInfo.user_id,
                    username:userInfo.username
                }
            };


        }

    }catch (e) {
        response.status = -1;
        response.msg = "page error,please refresh page !";
    }

    ctx.body = JSON.stringify(response);
}


export const Register:Middleware = async ctx => {

    let response:Response = {msg:"",data:undefined,status:0};

    try {

        const user:UserRegist = ctx.request.body;
        await UserService.Register(user);
    }catch (e) {
        response.msg = "error,server error";
        response.status = -1;
    }

    ctx.body = JSON.stringify(response);

}

export const GetBaseInfo:Middleware = async ctx => {
    let response:Response = {msg:"",data:undefined,status:0};

    try {

        const user_id = Number(ctx.params['user_id']);
        const user = await UserService.getById(user_id);

        response.data = {
            ...user,
            password:undefined
        }

    }catch (e) {
        response.msg = "error";
        response.status = -1;
    }

    ctx.body = JSON.stringify(response);



}
