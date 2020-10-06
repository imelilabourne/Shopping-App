import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cartUrl } from '../config/api';
import { CartItem } from '../model/cart-item.interface';
import { Product } from '../model/products.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  getCartItems(): Observable<CartItem[]>{
    return this.http.get<CartItem[]>(cartUrl)
    .pipe(map((result: any[]) => {
      let cartItem: CartItem[] = [];

      for(let item of result){
        let bool: boolean = false;
        for(let i in cartItem){
            if (cartItem[i].id === item.product.id){
                cartItem[i].qty++;
                bool = true;
                break;
            }
        }

        if(!bool){
         cartItem.push(new CartItem(item.id, item.product));
        }  

      }
      
      return cartItem;
    }));
  }

  addProductToCart(product:Product): Observable<any>{
    return this.http.post(cartUrl, {product});
  }

  removeProduct(product:Product):Observable<Product>{
    return this.http.delete<Product>(cartUrl + "/" + product.id);
  }
}
