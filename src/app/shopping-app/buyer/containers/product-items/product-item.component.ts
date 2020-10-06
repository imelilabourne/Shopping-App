import { Component, Input } from '@angular/core';
import { Product } from 'src/app/shopping-app/model/products.interface';
import { CartService } from 'src/app/shopping-app/services/cart.service';
import { MessengerService } from 'src/app/shopping-app/services/messenger.service';

@Component({
    selector: `product-item`,
    styleUrls: [`product-item.component.css`],
    template: `
    <div class="item-wrapper">
                <div class="img-wrapper"><img src="{{ productItem.imageUrl }}"></div>
                <strong><p>{{ productItem.name }}</p></strong>
                <p>{{ productItem.price | currency: 'Php '}}</p>
                
                <button (click)="handleAddtoCart()" class="btn btn-info btn-center">Add to Cart</button>
    </div>  
`
})

export class ProductItemComponent{
    @Input() productItem: Product

    constructor(private messengerService: MessengerService, private cartService: CartService){}

    handleAddtoCart(){
        // this.messengerService.sendMsg(this.productItem);
        this.cartService.addProductToCart(this.productItem)
            .subscribe(()=> {
                this.messengerService.sendMsg(this.productItem);
            })
        
    }
}