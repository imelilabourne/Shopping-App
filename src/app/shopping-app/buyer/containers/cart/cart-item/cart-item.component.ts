import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: `cart-item`,
    styleUrls: [`cart-item.component.css`],
    template:  `
    <div>
        <div class="row">
            <div class="col-md-9">
                <p>{{ cartItem.productName }}</p>
            </div>
            
            <div class="col-md-3">
                <button (click)="removeCart(cartItem)" class="btn"><i class="fa fa-trash"></i></button>
            </div>
        </div>
        <p>Item: {{ cartItem.productId }} x {{ cartItem.qty }} = {{ cartItem.price * cartItem.qty | currency: 'Php '}}</p>
        
    </div>
    `
})

export class CartItemComponent{
    @Input() cartItem : any;   
    
    @Output() itemSelected = new EventEmitter;


    removeCart(item){
        return this.itemSelected.emit(item);
    }
}