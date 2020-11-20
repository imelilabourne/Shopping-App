
import { Product } from "src/app/shopping-app/model/products.interface";
import { ADD, LOAD_PRODUCTS, LOAD_PRODUCTS_SUCCESS, ProductsActions } from "../actions/products.action";

const initialState: ShoppingState = {
    list: [],
    entities: {},
    loading: false,
    error: undefined
}

export interface ShoppingState {
    list: Product[],
    entities: { [id: number] : Product },
    loading: boolean,
    error: Error
}

export function reducer(state: ShoppingState = initialState, action: ProductsActions){
    switch(action.type){
        case ADD: 

        
            return {
                ...state, 
                list: action.payload, 
                loading: false
            }

        case LOAD_PRODUCTS:
            return {
                ...state,
                loading: true
            }

        case LOAD_PRODUCTS_SUCCESS:
            const products = action.payload;

            const entities = products.reduce(
                (entities: { [id:number] : Product }, product: Product) => {
                    return {
                        ...entities,
                        [product.id]: product
                    }
                    
                    }, 
                        {
                        ...state.entities
                        })
            return {
                ...state, 
                list: action.payload, 
                loading: false,
                entities
            }

        default: return state;
    }
}