import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { wishlistUrl } from '../config/api';
import { map } from 'rxjs/operators'
import { WishlistInterface } from '../model/wishlist.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http:HttpClient) {}
  getWishlist(){
    return this.http.get(wishlistUrl)
      .pipe(map((result: any[]) =>{
          let productIds = [];

          result.forEach(item => productIds.push(item.id));
          return productIds;
      }))
  }

getlist():Observable<WishlistInterface>{
  return this.http.get<WishlistInterface>(wishlistUrl);
}
  addToWishlist(productId){
    return this.http.post(wishlistUrl, {id: productId.id, user: localStorage.getItem('user')})
  }

  removeToWishlist(productId){
    return this.http.delete(wishlistUrl + '/' + productId);
  }
}
