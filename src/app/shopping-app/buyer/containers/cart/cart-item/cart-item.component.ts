import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/shopping-app/model/products.interface';
import { ProductService } from 'src/app/shopping-app/services/product.service';


@Component({
    selector: `cart-item`,
    styleUrls: [`cart-item.component.css`],
    template:  `
    <div class="container" >
        <div class="row">
            <div class="col-md-3" >
                <p class="">{{ cartItem?.productName }}</p>
            </div>
            <div class="col-md-2">
                <p>{{ cartItem?.qty }}</p>
            </div>
            <div class="col-md-2">
                <p>{{ cartItem?.price | currency: 'Php '}}</p>
            </div>
        

            <div class="col-md-2">
                <p>{{ cartItem?.price * cartItem?.qty | currency: 'Php '}}</p>
            </div>
        
            <div class="col-md-1" >
                <button (click)="removeCart(cartItem)" class="btn"><i class="fa fa-trash"></i></button>
            </div>
        </div>
        
    </div>
    `
})

export class CartItemComponent{
    @Input() cartItem : any;   
    
    @Output() itemSelected = new EventEmitter;


    products: Product[] = [];
    constructor(
        private productService: ProductService){}

    ngOnInit(){
        this.productService.getProductlist().subscribe(data => this.products = data)
    }
    removeCart(item){
        return this.itemSelected.emit(item);
    }
}
