import { Component, Input } from '@angular/core';
import { Product } from 'src/app/shopping-app/model/products.interface';
import { CartService } from 'src/app/shopping-app/services/cart.service';
import { MessengerService } from 'src/app/shopping-app/services/messenger.service';
import { WishlistService } from 'src/app/shopping-app/services/wishlist.service';


@Component({
    selector: `product-item`,
    styleUrls: [`product-item.component.css`],
    template: `
    <div class="item-wrapper">
                <div class="img-wrapper"><img src="{{ productItem?.imageUrl }}"></div>
                <button (click)="handleAddtoCart()" class="addtoCart">Add to Cart</button>
                <strong><p>{{ productItem.name }}
                <i *ngIf="addedtoWishlist" class="fa fa-heart heart1 float-right" (click)="handleRemovefromWistlist()"></i>
                <i *ngIf="!addedtoWishlist" class="fa fa-heart heart2 float-right" (click)="handleAddtoWishlist()"></i>
                </p>
                </strong>
                <p>{{ productItem.price | currency: 'Php '}}</p>
    </div>  
`
})

export class ProductItemComponent{
    @Input() productItem: Product
    @Input() addedtoWishlist: boolean;

    constructor(private messengerService: MessengerService, private cartService: CartService, private wishlistService: WishlistService){}

    handleAddtoCart(){
        // this.messengerService.sendMsg(this.productItem);
        this.cartService.addProductToCart(this.productItem)
            .subscribe(()=> {
                this.messengerService.sendMsg(this.productItem);
            })
        
    }

    handleAddtoWishlist(){
        this.wishlistService.addToWishlist(this.productItem.id)
            .subscribe(()=>{
                this.addedtoWishlist = true;  
                console.log(this.productItem);
            })
    }

    handleRemovefromWistlist(){
        this.wishlistService.removeToWishlist(this.productItem.id)
            .subscribe(()=>{
                this.addedtoWishlist = false;
            })
    }
}