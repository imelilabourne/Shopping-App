import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Http, Response,Headers } from '@angular/http';
import {ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


//services
import {AuthService} from '../../services/auth.service'

//interface
import {Products} from '../model/Products'
import {product} from '../model/product'

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {

  newProductForm:FormGroup;
  products: Products[];
  upproducts: Products[] = [];
  constructor(private router: Router,private route: ActivatedRoute, private dataservice: AuthService,private http: Http,private fb: FormBuilder) { }
   


  ngOnInit() {
    this. newProduct();
    this.displayProductList();
  }

  newProduct(){
    this.newProductForm = this.fb.group({
      ProductName : [null,[Validators.required]],
      ProductDeatils :[null,[Validators.required]],
      ProductPrice : [null,[Validators.required]],
      ProductQuantity :[null,[Validators.required]],
      Status : [null,[Validators.required]]
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

  displayProductList() {
    this.dataservice. getProductlist().subscribe(data =>
      {
        // as the Web Api doesn't sort the list of todos, we do here in the frontend
        this.upproducts = data.sort((a,b)=> {
          if (a.id>b.id) return -1;
          if (a.id<b.id) return 1;
        });
        console.log('display productList', this.upproducts);
      });
  }


  onSubmit(){
   // console.log(this.newProductForm.value);
    this.dataservice.createProduct(this.newProductForm.value)
    .subscribe(
      response => alert('Inserted Successful'),    
      error=> console.error('Error',error)
    )
    this.newProductForm.reset();
    this.router.navigate(['seller']);

    }


    onDelete(id: number){
      console.log('delete', id);    
      this.dataservice.deleteProduct(id).subscribe();
      this.displayProductList();
    }
}// End of Class
