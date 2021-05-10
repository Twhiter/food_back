import {FoodBase} from "./Table";

export interface FoodOnSale extends FoodBase{
    ingredients:string[]
    style_size_price:Record<string, Record<string, {price:number,id:number}>>
}
