import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/shopping-app/model/products.interface';
import { ProductService } from 'src/app/shopping-app/services/product.service';


@Component({
    selector: `cart-item`,
    styleUrls: [`cart-item.component.css`],
    template:  `
    <div class="main">
    <div class="container cart-item" >
      
        <div class="row">
        <div class="col-md-3">
            <div class="img-wrapper">
                <img src="{{cartItem?.photo}}">
            </div>
            </div>
            <div class="col-md-8 p-3" >
                <h5 class="productName">{{ cartItem?.productName }}</h5>
                <p>{{ cartItem?.desc }}</p>
                <p>Quantity: {{ cartItem?.qty }}</p>

                <p>Unit Price: {{ cartItem?.price | currency: 'Php '}}</p>
         
                <p>Total Price: {{ cartItem?.price * cartItem?.qty | currency: 'Php '}}</p>
            </div>
            <div class="col-md-1">
                <button (click)="removeCart(cartItem)" class="btn trash"><i class="fa fa-trash"></i></button>
            </div>
        </div>
        
    </div>
    </div>
    `
})

export class CartItemComponent{
    @Input() cartItem : any;   
    
    @Output() itemSelected = new EventEmitter;


    products: Product[] = [];
    constructor(){}

    ngOnInit(){
    }
    removeCart(item){
        return this.itemSelected.emit(item);
    }
}
