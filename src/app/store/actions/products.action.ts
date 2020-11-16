import { Action } from "@ngrx/store";
import { Product } from "src/app/shopping-app/model/products.interface";
import { ShoppingState } from "../reducers/products.reducer";

export const ADD = "[CART ADD]";
export const LOAD_PRODUCTS = "[Products LOAD]";
export const LOAD_PRODUCTS_SUCCESS = "[Products LOAD_SUCCESS]";

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

export type ProductsActions = AddtoProducts | LoadProducts | LoadProductsSuccess;