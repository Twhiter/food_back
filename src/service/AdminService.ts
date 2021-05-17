import * as AdminDao from "../dao/AdminDao"
import {Admin} from "../model/Table";


export async function Login(username:string,pwd:string) {


    const admin:Admin | undefined = await AdminDao.GetByUsername(username);

    if (admin == undefined)
        return false;
    else
        return admin.password === pwd;
}
