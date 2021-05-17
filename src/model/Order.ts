import {FoodSale, OrderContaining} from "./Table";

export type OrderDetail = FoodSale & OrderContaining & {

    name:string
    image:string
}
