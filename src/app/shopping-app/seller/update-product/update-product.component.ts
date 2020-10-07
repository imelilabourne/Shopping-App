import { Component, OnInit } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import {ActivatedRoute } from '@angular/router';
import {Router } from '@angular/router';
import {Observable} from 'rxjs'; 

//services
import {AuthService} from '../../services/auth.service'

//interface
import {Products} from '../model/Products'
import {product} from '../model/product'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  id: number;
  prods=[];
  productObj={
    "ProductName": "",
    "ProductDeatils":"",
    "ProductPrice": "",
    "ProductQuantity":"",
    "Status": ""
  };


  private headers = new Headers ({'Content-Type': 'application/json'});
  constructor(private router: Router,private route: ActivatedRoute, private dataservice: AuthService,private http: HttpClient) { }

  onUpdate(prods){
    this.productObj= {
    "ProductName": prods.ProductName,
    "ProductDeatils":prods.ProductDeatils,
    "ProductPrice": prods.ProductPrice,
    "ProductQuantity":prods.ProductQuantity,
    "Status": prods.Status
    };
    const url = `${"http://localhost:9999/product"}/${this.id}`;
    this.http.put(url, JSON.stringify(this.productObj),{headers:this.headers}).toPromise()
    .then(()=>{
    this.router.navigate(['/seller'])
    });
  }



  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.id = +params['id'];
    });
    this.http.get("http://localhost:9999/product").subscribe(
      (res: Response)=>{
        this.prods= res.json();
        for (var i = 0; i< this.prods.length;i++){
          if(parseInt(this.prods[i].id)===this.id){
            this.productObj=this.prods[i];
            break;
          }
        }
      }
    )
  }

}
