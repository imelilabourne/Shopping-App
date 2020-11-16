import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/shopping-app/services/product.service';
import { LoadProductsSuccess, LOAD_PRODUCTS,  ProductsActions } from '../actions/products.action';

 
@Injectable({
    providedIn: 'root'
})
export class ProductsEffects {
    
    constructor(
        private actions$: Actions,
        private productService: ProductService
      ) {}

    @Effect()
    loadProducts$ = this.actions$
        .pipe(
            ofType<ProductsActions>(LOAD_PRODUCTS),
            mergeMap(() => this.productService.getProducts()
                .pipe(
                    map(data => new LoadProductsSuccess(data))
                )
            )
        )


}