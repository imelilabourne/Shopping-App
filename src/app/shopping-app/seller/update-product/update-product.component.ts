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
  newProductForm:FormGroup;
  id: number;
  prods: any={};

  private headers = new Headers ({'Content-Type': 'application/json'});
  constructor(private router: Router,private route: ActivatedRoute, private dataservice: AuthService,private http: HttpClient,private fb: FormBuilder) { }
 


  ngOnInit() {
    this.newProduct();

    this.route.paramMap.subscribe(params => {
      const pId = +params.get('id');
      if (pId) {
        this. getProdItem(pId);
      }
    });
  
  
  }

  getProdItem(id: number) {
    this.dataservice.getProduct(id)
      .subscribe(
        (productitem: Products) => this.editProdItem(productitem),
        (err: any) => console.log(err)
      );
  }

  editProdItem(productitem: Products) {
    this.newProductForm.patchValue({
      ProductName :productitem.productname,
      ProductDeatils :productitem.productdetails,
      ProductPrice : productitem.productprice,
      ProductQuantity :productitem.productquantity,
      Status : productitem.status
    });
  }
  


  newProduct(){
    this.newProductForm = this.fb.group({
      ProductName : ['',[Validators.required]],
      ProductDeatils :['',[Validators.required]],
      ProductPrice : ['',[Validators.required]],
      ProductQuantity :['',[Validators.required]],
      Status : ['',[Validators.required]]
    });
  }

  get ProductName(){
    return this.newProductForm.get('ProductName') as FormControl;
  }
  get ProductDeatils(){
    return this.newProductForm.get('ProductDeatils') as FormControl;
  }
  get ProductPrice(){
    return this.newProductForm.get('ProductPrice') as FormControl;
  }
  get ProductQuantity(){
    return this.newProductForm.get('ProductQuantity') as FormControl;
  }
  get Status(){
    return this.newProductForm.get('Status') as FormControl;
  }

}//end of class
