import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { cartUrl, transacUrl,historyUrl } from "../config/api";
import { Product } from "../model/products.interface";
import { CartItem } from  "../model/cart-item.interface";
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})

export class TransactService{

    constructor(private http: HttpClient){}

    postTransact(cartItems: Product[]):Observable<Product[]>{
        return this.http.post<Product[]>(transacUrl,cartItems);
    }

    getTransac(){
        return this.http.get(transacUrl).pipe(map((res:any) =>  res ));
    }


    getHistory(){
        //return this.http.get(historyUrl).pipe(map((res:any) =>  res ));
        return this.http.get<CartItem[]>(historyUrl);
    }

    resetTransac(){
        return this.http.delete(transacUrl + '/1');
    }

    resetCartUponCheckout(product){
        return this.http.delete(cartUrl + product.id);
    }
}