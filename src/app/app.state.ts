
import { ShoppingState } from "./store/reducers/products.reducer";

export interface AppState{
    readonly products: ShoppingState
    readonly carts: ShoppingState
}