
import { UserState } from "./store/reducers/auth.reducer";
import { ShoppingState } from "./store/reducers/products.reducer";

export interface AppState{
    readonly products: ShoppingState;
    readonly carts: ShoppingState;
    readonly users: UserState;
}