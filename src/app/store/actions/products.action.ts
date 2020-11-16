import { Action } from "@ngrx/store";
import { Product } from "src/app/shopping-app/model/products.interface";

export const ADD = "[CART ADD]";
export const LOAD_PRODUCTS = "[Products LOAD]";
export const LOAD_PRODUCTS_SUCCESS = "[Products LOAD_SUCCESS]";
export const LOAD_CARTITEMS = "[Cart LOAD]";
export const LOAD_CARTITEMS_SUCCESS = "[Cart LOAD_SUCCESS]";

export class AddtoProducts implements Action{
    readonly type = ADD;
    constructor(public payload: Product){}
}

export class LoadProducts implements Action{
    readonly type = LOAD_PRODUCTS;

}

export class LoadProductsSuccess implements Action{
    readonly type = LOAD_PRODUCTS_SUCCESS;
    constructor(public payload){}
}


export class LoadCart implements Action{
    readonly type = LOAD_CARTITEMS;

}

export class LoadCartSuccess implements Action{
    readonly type = LOAD_CARTITEMS_SUCCESS;
    constructor(public payload){}
}

export type ProductsActions = 
        AddtoProducts 
    |   LoadProducts 
    |   LoadProductsSuccess 
    |   LoadCart
    |   LoadCartSuccess;