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

        for(let i; i < cartItem.length; i++){
          // console.log(i);
            if (cartItem[i].productName === item.product.name){
                cartItem[i].qty++;
                bool = true;
                break;
            }
        }

        if(!bool){
         cartItem.push(new CartItem(item.id, item.product, item.customerName,item.qty));
        }  

      }
      
      return cartItem;
    }));
  }
  

  addProductToCart(product:Product, customerName: string, qty: number): Observable<any>{
    return this.http.post(cartUrl, {product , customerName, qty});
  }

  removeProduct(product:Product):Observable<Product>{
    if(product.qty === 1){
      return this.http.delete<Product>(cartUrl + "/" + product.id)
    }
    else{
      
    }
  }
}
