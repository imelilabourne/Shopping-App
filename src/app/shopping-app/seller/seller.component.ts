import { Component, OnInit } from '@angular/core';

import {Products} from '../model/Products'
@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  products: Products[];
  upproducts: Products[] = [];
 // selectedProduct : Subject<any> = new Subject;
  total:number = 0;
  delit:number = 0;

  constructor() { 
    this.products = [
      {
        id: 1,
        productname: "Nike Court Air Zoom",
        productdetails:"Colour Shown: Dark Atomic Teal/Beyond Pink/White",
        productprice:8000,
        productquantity:5,
        status: "Limited Stocks"
       
      },
      {
        id: 2,
        productname: "Nike Court Air Zoom",
        productdetails:"Colour Shown: Dark Atomic Teal/Beyond Pink/White",
        productprice:8000,
        productquantity:5,
        status: "Limited Stocks"
       
      },
      {
        id: 3,
        productname: "Nike Court Air Zoom",
        productdetails:"Colour Shown: Dark Atomic Teal/Beyond Pink/White",
        productprice:8000,
        productquantity:5,
        status: "Limited Stocks"
       
      }
    ];
   }

  ngOnInit() {
    this.totalPrice();
  }

 // getpopup(det) {
  // this.selectedProduct.next(det);
//}


  delpopup(pid){
    console.log(pid);
    for(var i=0;i<this.products.length;i++){
      if(this.products[i].id === pid)
      {  
        this.products.splice(i,1);
      }           
    }
    this.totalPrice();
    console.log(this.products);
  }


  totalPrice(){
    this.total = 0;
    for(var i=0;i<this.products.length;i++){
      this.total += (this.products[i].productprice * this.products[i].productquantity);
    }
  }

  add(pid){
    console.log(pid);
    for(var i=0;i<this.products.length;i++){
      if(this.products[i].id === pid)
      {  
        this.products[i].productquantity += 1;
      }           
    }
    this.totalPrice();
    console.log(this.products);
  }

  del(pid){
    console.log(pid);
    for(var i=0;i<this.products.length;i++){
      if(this.products[i].id === pid)
      {  
        this.products[i].productquantity -= 1;
      }           
    }
    this.totalPrice();
    console.log(this.products);
  }

}
