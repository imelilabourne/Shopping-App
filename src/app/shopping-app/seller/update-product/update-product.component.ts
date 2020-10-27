import { Component, OnInit } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import {ActivatedRoute } from '@angular/router';
import {Router } from '@angular/router';
import {Observable} from 'rxjs'; 
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

//services
import {ProductService} from '../../services/product.service'
import { productsUrl, productsUrl2 } from '../../config/api';

//interface
import {Product} from '../../model/products.interface'


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
   
    "name": "",
    "description":"",
    "price":0,
    "stocks":0,
    
  }
  user = localStorage.getItem('user');
  itemAdded: boolean = false;
  private headers = new Headers ({'Content-Type': 'application/json'});
  constructor(private router: Router,
              private route: ActivatedRoute, 
              private dataservice: ProductService,
              private http: Http ,
              private fb: FormBuilder) { }    
  

              itemMsg(){
                this.itemAdded = false;
            }
  onUpdate(product){
    //if (this.user === "admin1"){
    const url = `${productsUrl}/${this.id}`;
    this.http.put(url, JSON.stringify(this.productObj),{headers:this.headers}).toPromise()
    .then(()=>{
   // this.router.navigate(['/seller'])
   this.itemAdded =true;
    });
  //}else if (this.user === "admin2"){
   
  }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.id = +params['id'];
    });
    if (this.user === "admin1"){
    this.http.get(productsUrl).subscribe(
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
  }else if (this.user === "admin2"){
    console.log("admin2");
    this.http.get(productsUrl2).subscribe(
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
    
  }



}//end of class
