import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import { CartService } from 'src/app/shopping-app/services/cart.service';
import { LoadCart, LoadCartSuccess, LOAD_CARTITEMS, LOAD_CARTITEMS_SUCCESS, ProductsActions, RemoveCart, RemoveCartItem, REMOVE_CARTITEMS } from '../actions/products.action';

@Injectable({
    providedIn: 'root'
})

export class CartEffects{
    constructor(
        private actions$: Actions,
        private cartService: CartService
      ) {}

    @Effect()
    loadCartItems$ = this.actions$
        .pipe(
            ofType<LoadCart>(LOAD_CARTITEMS),
            mergeMap(() => this.cartService.getCartItems()
                .pipe(
                    map(data => new LoadCartSuccess(data))
                )
            )
        )

    @Effect()
    removeCartItem$ = this.actions$
        .pipe(
            ofType<RemoveCart>(REMOVE_CARTITEMS),
            map((action: RemoveCartItem) => action.payload),
            mergeMap((cartItem) => this.cartService.removeProduct(cartItem))
        )

}