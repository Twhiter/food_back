export interface PayOrder {
    user_id:number
    address_id:number
    total:number
    items:{FoodSale_id:number,number:number}[]
}
