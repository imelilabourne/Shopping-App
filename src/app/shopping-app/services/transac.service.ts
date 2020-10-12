import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { transacUrl } from "../config/api";
import { Product } from "../model/products.interface";
import { User } from "../model/user.interface";
//import { Products } from "../seller/model/Products";

@Injectable({
    providedIn: 'root'
})

export class TransactService{

    constructor(private http: HttpClient){}

    postTransact(cartItems: Product[]):Observable<Product[]>{
        return this.http.post<Product[]>(transacUrl,{cartItems});
    }

    getTransac(){
        return this.http.get(transacUrl);
    }

    resetTransac(){
        return this.http.delete(transacUrl + '/1');
    }
}