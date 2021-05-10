import {Middleware} from "koa";
import {Response} from "../utility/Response";
import * as UserService from "../service/UserService"
import {CheckUserNameExs} from "../service/UserService";
export const checkUsername:Middleware = async ctx => {
    await check(ctx,"username",CheckUserNameExs)();
}

export const checkUserPhone:Middleware = async ctx => {
    await check(ctx,"phone",UserService.CheckUserPhoneExs)();
}

function check(ctx, urlParamKey,checkFun:(s:string)=>Promise<boolean>) {

    return async function() {
        let resp:Response = {
            status:0,
            msg:'',
            data:undefined
        };

        try {

            const error = !(await checkFun(ctx.params[urlParamKey]));

            resp.data = {
                error:error,
                msg:error?`${urlParamKey} already exist`:undefined
            }
        }catch (e) {
            resp.status = -1;
            resp.msg = "Server error";
        }
        ctx.body = JSON.stringify(resp);
    }
}
