import  * as UserDao from "../dao/UserDao"
import {User} from "../model/Table";
import {UserRegist} from "../model/UserRegist";


export const LoginByPhone = async function (phone:string,pwd:string):Promise<[boolean, User | undefined]> {
    const temp:User[] = await UserDao.getByPhone(phone)
    if (temp.length === 0)
        return [false,undefined];

    if (temp[0].password === pwd)
        return [true,temp[0]];
    else
        return [false,undefined];
}


export const LoginByUsername = async function (username:string,pwd:string):Promise<[boolean, User | undefined]> {
    const temp:User[] = await UserDao.getByUsername(username)
    if (temp.length === 0)
        return [false,undefined];

    if (temp[0].password === pwd)
        return [true,temp[0]];
    else
        return [false,undefined];
}


export const CheckUserNameExs = async function (username:string) {
    return (await UserDao.getByUsername(username)).length === 0;
}

export const CheckUserPhoneExs = async function (phone:string) {
    return (await UserDao.getByPhone(phone)).length === 0
}

export async function Register(user: UserRegist) {
    await UserDao.addUser(user);
}

export async function getById(user_id:number) {

    const user:User[] = await UserDao.getById(user_id)

    return user.length === 0?null:user[0];

}



