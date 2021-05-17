import * as FoodBaseDao from "../dao/FoodBaseDao"
import {FoodModify} from "../model/FoodModify";
export function getAllFoodCategory() {
    return FoodBaseDao.getAllFoodCategory();
}


export function modifyFood(info:FoodModify) {
    return FoodBaseDao.modifyFoodBase(info);
}

export function deleteFood(FoodBase_id:number){
    return FoodBaseDao.deleteById(FoodBase_id);
}

export function add(info:{name:string,category:string,image:string}) {
   return  FoodBaseDao.add(info);
}
