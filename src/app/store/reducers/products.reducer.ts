
import { Product } from "src/app/shopping-app/model/products.interface";
import { ADD, LOAD_PRODUCTS, LOAD_PRODUCTS_SUCCESS, ProductsActions } from "../actions/products.action";

const initialState: ShoppingState = {
    list: [],
    loading: false,
    error: undefined
}

export interface ShoppingState {
    list: Product[],
    loading: boolean,
    error: Error
}

export function reducer(state: ShoppingState = initialState, action: ProductsActions){
    switch(action.type){
        case ADD: 
            return {...state, list: action.payload, loading: false}

        case LOAD_PRODUCTS:
            return {
                ...state,
                loading: true
            }

        case LOAD_PRODUCTS_SUCCESS:
            return {...state, list: action.payload, loading: false}

        default: return state;
    }
}