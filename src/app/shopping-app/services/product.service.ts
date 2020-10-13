import { HttpClient ,HttpHeaders} from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { productsUrl } from '../config/api';
import { Product } from '../model/products.interface';


@Injectable({
    providedIn: 'root'
})

export class ProductService{

    constructor(private http: HttpClient){}
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json' })
      }

    getProducts(): Observable<Product[]>{
        // return this.products;
        return this.http.get<Product[]>(productsUrl);
    }
     // HttpClient API method => Add Product
    createProduct(product){
        return this.http.post<Product>(productsUrl , product)
    }

    getProduct(id:number): Observable<Product> {
        return this.http.get<Product>(productsUrl + id)
    } 

    // HttpClient API method => Get Product
    getProductlist(): Observable<Product[]> {
        return this.http.get<Product[]>(productsUrl)
    }

    // HttpClient API method => Delete Product
    deleteProduct(id){
    return this.http.delete<Product>(productsUrl +'/'+ id, this.httpOptions)
    }
    // HttpClient API put() method => Update todo
    updateProduct(id, product): Observable<Product> {
        return this.http.put<Product>(productsUrl + '/' + id, JSON.stringify(product), this.httpOptions)
    }

    updateStocks(id, product):Observable<Product>{
        return this.http.put<Product>(productsUrl + '/' + id, product, this.httpOptions)
    }
}