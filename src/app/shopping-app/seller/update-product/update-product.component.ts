import { Component, OnInit } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import {ActivatedRoute } from '@angular/router';
import {Router } from '@angular/router';
import {Observable} from 'rxjs'; 
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

//services
import {AuthService} from '../../services/auth.service'

//interface
import {Products} from '../model/Products'
import {product} from '../model/product'
import { HttpClient } from '@angular/common/http';
///import {product} from '../model/product'

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  
  id: number;
  data:object={};
  product=[];
  productObj={
    "ProductName": "",
    "ProductDeatils":"",
    "ProductPrice":0,
    "ProductQuantity":0,
    "Status":""
  }

  private headers = new Headers ({'Content-Type': 'application/json'});
  constructor(private router: Router,private route: ActivatedRoute, private dataservice: AuthService,private http: Http ,private fb: FormBuilder) { }

  onUpdate(product){
   
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
        this.product= res.json();
        for (var i = 0; i< this.product.length;i++){
          if(parseInt(this.product[i].id)===this.id){
            this.productObj=this.product[i];
            break;
          }
        }
      }
    )
    
  }



}//end of class
