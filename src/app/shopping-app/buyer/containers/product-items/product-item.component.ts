import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shopping-app/model/products.interface';
import { CartService } from 'src/app/shopping-app/services/cart.service';
import { MessengerService } from 'src/app/shopping-app/services/messenger.service';
import { WishlistService } from 'src/app/shopping-app/services/wishlist.service';


@Component({
    selector: `product-item`,
    styleUrls: [`product-item.component.css`],
    template: `
    <div class="item-wrapper">
                <div class="img-wrapper"><img src="{{ productItem?.imageUrl }}">
                <div class="alert-success"  *ngIf="itemAdded">
                    <p>Item added to cart <span><button (click)="itemMsg()" class="btn ekis"><i class="fa fa-times"></i></button></span></p>
                </div></div>
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
    itemAdded: boolean = false;

    constructor(private messengerService: MessengerService, 
        private cartService: CartService, 
        private wishlistService: WishlistService, 
        private router: Router){}

    itemMsg(){
        this.itemAdded = false;
    }

    handleAddtoCart(){
        // this.messengerService.sendMsg(this.productItem);
  
        let userLocal = localStorage.getItem('user'); 
        if(userLocal === "user1" || userLocal === "user2" || userLocal === "user3"){
            this.cartService.addProductToCart(this.productItem)
            .subscribe(()=> {
                this.messengerService.sendMsg(this.productItem);
                this.itemAdded =true;
            })
        }
        else{
            this.router.navigateByUrl("info");
        }
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