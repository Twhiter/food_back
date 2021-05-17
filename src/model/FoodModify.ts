export interface FoodModify {
    FoodBase_id:number
    name:string
    category:string
    ingredients: {
        add:string[],
        rm:string[]
    },
    specification: {
        add:{
            style:string,
            size:string,
            price:number
        }[],
        rm:number[]
    }
}
