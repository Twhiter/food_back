

export interface Address {


    address_id:number

    district:string
    detail:string
    user_id:number
}

export interface Admin {

    username:string
    password:string
}

export interface User {
    user_id:number
    username:string
    phone:string
    password:string
}

export interface FoodBase {

    FoodBase_id:number
    category:string
    image:string
    name:string
}

export interface FoodContaining {

    FoodBase_id:number
    name:string
}

export interface FoodSale {

    FoodSale_id:number
    size:string
    style:string
    price:number
    FoodBase_id:number
}

export interface Ingredient {
    name:string
}


export interface OrderContaining {
    FoodSale_id:number
    order_id:number
    number:number
}

export interface Order {

    order_id:number

    address_id:number

    create_time:string
    delivery_time:string
    finish_time:string
    cancel_time:string

    total:number

}


export type SimpleOrder = Order & User & Address;
