import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// interface
import {Products} from '../seller/model/Products'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = 'http://localhost:9999'; // json server(db.json)

  user: Products[];

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json' })
  } 
  
createProduct(product){
    return this.http.post<Products>(this.apiURL + '/product/', product)
  }

 // HttpClient API method => Get Product
  getProductlist(): Observable<Products[]> {
    return this.http.get<Products[]>(this.apiURL+ '/product/')
  }

 // HttpClient API method => Delete Product
 deleteProduct(id){
  return this.http.delete<Products>(this.apiURL + '/product/' + id, this.httpOptions)
}
  // HttpClient API put() method => Update todo
  updateProduct(id, product): Observable<Products> {
    console.log('trying to update',id, product);
    return this.http.put<Products>(this.apiURL + '/product/' + id, JSON.stringify(product), this.httpOptions)
  }


}// end of service
