
import * as FoodOnSaleDao from "../dao/FoodOnSaleDao";



export function getAllFoodOnSale() {
    return  FoodOnSaleDao.getAll();
}

export function getFoodOnSaleByCategory(category: string) {
    return FoodOnSaleDao.getAllByCategory(category);
}
