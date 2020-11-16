import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import { CartService } from 'src/app/shopping-app/services/cart.service';
import { LoadCartSuccess, LOAD_CARTITEMS, ProductsActions } from '../actions/products.action';

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
            ofType<ProductsActions>(LOAD_CARTITEMS),
            mergeMap(() => this.cartService.getCartItems()
                .pipe(
                    map(data => new LoadCartSuccess(data))
                )
            )
        )

}