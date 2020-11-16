
import { CartItem } from "src/app/shopping-app/model/cart-item.interface";
import { LOAD_CARTITEMS, LOAD_CARTITEMS_SUCCESS, ProductsActions } from "../actions/products.action";

const initialState: ShoppingState = {
    list: [],
    loading: false,
    error: undefined
}

export interface ShoppingState {
    list: CartItem[],
    loading: boolean,
    error: Error
}

export function cartReducer(state: ShoppingState = initialState, action: ProductsActions){
    switch(action.type){
        case LOAD_CARTITEMS:
            return {
                ...state, 
                loading: false}
        case LOAD_CARTITEMS_SUCCESS:
            return {
                ...state, 
                list: action.payload, 
                loading: false
            }
        default: return state;
    }
}